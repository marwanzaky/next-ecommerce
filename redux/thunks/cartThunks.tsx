import { cartsService } from "@redux/services/cartsService";
import { guestCartService } from "@redux/services/guestCartService";
import { RootState } from "@redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "_shared/interfaces";

export const getCartMeAsync = createAsyncThunk(
	"cart/getCartMe",
	async (_, { getState, rejectWithValue }) => {
		const state = getState() as RootState;
		const isAuthenticated = state.authReducer.isAuthenticated;

		try {
			if (isAuthenticated === false) {
				return await guestCartService.getMe();
			}

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
		const isAuthenticated = state.authReducer.isAuthenticated;

		try {
			if (isAuthenticated === false) {
				const updatedCart = await guestCartService.postItem(product, quantity);

				alert("The item was added to the cart (guest)");

				return updatedCart;
			}

			const updatedCart = await cartsService.postItem(
				state.authReducer.token,
				product._id,
				quantity,
			);

			alert("The item was added to the cart");

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
		const isAuthenticated = state.authReducer.isAuthenticated;

		try {
			if (isAuthenticated === false) {
				return await guestCartService.updateItemQuantity(productId, quantity);
			}

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
		const isAuthenticated = state.authReducer.isAuthenticated;

		try {
			if (isAuthenticated === false) {
				const updatedCart = await guestCartService.deleteItem(productId);

				alert("The item was removed from the cart (guest)");

				return updatedCart;
			}

			const updatedCart = await cartsService.deleteItem(
				state.authReducer.token,
				productId,
			);

			alert("The item was removed from the cart");

			return updatedCart;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	},
);
