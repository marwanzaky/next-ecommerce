"use client";

import { Button } from "@repo/ui/button";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { IProduct } from "@repo/shared";
import ProductCard from "../../components/product-card";

export default function Shop() {
	const [data, setData] = useState<IProduct[]>([]);
	const { token } = useAppSelector((state) => state.authReducer);

	useEffect(() => {
		fetch(`http://localhost:3001/products`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return (
		<div className="flex flex-col gap-4 mt-4 px-4">
			<div className="flex justify-between">
				<Button variant="secondary">All filters</Button>
				<Button variant="secondary">Sort by: Relevance</Button>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{data.map((item, i) => (
					<ProductCard key={i} data={item} />
				))}
			</div>
		</div>
	);
}
