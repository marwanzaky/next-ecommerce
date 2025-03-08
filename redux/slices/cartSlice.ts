import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IProduct } from "../../_shared/interfaces";
import { RootState } from "@redux/store";
import { cartsService } from "@services/cartsService";
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

export const getCartMeAsync = createAsyncThunk(
	"cart/getCartMe",
	async (_, { getState, rejectWithValue }) => {
		const state = getState() as RootState;

		try {
			return await cartsService.getMe(state.authReducer.token);
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	},
);

export const postCartItemAsync = createAsyncThunk(
	"cart/postCartItem",
	async (
		{ product, quantity = 1 }: { product: IProduct; quantity?: number },
		{ getState, rejectWithValue },
	) => {
		const state = getState() as RootState;

		try {
			const updatedCart = await cartsService.postItem(
				state.authReducer.token,
				product._id,
				quantity,
			);

			alert("The item successfully added to the cart");

			return updatedCart;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	},
);

export const updateCartItemQuantityAsync = createAsyncThunk(
	"cart/updateCartItemQuantity",
	async (
		{ productId, quantity }: { productId: string; quantity: number },
		{ getState, rejectWithValue },
	) => {
		const state = getState() as RootState;

		try {
			return await cartsService.updateItemQuantity(
				state.authReducer.token,
				productId,
				quantity,
			);
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	},
);

export const deleteCartItemAsync = createAsyncThunk(
	"cart/deleteCartItem",
	async (
		{ productId }: { productId: string },
		{ getState, rejectWithValue },
	) => {
		const state = getState() as RootState;

		try {
			const updatedCart = await cartsService.deleteItem(
				state.authReducer.token,
				productId,
			);

			alert("The item successfully delete from the cart");

			return updatedCart;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	},
);

export const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
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
