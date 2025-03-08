import Layout from "@components/layout";

import Header from "@components/header";
import Products from "@ui/Products";
import WhyChooseUs from "@components/whyChooseUs";
import Testimonials from "@components/testimonials";

import { IProduct } from "_shared/interfaces";

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
	const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
	return req.json();
}
