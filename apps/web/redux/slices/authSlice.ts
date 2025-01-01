import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usersService } from "../../services/usersService";
import { RootState } from "../store";

import { IUser, IUpdateUser } from "@repo/shared";
import { toast } from "@/components/hooks/use-toast";

export type AuthState = {
	user: IUser | null;
	token: string;
	isAuthenticated: boolean;

	loading: boolean;
	error: string | null;
};

const initialState: AuthState = {
	user: null,
	token: "",
	isAuthenticated: false,

	loading: false,
	error: null,
};

export const loginAsync = createAsyncThunk(
	"auth/login",
	async (
		credentials: { email: string; password: string; router: AppRouterInstance },
		{ rejectWithValue },
	) => {
		const { email, password, router } = credentials;

		try {
			const data = await usersService.login(email, password);

			toast({
				title: "Logged in successfully!",
			});

			router.push("/");
			return data;
		} catch (error: any) {
			toast({
				title: error.message,
			});

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

			toast({
				title: "Account created successfully!",
			});

			router.push("/login");
			return data;
		} catch (error: any) {
			toast({
				title: error.message,
			});

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

			toast({
				title: "User settings updated successfully!",
			});

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

			toast({
				title: "User password updated successfully!",
			});

			return data;
		} catch (error: any) {
			toast({
				title: error.message,
			});

			return rejectWithValue(error.message);
		}
	},
);

export const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		logOut: (): AuthState => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		// loginAsync
		builder
			.addCase(loginAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.isAuthenticated = true;
				state.token = action.payload.token;
			})
			.addCase(loginAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
		// signupAsync
		builder
			.addCase(signupAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signupAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.token = action.payload.token;
			})
			.addCase(signupAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
		// getMeAsync
		builder
			.addCase(getMeAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getMeAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(getMeAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
		// updateMeAsync
		builder
			.addCase(updateMeAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateMeAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(updateMeAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
		// updateMyPasswordAsync
		builder
			.addCase(updateMyPasswordAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateMyPasswordAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.token = action.payload.token;
			})
			.addCase(updateMyPasswordAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
