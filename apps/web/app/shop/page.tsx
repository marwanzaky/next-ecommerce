"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { IProduct } from "@repo/shared";
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
	const [position, setPosition] = useState("Relevance");

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

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">{position}</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent className="w-56">
						<DropdownMenuLabel>Sort by</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuRadioGroup
							value={position}
							onValueChange={setPosition}
						>
							<DropdownMenuRadioItem value="Relevance">
								Relevance
							</DropdownMenuRadioItem>

							<DropdownMenuRadioItem value="Lowest price">
								Lowest price
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="Highest price">
								Highest price
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="Top reviews">
								Top reviews
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="Most recent">
								Most recent
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
