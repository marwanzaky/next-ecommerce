"use client";

import { Header } from "@repo/ui/header";
import { Muted } from "@repo/ui/muted";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppDispatch, useAppSelector } from "../../../redux/store";
import { IProduct } from "@repo/shared";
import ProductCard from "../../../components/product-card";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { cartAddItem } from "redux/slices/cartSlice";

export default function Product() {
	const params = useParams<{ slug: string }>();
	const router = useRouter();

	const dispatch = useDispatch<AppDispatch>();

	const [data, setData] = useState<IProduct | null>(null);
	const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);

	const { token } = useAppSelector((state) => state.authReducer);

	useEffect(() => {
		fetch(`http://localhost:3001/products/${params.slug}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => setData(data));

		fetch(`http://localhost:3001/products`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => setFeaturedProducts(data));
	}, []);

	return (
		<div className="pt-4 px-4 flex flex-col gap-16">
			{data ? (
				<div className="grid grid-cols-1 sm:grid-cols-2">
					<img
						className="w-full h-96 object-cover rounded-lg group-hover:opacity-50"
						src={data.imgUrls?.[0]}
					/>

					<div className="p-4 flex flex-col gap-4">
						<div>
							<Header>{data.name}</Header>
							<Muted>${data.price / 100}</Muted>
						</div>

						<div className="flex flex-col gap-2">
							<Button onClick={() => dispatch(cartAddItem(data))}>
								Add to card
							</Button>

							<Button
								onClick={() => {
									dispatch(cartAddItem(data));
									router.push("/cart");
								}}
								variant="outline"
							>
								Buy it now
							</Button>
						</div>

						<Muted className="whitespace-pre-wrap">{data.description}</Muted>
					</div>
				</div>
			) : (
				<div className="h-96"></div>
			)}

			<div className="flex flex-col gap-4">
				<Header>Customers also purchased</Header>

				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
					{featuredProducts.map((item, i) => (
						<ProductCard key={i} data={item} />
					))}
				</div>
			</div>
		</div>
	);
}
