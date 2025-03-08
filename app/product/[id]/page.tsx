import { PageProps } from ".next/types/app/layout";
import Layout from "@components/layout";
import Product from "@components/product";
import YouMayAlsoLike from "@components/youMayAlsoLike";
import { IProduct } from "_shared/interfaces";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const product = await getProduct(id);
	const products = await getProducts();

	return (
		<Layout title={product.name}>
			<Product product={product} />
			<YouMayAlsoLike products={products} />
		</Layout>
	);
}

async function getProduct(id: string): Promise<IProduct> {
	const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products/${id}`);
	return await req.json();
}

async function getProducts(): Promise<IProduct[]> {
	const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
	return await req.json();
}

export async function generateStaticParams() {
	const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
	const data: IProduct[] = await req.json();

	return data.map((product) => ({
		id: product._id,
	}));
}
