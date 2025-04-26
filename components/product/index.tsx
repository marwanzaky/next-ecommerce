"use client";

import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Feedback from "@components/feedback";
import YouMayAlsoLike from "@components/youMayAlsoLike";

import Stars from "@utils/components/stars";

import { ButtonFull, ButtonGhostGrey, ButtonIcon } from "@ui/Button";
import Info from "@ui/Info";
import Link from "next/link";

import { IProduct } from "_shared/interfaces";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import { postCartItemAsync } from "@redux/thunks/cartThunks";
import { InputText } from "_shared/components/inputText";
import { useToggleFavorite } from "@hooks/useToggleFavorite";
import { useQuery } from "@tanstack/react-query";
import {
	GetAllProductsOptions,
	productsService,
} from "@redux/services/productsService";

function Preview({ product }: { product: IProduct }) {
	const { isFavorite, addToFavorites, removeFromFavorites } = useToggleFavorite(
		product._id,
	);

	const [imgIndex, setImgIndex] = useState(0);

	const next = () => {
		setImgIndex((prev) => (prev + 1) % product.imgUrls.length);
	};

	const prev = () => {
		setImgIndex((prev) => (prev === 0 ? product.imgUrls.length - 1 : prev - 1));
	};

	return (
		<div className="preview group">
			<div className="opacity-0 group-hover:opacity-100 z-10 absolute top-1 right-1">
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

			<div className="relative shadow-md rounded-xl">
				<Image
					className="img"
					src={product.imgUrls[imgIndex]}
					alt={product.name}
					width={512}
					height={512}
				/>

				<ButtonIcon
					className="absolute shadow-md top-[calc(50%-19px)] right-[9.5px]"
					icon="arrow_forward"
					onClick={next}
				/>

				<ButtonIcon
					className="absolute shadow-md top-[calc(50%-19px)] left-[9.5px]"
					icon="arrow_back"
					onClick={prev}
				/>
			</div>

			<div className="imgs">
				{product.imgUrls.map((img, i) => (
					<Image
						className={`imgs-img shadow-md ${i === imgIndex ? "select" : ""}`}
						key={`${product.name} ${i + 1}`}
						src={img}
						alt={`${product.name} ${i + 1}`}
						onClick={() => setImgIndex(i)}
						width={128}
						height={128}
					/>
				))}
			</div>
		</div>
	);
}

function Details({ product }: { product: IProduct }) {
	const router = useRouter();

	const dispatch = useDispatch<AppDispatch>();

	const [quantity, setQuantity] = useState(1);

	const purchase: React.MouseEventHandler = async (event) => {
		event.preventDefault();
		dispatch(postCartItemAsync({ product, quantity }));
		router.push("/cart");
	};

	return (
		<div className="details">
			<div className="location">
				<Link href="/">Home</Link> <span>/</span>{" "}
				<Link href="/products">Products</Link> <span>/</span>{" "}
				<Link href={`/product/${product._id}`}>{product.name}</Link>
			</div>
			<h1 className="name truncate">{product.name}</h1>

			<div className="price-box">
				<span className="price">{"$" + (product.price / 100).toFixed(2)}</span>
				<span className="price_compare">
					{"$" + (product.priceCompare / 100).toFixed(2)}
				</span>
			</div>

			{process.env.NEXT_PUBLIC_REVIEWS === "true" && (
				<div className="stars-box">
					<Stars value={product.avgRatings} total={product.numReviews} />
				</div>
			)}

			<label className="font-bold block mb-[10px]" htmlFor="quantity">
				Quantity:
			</label>

			<InputText
				className="mb-[10px]"
				id="quantity"
				type="number"
				value={quantity}
				min={1}
				max={100}
				onChange={(e) => setQuantity(parseInt(e.target.value))}
			/>

			<ButtonGhostGrey
				className="w-full md:w-[400px]"
				onClick={() => dispatch(postCartItemAsync({ product, quantity }))}
			>
				Add to cart
			</ButtonGhostGrey>
			<ButtonFull className="w-full md:w-[400px]" onClick={purchase}>
				Buy it now
			</ButtonFull>

			<Info display={true} title="Description">
				<p>{product.description}</p>
			</Info>

			<Info title="Shipping and Refund Policy">
				<h4>Refund Policy</h4>
				<p>
					We have a 30-day return policy, which means you have 30 days after
					receiving your item to request a return.
					<br />
					<br />
					To be eligible for a return, your item must be in the same condition
					that you received it, unworn or unused, with tags, and in its original
					packaging. You&apos;ll also need the receipt or proof of purchase.
					<br />
					<br />
					To start a return, you can contact us at contact@goodies2buy.com. If
					your return is accepted, we&apos;ll send you a return shipping label,
					as well as instructions on how and where to send your package. Items
					sent back to us without first requesting a return will not be
					accepted.
					<br />
					<br />
					You can always contact us for any return question at
					contact@goodies2buy.com.
					<br />
					<br />
				</p>

				<h4>Shipping policy</h4>
				<p>
					All orders are processed within 1 to 3 business days (excluding
					weekends and holidays) after receiving your order confirmation email.
					You will receive another notification when your order has shipped.
					<br />
					<br />
					International Shipping
					<br />
					<br />
					We offer international shipping to the following countries: United
					States, United Kingdom, Australia, Canada, Germany, France, Spain,
					United Arab Emirates, Indonesia.
					<br />
					<br />
					Your order may be subject to import duties and taxes (including VAT),
					which are incurred once a shipment reaches your destination country.
					<br />
					<br />
				</p>
			</Info>
		</div>
	);
}

export default function Product({ product }: { product: IProduct }) {
	const options: GetAllProductsOptions = {
		query: {
			excludeIds: [product._id],
			limit: 4,
		},
	};

	const { data } = useQuery({
		queryKey: ["products", options],
		queryFn: () => productsService.getAllProducts(options),
		staleTime: 1000 * 60 * 5,
	});

	return (
		<>
			<section className="product">
				<div
					className={`preview-n-details ${
						process.env.NEXT_PUBLIC_REVIEWS === "true"
							? "mb-[30px] md:mb-[30px]"
							: ""
					}`}
				>
					<Preview product={product} />
					<Details product={product} />
				</div>

				{process.env.NEXT_PUBLIC_REVIEWS === "true" &&
					product.reviews.length > 0 && <Feedback product={product} />}
			</section>

			{data && <YouMayAlsoLike products={data} />}
		</>
	);
}
