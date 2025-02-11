import { IUser, IUpdateUser } from "@repo/shared";

const baseUrl = process.env.NEXT_PUBLIC_SERVER;

export const usersService = {
	login,
	signup,
	getMe,
	updateMe,
	updateMyPassword,
};

async function login(
	email: string,
	password: string,
): Promise<{ token: string }> {
	const response = await fetch(`${baseUrl}/auth/login`, {
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

	return data;
}

async function signup(
	name: string,
	email: string,
	password: string,
): Promise<{ token: string }> {
	const response = await fetch(`${baseUrl}/auth/signup`, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({
			name,
			email,
			password,
		}),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}

async function getMe(token: string): Promise<IUser> {
	const response = await fetch(`${baseUrl}/users/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-type": "application/json",
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}

async function updateMe(
	token: string,
	updatedUser: IUpdateUser,
): Promise<IUser> {
	const response = await fetch(`${baseUrl}/users/updateMe`, {
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-type": "application/json",
		},
		body: JSON.stringify(updatedUser),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}

async function updateMyPassword(
	token: string,
	{
		currentPassword,
		newPassword,
	}: { currentPassword: string; newPassword: string },
): Promise<{ token: string }> {
	const response = await fetch(`${baseUrl}/users/updateMyPassword`, {
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-type": "application/json",
		},
		body: JSON.stringify({ currentPassword, newPassword }),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
