import Link from "next/link";
import Image from "next/image";

import { ButtonIconRed } from "@ui/Button";

import { AppDispatch, useAppSelector } from "@redux/store";
import { useDispatch } from "react-redux";
import {
	deleteCartItemAsync,
	updateCartItemQuantityAsync,
} from "@redux/slices/cartSlice";
import { CartItem } from "_shared/interfaces/cart.interface";

function Item({ product, quantity }: CartItem) {
	const dispatch = useDispatch<AppDispatch>();

	return (
		<tr className="item">
			<th className="item-product">
				<div className="flex items-center">
					<Link className="item-product-img" href={`/product/${product._id}`}>
						<Image
							src={product.imgUrls[0]}
							alt={product.name}
							width={128}
							height={128}
						/>
					</Link>
					<Link className="item-product-name" href={`/product/${product._id}`}>
						{product.name}
					</Link>
				</div>
			</th>
			<th className="item-price">{"$" + (product.price / 100).toFixed(2)}</th>
			<th className="item-quantity">
				<input
					className="item-quantity-field"
					type="number"
					defaultValue={quantity}
					min="1"
					max="100"
					onChange={(e) =>
						dispatch(
							updateCartItemQuantityAsync({
								productId: product._id,
								quantity: parseInt(e.target.value),
							}),
						)
					}
				/>
			</th>
			<th className="item-total">
				{"$" + ((product.price * quantity) / 100).toFixed(2)}
			</th>
			<th className="item-remove">
				<ButtonIconRed
					icon="delete"
					onClick={() =>
						dispatch(deleteCartItemAsync({ productId: product._id }))
					}
				/>
			</th>
		</tr>
	);
}

export default function CartTable() {
	const { items } = useAppSelector((state) => state.cartReducer);

	return (
		<table className="cart-table">
			<thead className="thead">
				<tr>
					<th className="thead-th-product text-left">Product</th>
					<th className="thead-th-price">Price</th>
					<th className="thead-th-quantity">Quantity</th>
					<th className="thead-th-total">Total</th>
					<th className="thead-th-remove"></th>
				</tr>
			</thead>

			<tbody>
				{items.map((item) => (
					<Item {...item} key={item.product._id} />
				))}
			</tbody>
		</table>
	);
}
