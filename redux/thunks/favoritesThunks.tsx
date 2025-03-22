import { RootState } from "@redux/store";
import { favoritesService } from "@redux/services/favoritesService";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getFavoritesAsync = createAsyncThunk(
	"favorites/getFavorites",
	async (_, { getState, rejectWithValue }) => {
		const state = getState() as RootState;

		try {
			return await favoritesService.getMe(state.authReducer.token);
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	},
);

export const postFavoritesAsync = createAsyncThunk(
	"favorites/postFavorites",
	async (
		{ productId }: { productId: string },
		{ getState, rejectWithValue },
	) => {
		const state = getState() as RootState;

		try {
			return await favoritesService.post(state.authReducer.token, productId);
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	},
);

export const removeFavoritesAsync = createAsyncThunk(
	"favorites/removeFavorites",
	async (
		{ productId }: { productId: string },
		{ getState, rejectWithValue },
	) => {
		const state = getState() as RootState;

		try {
			return await favoritesService.remove(state.authReducer.token, productId);
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	},
);
