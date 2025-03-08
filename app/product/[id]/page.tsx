import Layout from "@components/layout";
import Product from "@components/product";
import YouMayAlsoLike from "@components/youMayAlsoLike";
import { IProduct } from "_shared/interfaces";

export default async function Page({ params }: { params: { id: string } }) {
	const product = await getProduct(params.id);
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

export async function getStaticPaths() {
	const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
	const data: IProduct[] = await req.json();

	const paths = data.map((product) => {
		return { params: { id: product._id } };
	});

	return {
		paths,
		fallback: false,
	};
}
