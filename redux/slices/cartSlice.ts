import { createSlice } from "@reduxjs/toolkit";

import {
	deleteCartItemAsync,
	getCartMeAsync,
	postCartItemAsync,
	updateCartItemQuantityAsync,
} from "@redux/thunks/cartThunks";

import { CartItem } from "_shared/interfaces/cart.interface";

export type CartState = {
	items: CartItem[];

	loading: boolean;
	error: string | null;
};

const initialState: CartState = {
	items: [],

	loading: false,
	error: null,
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// getCartMeAsync
		builder
			.addCase(getCartMeAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getCartMeAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload.items;
			})
			.addCase(getCartMeAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});

		// postCartItemAsync
		builder
			.addCase(postCartItemAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(postCartItemAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload.items;
			})
			.addCase(postCartItemAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});

		// updateCartItemQuantityAsync
		builder
			.addCase(updateCartItemQuantityAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateCartItemQuantityAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload.items;
			})
			.addCase(updateCartItemQuantityAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});

		// deleteCartItemAsync
		builder
			.addCase(deleteCartItemAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteCartItemAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload.items;
			})
			.addCase(deleteCartItemAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default cartSlice.reducer;
