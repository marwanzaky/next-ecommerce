"use client";

import { useMemo, useState } from "react";
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
import { Header } from "@repo/ui/header";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { InputWithLabel } from "@/components/ui/input-with-label";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Search } from "lucide-react";
import { CheckboxWithLabel } from "@/components/ui/checkbox-with-label";
import { useQuery } from "@tanstack/react-query";
import { productsService } from "services/productsService";

export default function Shop() {
	const [sortBy, setSortBy] = useState<
		| "Most popular"
		| "Best rating"
		| "Newest"
		| "Price: Low to high"
		| "Price: High to low"
	>("Most popular");

	const [searchTerm, setSearchTerm] = useState<string>("");
	const [minPriceUsd, setMinPriceUsd] = useState<number>();
	const [maxPriceUsd, setMaxPriceUsd] = useState<number>();

	const query = useMemo<IGetAllProductsDto>(() => {
		const query: IGetAllProductsDto = {};

		if (sortBy === "Most popular") {
			query.sortProperty = "numReviews";
			query.sortOrder = "desc";
		} else if (sortBy === "Best rating") {
			query.sortProperty = "avgRatings";
			query.sortOrder = "desc";
		} else if (sortBy === "Newest") {
			query.sortProperty = "createdAt";
			query.sortOrder = "desc";
		} else if (sortBy === "Price: High to low") {
			query.sortProperty = "price";
			query.sortOrder = "desc";
		} else if (sortBy === "Price: Low to high") {
			query.sortProperty = "price";
			query.sortOrder = "asc";
		}

		if (searchTerm.trim()) query.searchTerm = searchTerm;
		if (minPriceUsd) query.minPrice = minPriceUsd * 100;
		if (maxPriceUsd) query.maxPrice = maxPriceUsd * 100;

		return query;
	}, [sortBy, searchTerm, minPriceUsd, maxPriceUsd]);

	const { data } = useQuery<IProduct[]>({
		queryKey: ["products", query],
		queryFn: () => productsService.getAllProducts(query),
	});

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
					{data && data.length > 0 && <Muted>{data.length} products</Muted>}

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

			<div className="flex gap-4">
				<div className="w-60 border rounded-lg px-4 pt-4 h-fit hidden md:block">
					<div className="flex flex-col gap-4">
						{/* <Input
							placeholder="Search by name"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						></Input> */}

						<InputWithIcon
							startIcon={Search}
							placeholder="Search by name"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						></InputWithIcon>
					</div>

					<Accordion type="single" collapsible className="w-full">
						<AccordionItem className="last:border-b-0" value="item-1">
							<AccordionTrigger>Price</AccordionTrigger>
							<AccordionContent>
								<div className="flex flex-col gap-4">
									<div className="flex flex-col gap-4">
										<CheckboxWithLabel
											id="under-10"
											label="Under $10"
											// value={priceUnder10Usd}
											// onChange={(e) => setPriceUnder10Usd(e.target.value)}
										/>
										<CheckboxWithLabel id="10-20" label="$10 to $20" />
										<CheckboxWithLabel id="20-30" label="$20 to $30" />
										<CheckboxWithLabel id="30-40" label="$30 to $40" />
										<CheckboxWithLabel id="50-50" label="$50 to $50" />
										<CheckboxWithLabel id="over-50" label="Over $50" />
									</div>

									<div className="flex gap-2 px-[1px]">
										<InputWithLabel
											id="from"
											label="From"
											type="number"
											min={0}
											value={minPriceUsd || ""}
											onChange={(e) => setMinPriceUsd(Number(e.target.value))}
										></InputWithLabel>
										<InputWithLabel
											id="to"
											label="To"
											type="number"
											min={0}
											value={maxPriceUsd || ""}
											onChange={(e) => setMaxPriceUsd(Number(e.target.value))}
										></InputWithLabel>
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem className="last:border-b-0" value="item-2">
							<AccordionTrigger>Rating</AccordionTrigger>
							<AccordionContent>
								Yes. It comes with default styles that matches the other
								components&apos; aesthetic.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>

				<div className="flex-1">
					<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{data && data.map((item, i) => <ProductCard key={i} data={item} />)}
					</div>
				</div>
			</div>
		</div>
	);
}
