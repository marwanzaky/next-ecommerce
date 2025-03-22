import Layout from "@components/layout";
import Product from "@components/product";
import YouMayAlsoLike from "@components/youMayAlsoLike";

import { productsService } from "@redux/services/productsService";

import { IProduct } from "_shared/interfaces";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const product = await getProduct(id);
	const products = await getFeaturedProducts();

	return (
		<Layout title={product.name}>
			<Product product={product} />
			<YouMayAlsoLike products={products} />
		</Layout>
	);
}

async function getProduct(id: string): Promise<IProduct> {
	return await productsService.getProduct(id);
}

async function getFeaturedProducts(): Promise<IProduct[]> {
	return await productsService.getAllProducts({
		featured: true,
		limit: 4,
	});
}

export async function generateStaticParams() {
	const data = await productsService.getAllProducts();

	return data.map((product) => ({
		id: product._id,
	}));
}
