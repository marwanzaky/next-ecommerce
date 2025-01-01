"use client";

import { useRouter } from "next/navigation";

import React from "react";
import { IProduct } from "@repo/shared";

export default function ProductCard({
	data: { _id, name, price, imgUrls },
}: {
	data: IProduct;
}) {
	const router = useRouter();

	return (
		<div
			role="button"
			className="flex flex-col gap-2 group"
			onClick={() => router.push("/shop/" + _id)}
		>
			<img
				className="w-full h-64 object-cover rounded-lg group-hover:opacity-50"
				src={imgUrls[0]}
			/>
			<div className="">
				<div className="text-sm text-gray-500">{name}</div>
				<div className="">${price / 100}</div>
			</div>
		</div>
	);
}
