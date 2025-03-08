import Layout from "@components/layout";
import Products from "@ui/Products";
import { IProduct } from "_shared/interfaces";

export default async function Page() {
	const products = await getProducts();

	return (
		<Layout title="Products">
			<Products title="Featured collection" data={products} />
		</Layout>
	);
}

async function getProducts(): Promise<IProduct[]> {
	const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
	return await req.json();
}
