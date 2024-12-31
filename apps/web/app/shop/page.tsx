"use client";

import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";

function Card({
	name,
	price,
	imgUrl,
}: {
	name: string;
	price: number;
	imgUrl: string;
}) {
	const router = useRouter();

	return (
		<div
			role="button"
			className="flex flex-col gap-2 group"
			onClick={() => router.push("/shop/111")}
		>
			<img
				className="w-full h-64 object-cover rounded-lg group-hover:opacity-50"
				src={imgUrl}
			/>
			<div className="">
				<div className="text-sm text-gray-500">{name}</div>
				<div className="">${price}</div>
			</div>
		</div>
	);
}

export default function Shop() {
	const router = useRouter();

	const clothsImgUrls: string[] = [
		"https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
		"https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-02.jpg",
		"https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-03.jpg",
		"https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-04.jpg",
	];

	const imgUrls: string[] = [
		"https://tailwindui.com/plus/img/ecommerce-images/home-page-04-trending-product-01.jpg",
		"https://tailwindui.com/plus/img/ecommerce-images/home-page-04-trending-product-02.jpg",
		"https://tailwindui.com/plus/img/ecommerce-images/home-page-04-trending-product-03.jpg",
		"https://tailwindui.com/plus/img/ecommerce-images/home-page-04-trending-product-04.jpg",
	];

	const imgUrlas: string[] = [
		"https://tailwindui.com/plus/img/ecommerce-images/home-page-02-product-01.jpg",
		"https://tailwindui.com/plus/img/ecommerce-images/home-page-02-product-02.jpg",
		"https://tailwindui.com/plus/img/ecommerce-images/home-page-02-product-03.jpg",
		"https://tailwindui.com/plus/img/ecommerce-images/home-page-02-product-04.jpg",
	];

	const allImgUrls = [...clothsImgUrls, ...imgUrls, ...imgUrlas];

	const data: { name: string; price: number; imgUrl: string }[] = Array.from(
		{ length: 12 },
		() => ({
			name: "Basic Tee",
			price: parseFloat((Math.random() * (30 - 10) + 10).toFixed(2)),
			imgUrl: allImgUrls[Math.floor(Math.random() * allImgUrls.length)] || "",
		}),
	);

	return (
		<div className="flex flex-col gap-4 mt-4 px-4">
			<div className="flex justify-between">
				<Button variant="secondary">All filters</Button>
				<Button variant="secondary">Sort by: Relevance</Button>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{data.map((item, i) => (
					<Card
						key={"card-" + i}
						name={item.name}
						price={item.price}
						imgUrl={item.imgUrl}
					/>
				))}
			</div>
		</div>
	);
}
