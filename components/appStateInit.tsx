"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@redux/store";
import { getFavoritesAsync } from "@redux/thunks/favoritesThunks";
import { getCartMeAsync } from "@redux/thunks/cartThunks";
import { getUserProductsAsync } from "@redux/thunks/userProductsThunks";
import { getMeAsync } from "@redux/thunks/authThunks";

export default function AppStateInit() {
	const dispatch = useDispatch<AppDispatch>();

	const { isAuthenticated } = useAppSelector((state) => state.authReducer);

	useEffect(() => {
		if (isAuthenticated === true) {
			dispatch(getMeAsync());
			dispatch(getCartMeAsync());
			dispatch(getFavoritesAsync());
			dispatch(getUserProductsAsync());
		}
	}, []);

	return null;
}
