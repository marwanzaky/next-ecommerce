import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@redux/store";

export function useFavorites() {
	const router = useRouter();

	const { isAuthenticated } = useAppSelector((state) => state.authReducer);
	const { items } = useAppSelector((state) => state.favoritesReducer);

	useEffect(() => {
		if (isAuthenticated === false) {
			router.push("/signin");
		}
	}, []);

	return { items };
}
