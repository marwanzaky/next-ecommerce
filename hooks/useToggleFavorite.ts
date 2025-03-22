import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@redux/store";
import {
	postFavoritesAsync,
	removeFavoritesAsync,
} from "@redux/thunks/favoritesThunks";

export function useToggleFavorite(productId: string) {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();

	const { isAuthenticated } = useAppSelector((state) => state.authReducer);
	const { items } = useAppSelector((state) => state.favoritesReducer);

	const isFavorite = items.some((item) => item._id === productId);

	const signin = () => {
		router.push("/signin");
	};

	const addToFavorites = () => {
		if (isAuthenticated === false) {
			signin();
		} else {
			dispatch(postFavoritesAsync({ productId }));
		}
	};

	const removeFromFavorites = () => {
		if (isAuthenticated === false) {
			signin();
		} else {
			dispatch(removeFavoritesAsync({ productId }));
		}
	};

	return { isFavorite, addToFavorites, removeFromFavorites };
}
