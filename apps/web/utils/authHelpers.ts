import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AppDispatch } from "../redux/store";
import { getMeAsync, loginAsync } from "../redux/slices/authSlice";

export const handleLogin = async (
	email: string,
	password: string,
	dispatch: AppDispatch,
	router: AppRouterInstance,
) => {
	try {
		await dispatch(loginAsync({ email, password, router })).unwrap();
		await dispatch(getMeAsync());
	} catch (error) {
		console.error("Login failed:", error);
	}
};
