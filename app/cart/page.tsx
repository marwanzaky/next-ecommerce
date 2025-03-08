import Layout from "@components/layout";
import Cart from "@components/cart";
import { IProduct } from "_shared/interfaces";

export default async function Page() {
	const products = await getProducts();

	return (
		<Layout title="Cart">
			<Cart products={products} />
		</Layout>
	);
}

async function getProducts(): Promise<IProduct[]> {
	const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
	return await req.json();
}
