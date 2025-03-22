import { createSlice } from "@reduxjs/toolkit";
import {
	getUserProductsAsync,
	postUserProductAsync,
	removeUserProductAsync,
	updateUserProductAsync,
} from "@redux/thunks/userProductsThunks";

import { IProduct } from "_shared/interfaces";

export type UserProductsState = {
	products: IProduct[];
	loading: boolean;
	error: string | null;
};

const initialState: UserProductsState = {
	products: [],
	loading: false,
	error: null,
};

const userProductsSlice = createSlice({
	name: "userProducts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// getUserProductsAsync
		builder
			.addCase(getUserProductsAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getUserProductsAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addCase(getUserProductsAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});

		// postUserProductAsync
		builder
			.addCase(postUserProductAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(postUserProductAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.products = [...state.products, action.payload];
			})
			.addCase(postUserProductAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});

		// updateUserProductAsync
		builder
			.addCase(updateUserProductAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateUserProductAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.products = [...state.products].map((item) =>
					item._id !== action.payload._id ? item : action.payload,
				);
			})
			.addCase(updateUserProductAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});

		// removeUserProductAsync
		builder
			.addCase(removeUserProductAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(removeUserProductAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.products = [...state.products].filter(
					(item) => item._id !== action.meta.arg.id,
				);
			})
			.addCase(removeUserProductAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default userProductsSlice.reducer;
