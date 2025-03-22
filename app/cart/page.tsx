import Layout from "@components/layout";
import Cart from "@components/cart";
import { IProduct } from "_shared/interfaces";
import { productsService } from "@redux/services/productsService";

export default async function Page() {
	const products = await getProducts();

	return (
		<Layout title="Cart">
			<Cart products={products} />
		</Layout>
	);
}

async function getProducts(): Promise<IProduct[]> {
	return await productsService.getAllProducts({
		featured: true,
		limit: 4,
	});
}
