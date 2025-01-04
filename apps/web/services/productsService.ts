import { IGetAllProductsDto, IProduct } from "@repo/shared";

const API_URL = "http://localhost:3001";

export const productsService = { getAllProducts, getProduct };

async function getAllProducts(
	query: IGetAllProductsDto = {},
): Promise<IProduct[]> {
	const response = await fetch(
		`${API_URL}/products?${new URLSearchParams(query as any).toString()}`,
	);

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}

async function getProduct(id: string): Promise<IProduct> {
	const response = await fetch(`${API_URL}/products/${id}`);

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
