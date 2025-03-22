"use client";

import Link from "next/link";
import Image from "next/image";

import Stars from "@utils/components/stars";

import Icon from "@ui/Icon";

import { postCartItemAsync } from "@redux/thunks/cartThunks";

import { IProduct } from "_shared/interfaces";

import { ButtonIcon } from "@ui/Button";
import { useToggleFavorite } from "@hooks/useToggleFavorite";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";

type ProductItemProps = {
	data: IProduct;
};

export default function ProductItem({ data }: ProductItemProps) {
	const dispatch = useDispatch<AppDispatch>();

	const { isFavorite, addToFavorites, removeFromFavorites } = useToggleFavorite(
		data._id,
	);

	return (
		<div className="productItem">
			<div className="absolute top-1 right-1">
				{isFavorite ? (
					<ButtonIcon
						className="scale-[.85] hover:scale-100 shadow-md"
						styleClass="filter-primary-dark"
						icon="favorite_fill"
						onClick={removeFromFavorites}
					/>
				) : (
					<ButtonIcon
						className="scale-[.85] hover:scale-100 shadow-md"
						icon="favorite"
						onClick={addToFavorites}
					/>
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
