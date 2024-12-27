import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type AuthState = {
	token: string;
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;
};

const initialState: AuthState = {
	token: "",
	isAuthenticated: false,
	loading: false,
	error: null
};

export const loginAsync = createAsyncThunk(
	'auth/login',
	async (credentials: { email: string; password: string, router: AppRouterInstance }, { rejectWithValue }) => {
		const { email, password, router } = credentials;

		try {
			const response = await fetch("http://localhost:3001/auth/login", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message);
			}

			alert('Logged in successfully!');
			router.push('/');

			return data

		} catch (error: any) {
			alert(error.message);
			return rejectWithValue(error.message);
		}
	}
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
		builder
			.addCase(loginAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginAsync.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
				state.loading = false;
				state.isAuthenticated = true;
				state.token = action.payload.token;
			})
			.addCase(loginAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
