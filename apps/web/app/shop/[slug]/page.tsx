"use client";

import { Button } from "@repo/ui/button";
import { Header } from "@repo/ui/header";
import { Muted } from "@repo/ui/muted";
import { Paragraph } from "@repo/ui/paragraph";
import { useRouter } from "next/navigation";

export default function Shop() {
	const router = useRouter();

	const data: {
		name: string;
		price: number;
		imgUrl: string;
		description: string;
	} = {
		name: "Basic Tee",
		price: 19.99,
		imgUrl:
			"https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-03.jpg",
		description: `Even lighter carry. Enhance everyday life with your MacBook with a minimalist solution, highlighted with a bold color contrast for on-the-go protection in style.
           
            - Everyday protection in understated style
            - Form-fitting to your device
            - Crafted with a resistant textile exterior & padded interior
            - Refined genuine leather accents
            - Water-repellent zipper & coated canvas finish for extra care`,
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 mt-4 px-4">
			<img
				className="w-full h-96 object-cover rounded-lg group-hover:opacity-50"
				src={data.imgUrl}
			/>
			<div className="p-4 flex flex-col gap-4">
				<div>
					<Header>{data.name}</Header>
					<Muted>${data.price}</Muted>
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
