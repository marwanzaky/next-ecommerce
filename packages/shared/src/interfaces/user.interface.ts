export interface IUser {
	_id: string;
	role: "user" | "admin";
	name: string;
	email: string;

	/**
	 * base64
	 */
	photo: string | null;
}

export type IUpdateUser = Partial<Pick<IUser, "name" | "email" | "photo">>;
