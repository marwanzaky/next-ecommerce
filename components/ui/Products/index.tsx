import ProductItem from "@ui/ProductItem";

import { Section } from "_shared/components/section";
import { IProduct } from "_shared/interfaces";

export default function Products({
	title,
	data,
}: {
	title: string;
	data: IProduct[];
}) {
	return (
		<Section>
			<h2>{title}</h2>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{data.map((item) => (
					<ProductItem key={item._id} data={item} />
				))}
			</div>
		</Section>
	);
}
