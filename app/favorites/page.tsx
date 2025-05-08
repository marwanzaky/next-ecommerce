"use client";

import { useFavorites } from "@hooks/useFavorites";

import Layout from "@components/layout";
import ProductItem from "@ui/ProductItem";
import { Section } from "_shared/components/section";

export default function Page() {
	const { items } = useFavorites();

	return (
		<Layout title="Favorites">
			<Section>
				<h4 className="text-center">Your Favorites</h4>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{items.map((item) => (
						<ProductItem data={item} key={item._id}></ProductItem>
					))}
				</div>
			</Section>
		</Layout>
	);
}
