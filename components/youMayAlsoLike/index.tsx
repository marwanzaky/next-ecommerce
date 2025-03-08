import Products from "@ui/Products";

import { IProduct } from "_shared/interfaces";

export default function YouMayAlsoLike({ products }: { products: IProduct[] }) {
	return <Products title="You may also like" data={products} />;
}
