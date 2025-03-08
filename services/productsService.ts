import { IGetAllProductsDto, IProduct } from "_shared/interfaces";

const baseUrl = process.env.NEXT_PUBLIC_SERVER;

export const productsService = {
	getAllProducts,
	getProduct,
	postProductReview,
};

async function getAllProducts(
	query: IGetAllProductsDto = {},
): Promise<IProduct[]> {
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
