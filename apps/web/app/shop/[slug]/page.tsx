"use client";

import { Button } from "@repo/ui/button";
import { Header } from "@repo/ui/header";
import { Muted } from "@repo/ui/muted";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/store";
import { IProduct } from "@repo/shared";

export default function Product() {
	const params = useParams<{ slug: string }>();

	const [data, setData] = useState<IProduct | null>(null);
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
	}, []);

	if (data == null) return <div className="mt-4 px-4">loading...</div>;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 mt-4 px-4">
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
					<Button>Add to card</Button>
					<Button variant="outline">Buy it now</Button>
				</div>

				<Muted className="whitespace-pre-wrap">{data.description}</Muted>
			</div>
		</div>
	);
}
