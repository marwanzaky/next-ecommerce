import Layout from "@components/layout";
import { IProduct } from "_shared/interfaces";
import ProductItem from "@ui/ProductItem";

export default async function Page() {
	const products = await getProducts();

	return (
		<Layout title="Cart">
			<section className="section-container">
				<h4 className="text-center">Your Favorites</h4>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{products.map((item) => (
						<ProductItem data={item} key={item._id} favorite></ProductItem>
					))}
				</div>
			</section>
		</Layout>
	);
}

async function getProducts(): Promise<IProduct[]> {
	const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
	return await req.json();
}
