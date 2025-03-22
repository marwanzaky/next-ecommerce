import { createSlice } from "@reduxjs/toolkit";

import { IUser } from "../../_shared/interfaces";
import {
	getMeAsync,
	loginAsync,
	signupAsync,
	updateMeAsync,
	updateMyPasswordAsync,
} from "@redux/thunks/authThunks";

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
