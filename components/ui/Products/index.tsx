import ProductItem from "@ui/ProductItem";
import { IProduct } from "_shared/interfaces";

export default function Products({
	title,
	data,
}: {
	title: string;
	data: IProduct[];
}) {
	return (
		<section className="section-products">
			<h2>{title}</h2>

			<div className="products-box">
				{data.map((item) => (
					<ProductItem key={item._id} data={item} />
				))}
			</div>
		</section>
	);
}
