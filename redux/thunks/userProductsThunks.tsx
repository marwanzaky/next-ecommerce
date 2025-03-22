import { productsService } from "@redux/services/productsService";
import { usersService } from "@redux/services/usersService";
import { RootState } from "@redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUpdateProduct } from "_shared/interfaces";

export const getUserProductsAsync = createAsyncThunk(
	"userProducts/getUserProducts",
	async (_, { getState, rejectWithValue }) => {
		const state = getState() as RootState;

		try {
			return await usersService.getMeProducts(state.authReducer.token);
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	},
);

export const postUserProductAsync = createAsyncThunk(
	"cart/postUserProduct",
	async (data: Required<IUpdateProduct>, { getState, rejectWithValue }) => {
		const state = getState() as RootState;

		try {
			const updatedCart = await productsService.post(
				state.authReducer.token,
				data,
			);

			alert("The item successfully added to the cart");

			return updatedCart;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	},
);

export const updateUserProductAsync = createAsyncThunk(
	"userProducts/updateUserProduct",
	async (
		{ id, data }: { id: string; data: IUpdateProduct },
		{ getState, rejectWithValue },
	) => {
		const state = getState() as RootState;

		try {
			return await productsService.update(state.authReducer.token, id, data);
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	},
);

export const removeUserProductAsync = createAsyncThunk(
	"userProducts/removeUserProduct",
	async ({ id }: { id: string }, { getState, rejectWithValue }) => {
		const state = getState() as RootState;

		try {
			return await productsService.remove(state.authReducer.token, id);
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	},
);
