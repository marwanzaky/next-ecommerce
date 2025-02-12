"use client";

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
	selectCartTableData,
	selectCartTotal,
} from "@redux/selectors/cartSelectors";
import { Muted } from "@repo/ui/muted";
import { Paragraph } from "@repo/ui/paragraph";
import { Header } from "@repo/ui/header";
import { IProduct } from "@repo/shared";
import ProductCard from "@/components/product-card";
import { Table } from "@/components/ui/custom/table";
import { getCartColumns } from "./constants";

export default function Card() {
	const baseUrl = process.env.NEXT_PUBLIC_SERVER;

	const dispatch = useDispatch<AppDispatch>();

	const columns = getCartColumns(dispatch);
	const tableData = useAppSelector(selectCartTableData);
	const total = useAppSelector(selectCartTotal);

	const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);

	useEffect(() => {
		fetch(`${baseUrl}/products`)
			.then((res) => res.json())
			.then((data) => setFeaturedProducts(data));
	}, []);

	return (
		<div className="py-8 px-4 flex flex-col gap-4">
			<Header>Shopping cart</Header>

			{tableData.length > 0 ? (
				<div className="flex flex-col gap-4">
					<Table columns={columns} data={tableData} />

					<div className="w-fit ml-auto flex flex-col gap-4">
						<div>
							<Paragraph className="text-right text-sm">
								Subtotal $
								{(total / 100).toLocaleString(undefined, {
									minimumFractionDigits: 2,
								})}{" "}
								USD
							</Paragraph>
							<Muted className="text-right text-sm">
								Shipping and taxes will be calculated at checkout.
							</Muted>
						</div>
						<div className="w-fit ml-auto">
							<Button>Checkout</Button>
						</div>
					</div>
				</div>
			) : (
				<div className="text-center text-sm">
					You have no items in your cart
				</div>
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
