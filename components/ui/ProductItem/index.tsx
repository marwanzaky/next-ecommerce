"use client";

import Link from "next/link";
import Image from "next/image";

import Stars from "@utils/components/stars";

import Icon from "@ui/Icon";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";

import { IProduct } from "_shared/interfaces";
import { postCartItemAsync } from "@redux/slices/cartSlice";

type ProductItemProps = {
	data: IProduct;
	favorite?: boolean;
};

export default function ProductItem({
	data,
	favorite = false,
}: ProductItemProps) {
	const dispatch = useDispatch<AppDispatch>();

	return (
		<div className="productItem">
			<div className="product_item-save">
				{favorite ? (
					<Icon className="filter-primary-dark" icon="favorite-fill" />
				) : (
					<Icon icon="favorite" />
				)}
			</div>

			<Link className="productItem-a" href={`/product/${data._id}`}>
				<Image src={data.imgUrls[0]} alt={data.name} width={512} height={512} />
			</Link>

			<div className="flex flex-col p-[8px] sm:p-[16px]">
				<h3 className="truncate">{data.name}</h3>
				{process.env.NEXT_PUBLIC_REVIEWS === "true" && (
					<Stars value={data.avgRatings} total={data.numReviews} />
				)}

				<div className="productItem-tag">
					<div className="flex flex-row">
						<span className="productItem-tag-price">
							{"$" + (data.price / 100).toFixed(2)}
						</span>
						<span className="productItem-tag-price_compare">
							{"$" + (data.priceCompare / 100).toFixed(2)}
						</span>
					</div>

					<button
						className="productItem-tag-add"
						onClick={() => dispatch(postCartItemAsync({ product: data }))}
					>
						<Icon icon="shopping_cart" />
					</button>
				</div>
			</div>
		</div>
	);
}
