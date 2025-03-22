import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@redux/store";
import { getFavoritesAsync } from "@redux/thunks/favoritesThunks";

export function useFavorites() {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();

	const { isAuthenticated } = useAppSelector((state) => state.authReducer);
	const { items } = useAppSelector((state) => state.favoritesReducer);

	useEffect(() => {
		if (isAuthenticated === false) {
			router.push("/signin");
		} else {
			dispatch(getFavoritesAsync());
		}
	}, []);

	return { items };
}
