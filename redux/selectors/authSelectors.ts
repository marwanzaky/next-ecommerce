import { RootState } from "../store";

export const selectUserInitials = (state: RootState): string | undefined => {
	const user = state.authReducer.user;
	if (!user || !user.name) return undefined;

	return user.name
		.split(" ")
		.map((n) => n[0])
		.splice(0, 2)
		.join("");
};
