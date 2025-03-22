import { createSlice } from "@reduxjs/toolkit";

import {
	getFavoritesAsync,
	postFavoritesAsync,
	removeFavoritesAsync,
} from "@redux/thunks/favoritesThunks";

import { IProduct } from "../../_shared/interfaces";

export type FavoritesState = {
	items: IProduct[];

	loading: boolean;
	error: string | null;
};

const initialState: FavoritesState = {
	items: [],

	loading: false,
	error: null,
};

export const favoritesSlice = createSlice({
	name: "favorites",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		// getFavoritesAsync
		builder
			.addCase(getFavoritesAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getFavoritesAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(getFavoritesAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});

		// postFavoritesAsync
		builder
			.addCase(postFavoritesAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(postFavoritesAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.items = [...state.items, action.payload];
			})
			.addCase(postFavoritesAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});

		// removeFavoritesAsync
		builder
			.addCase(removeFavoritesAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(removeFavoritesAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.items = [...state.items].filter(
					(item) => item._id !== action.meta.arg.productId,
				);
			})
			.addCase(removeFavoritesAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default favoritesSlice.reducer;
