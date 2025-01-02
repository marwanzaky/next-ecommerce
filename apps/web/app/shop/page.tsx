"use client";

import { useEffect, useState } from "react";
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

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Muted } from "@repo/ui/muted";
import { Paragraph } from "@repo/ui/paragraph";
import { Header } from "@repo/ui/header";

export default function Shop() {
	const [data, setData] = useState<IProduct[]>([]);
	const [sortBy, setSortBy] = useState<
		| "Most popular"
		| "Best rating"
		| "Newest"
		| "Price: Low to high"
		| "Price: High to low"
	>("Most popular");

	useEffect(() => {
		const query: IGetAllProductsDto = {};

		if (sortBy === "Most popular") {
			query.property = "numReviews";
			query.order = "desc";
		} else if (sortBy === "Best rating") {
			query.property = "avgRatings";
			query.order = "desc";
		} else if (sortBy === "Newest") {
			query.property = "createdAt";
			query.order = "desc";
		} else if (sortBy === "Price: High to low") {
			query.property = "price";
			query.order = "desc";
		} else if (sortBy === "Price: Low to high") {
			query.property = "price";
			query.order = "asc";
		}

		fetch(
			`http://localhost:3001/products?${new URLSearchParams(query as any).toString()}`,
		)
			.then((res) => res.json())
			.then((data) => setData(data));
	}, [sortBy]);

	return (
		<div className="flex flex-col gap-4 mt-4 px-4">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Shop</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="flex justify-between items-center">
				{/* <Button variant="secondary">All filters</Button> */}
				<Header>Products</Header>

				<div className="flex items-center gap-4">
					{data.length > 0 && <Muted>{data.length} products</Muted>}

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">{sortBy}</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent className="w-56">
							<DropdownMenuLabel>Sort by</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuRadioGroup
								value={sortBy}
								onValueChange={(value) => setSortBy(value as any)}
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
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{data.map((item, i) => (
					<ProductCard key={i} data={item} />
				))}
			</div>
		</div>
	);
}
