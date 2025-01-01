"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { IGetAllProductsDto, IProduct } from "@repo/shared";
import ProductCard from "../../components/product-card";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Shop() {
	const [data, setData] = useState<IProduct[]>([]);
	const { token } = useAppSelector((state) => state.authReducer);
	const [position, setPosition] = useState<
		| "Most popular"
		| "Best rating"
		| "Newest"
		| "Price: Low to high"
		| "Price: High to low"
	>("Most popular");

	useEffect(() => {
		const query: IGetAllProductsDto = {};

		if (position === "Most popular") {
			query.property = "numReviews";
			query.order = "desc";
		} else if (position === "Best rating") {
			query.property = "avgRatings";
			query.order = "desc";
		} else if (position === "Newest") {
			query.property = "createdAt";
			query.order = "desc";
		} else if (position === "Price: High to low") {
			query.property = "price";
			query.order = "desc";
		} else if (position === "Price: Low to high") {
			query.property = "price";
			query.order = "asc";
		}

		fetch(
			`http://localhost:3001/products?${new URLSearchParams(query as any).toString()}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "application/json",
				},
			},
		)
			.then((res) => res.json())
			.then((data) => setData(data));
	}, [position]);

	return (
		<div className="flex flex-col gap-4 mt-4 px-4">
			<div className="flex justify-between">
				{/* <Button variant="secondary">All filters</Button> */}
				<div></div>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">{position}</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent className="w-56">
						<DropdownMenuLabel>Sort by</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuRadioGroup
							value={position}
							onValueChange={(value) => setPosition(value as any)}
						>
							<DropdownMenuRadioItem value="Most popular">
								Most popular
							</DropdownMenuRadioItem>

							{/* <DropdownMenuRadioItem value="Best rating">
								Best rating
							</DropdownMenuRadioItem> */}

							<DropdownMenuRadioItem value="Newest">
								Newest
							</DropdownMenuRadioItem>

							<DropdownMenuRadioItem value="Price: Low to high">
								Price: Low to high
							</DropdownMenuRadioItem>

							<DropdownMenuRadioItem value="Price: High to low">
								Price: High to low
							</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{data.map((item, i) => (
					<ProductCard key={i} data={item} />
				))}
			</div>
		</div>
	);
}
