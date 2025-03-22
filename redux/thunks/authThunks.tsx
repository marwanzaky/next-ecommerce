import { usersService } from "@redux/services/usersService";
import { RootState } from "@redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUpdateUser } from "_shared/interfaces";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const loginAsync = createAsyncThunk(
	"auth/login",
	async (
		credentials: { email: string; password: string; router: AppRouterInstance },
		{ rejectWithValue },
	) => {
		const { email, password, router } = credentials;

		try {
			const data = await usersService.login(email, password);

			alert("Logged in successfully!");

			router.push("/");
			return data;
		} catch (error: any) {
			alert(error.message);
			return rejectWithValue(error.message);
		}
	},
);

export const signupAsync = createAsyncThunk(
	"auth/signup",
	async (
		credentials: {
			name: string;
			email: string;
			password: string;
			router: AppRouterInstance;
		},
		{ rejectWithValue },
	) => {
		const { name, email, password, router } = credentials;

		try {
			const data = await usersService.signup(name, email, password);

			alert("Account created successfully!");

			router.push("/signin");
			return data;
		} catch (error: any) {
			alert(error.message);

			return rejectWithValue(error.message);
		}
	},
);

export const getMeAsync = createAsyncThunk(
	"auth/getMe",
	async (_, { getState, rejectWithValue }) => {
		const state = getState() as RootState;

		try {
			return await usersService.getMe(state.authReducer.token);
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	},
);

export const updateMeAsync = createAsyncThunk(
	"auth/updateMe",
	async (updatedUser: IUpdateUser, { getState, rejectWithValue }) => {
		const state = getState() as RootState;

		try {
			const data = await usersService.updateMe(
				state.authReducer.token,
				updatedUser,
			);

			alert("User settings updated successfully!");

			return data;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	},
);

export const updateMyPasswordAsync = createAsyncThunk(
	"auth/updateMyPassword",
	async (
		payload: { currentPassword: string; newPassword: string },
		{ getState, rejectWithValue },
	) => {
		const state = getState() as RootState;

		try {
			const data = await usersService.updateMyPassword(
				state.authReducer.token,
				payload,
			);

			alert("User password updated successfully!");

			return data;
		} catch (error: any) {
			alert(error.message);

			return rejectWithValue(error.message);
		}
	},
);
