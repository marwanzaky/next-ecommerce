import { IProduct } from "_shared/interfaces";

const baseUrl = process.env.NEXT_PUBLIC_SERVER;

export const favoritesService = {
	getMe,
	post,
	remove,
};

async function getMe(token: string): Promise<IProduct[]> {
	const response = await fetch(`${baseUrl}/favorites/me`, {
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

async function post(token: string, productId: string): Promise<IProduct> {
	const response = await fetch(`${baseUrl}/favorites/${productId}`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}

async function remove(token: string, productId: string): Promise<null> {
	const response = await fetch(`${baseUrl}/favorites/${productId}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
