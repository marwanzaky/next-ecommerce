import { ICart } from "_shared/interfaces/cart.interface";

const baseUrl = process.env.NEXT_PUBLIC_SERVER;

export const cartsService = {
	getMe,
	postItem,
	updateItemQuantity,
	deleteItem,
};

async function getMe(token: string): Promise<ICart> {
	const response = await fetch(`${baseUrl}/carts/me`, {
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

async function postItem(
	token: string,
	productId: string,
	quantity: number,
): Promise<ICart> {
	const response = await fetch(`${baseUrl}/carts/items/${productId}`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			quantity,
		}),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}

async function updateItemQuantity(
	token: string,
	productId: string,
	quantity: number,
): Promise<ICart> {
	if (quantity <= 0) {
		quantity = 1;
	}

	const response = await fetch(`${baseUrl}/carts/items/${productId}/quantity`, {
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			quantity,
		}),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}

async function deleteItem(token: string, productId: string): Promise<ICart> {
	const response = await fetch(`${baseUrl}/carts/items/${productId}`, {
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
