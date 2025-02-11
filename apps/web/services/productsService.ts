import { IGetAllProductsDto, IProduct } from "@repo/shared";

const baseUrl = process.env.NEXT_PUBLIC_SERVER;

export const productsService = { getAllProducts, getProduct };

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
