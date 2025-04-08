import Layout from "@components/layout";

import Header from "@components/header";
import Products from "@ui/Products";
import WhyChooseUs from "@components/whyChooseUs";
import Testimonials from "@components/testimonials";

import { IProduct } from "_shared/interfaces";
import { productsService } from "@redux/services/productsService";

export default async function Page() {
	const data = await getProducts();

	return (
		<Layout>
			<Header />
			<Products title="Featured collection" data={data} />
			<WhyChooseUs />
			<Testimonials />
		</Layout>
	);
}

async function getProducts(): Promise<IProduct[]> {
	return await productsService.getAllProducts({
		query: {
			featured: true,
			limit: 4,
		},
	});
}
