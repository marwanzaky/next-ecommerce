import {
	IGetAllProductsDto,
	IProduct,
	IUpdateProduct,
} from "_shared/interfaces";

const baseUrl = process.env.NEXT_PUBLIC_SERVER;

export const productsService = {
	getAllProducts,
	getProduct,
	post,
	update,
	remove,
	postProductReview,
};

async function getAllProducts(query?: {
	name?: string;
	user?: string;
	minPrice?: number;
	maxPrice?: number;
	featured?: boolean;
	limit?: number;
}): Promise<IProduct[]> {
	const response = await fetch(
		`${baseUrl}/products?${new URLSearchParams(query as any).toString()}`,
	);

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}

async function getProduct(id: string): Promise<IProduct> {
	const response = await fetch(`${baseUrl}/products/${id}`);

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}

async function post(
	token: string,
	product: Required<IUpdateProduct>,
): Promise<IProduct> {
	const response = await fetch(`${baseUrl}/products`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(product),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}

async function update(
	token: string,
	id: string,
	product: IUpdateProduct,
): Promise<IProduct> {
	const response = await fetch(`${baseUrl}/products/${id}`, {
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(product),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}

async function remove(token: string, id: string): Promise<null> {
	const response = await fetch(`${baseUrl}/products/${id}`, {
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

async function postProductReview(
	token: string,
	productId: string,
	rating: number,
	description: string,
): Promise<IProduct> {
	const response = await fetch(`${baseUrl}/products/${productId}/reviews`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			rating,
			description,
		}),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
