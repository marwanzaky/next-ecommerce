"use client";

import { useEffect, useState } from "react";
import {
	GetAllProductsOptions,
	productsService,
} from "@redux/services/productsService";
import { useQuery } from "@tanstack/react-query";

import Layout from "@components/layout";

import ProductItem from "@ui/ProductItem";
import { ButtonFull, ButtonGhostGrey } from "@ui/Button";

import Select from "_shared/components/select";
import { IProduct } from "_shared/interfaces";
import Dialog from "_shared/components/dialog";
import { Chip } from "_shared/components/chip";
import { Section } from "_shared/components/section";
import { useRouter, useSearchParams } from "next/navigation";
import { stringify } from "qs";
import { InputCurrencyRange } from "_shared/components/InputCurrencyRange";
import RadioWithLabel from "_shared/components/radioWithLabel";

type SortOption = "relevancy" | "most-popular" | "low-price" | "high-price";

type Params = {
	sort: SortOption;
	minPrice: string | undefined;
	maxPrice: string | undefined;
	rating: string | undefined;
};

export default function Page() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const initialParams = Object.fromEntries(searchParams.entries()) as Params;

	const [sort, setSort] = useState<SortOption>(
		initialParams.sort || "relevancy",
	);

	const [minPrice, setMinPrice] = useState<number | undefined>(
		initialParams.minPrice ? parseInt(initialParams.minPrice) : undefined,
	);
	const [maxPrice, setMaxPrice] = useState<number | undefined>(
		initialParams.maxPrice ? parseInt(initialParams.maxPrice) : undefined,
	);

	const [rating, setRating] = useState<number | undefined>(
		initialParams.rating ? parseInt(initialParams.rating) : undefined,
	);

	const [draftMinPrice, setDraftMinPrice] = useState<number | undefined>(
		undefined,
	);
	const [draftMaxPrice, setDraftMaxPrice] = useState<number | undefined>(
		undefined,
	);

	const [draftRating, setDraftRating] = useState<number | undefined>(undefined);

	const sortMap: Record<
		SortOption,
		{ property: keyof IProduct; order: "asc" | "desc" }
	> = {
		relevancy: { property: "createdAt", order: "asc" },
		"most-popular": { property: "numReviews", order: "desc" },
		"low-price": { property: "price", order: "asc" },
		"high-price": { property: "price", order: "desc" },
	};

	const productsOptions: GetAllProductsOptions = {
		sort: sortMap[sort],
		query: {
			minPrice,
			maxPrice,
			avgRatings: rating,
		},
	};

	const { data, isLoading } = useQuery({
		queryKey: ["products", productsOptions],
		queryFn: () => productsService.getAllProducts(productsOptions),
		staleTime: 1000 * 60 * 5,
	});

	const options: { label: string; value: SortOption }[] = [
		{ label: "Relevancy", value: "relevancy" },
		{ label: "Most popular", value: "most-popular" },
		{ label: "Low price", value: "low-price" },
		{ label: "High price", value: "high-price" },
	];

	const [visible, setVisible] = useState(false);

	const updateParams = () => {
		const params: Params = {
			sort,
			minPrice: minPrice?.toString(),
			maxPrice: maxPrice?.toString(),
			rating: rating?.toString(),
		};

		router.push(`/products?${stringify(params, { skipNulls: true })}`);
	};

	const openFilterDialog = () => {
		setVisible(true);

		setDraftMaxPrice(maxPrice && maxPrice / 100);
		setDraftMinPrice(minPrice && minPrice / 100);
		setDraftRating(rating);
	};

	const clearPriceRange = () => {
		setMinPrice(undefined);
		setMaxPrice(undefined);
	};

	const clearRating = () => {
		setRating(undefined);
	};

	const applyFilters = () => {
		setMaxPrice(draftMaxPrice && draftMaxPrice * 100);
		setMinPrice(draftMinPrice && draftMinPrice * 100);
		setRating(draftRating);
		setVisible(false);
	};

	const cancelFilters = () => {
		setVisible(false);
	};

	useEffect(() => {
		updateParams();
	}, [sort, minPrice, maxPrice, rating]);

	return (
		<Layout title="Products">
			<Section>
				<div className="flex items-center justify-between gap-4 mb-4">
					<div className="flex items-center gap-4 flex-1 min-w-0">
						<ButtonGhostGrey onClick={openFilterDialog}>
							All filters
						</ButtonGhostGrey>

						<div className="flex flex-1 items-center gap-4 scrollbar-hide overflow-auto">
							{minPrice && maxPrice && (
								<Chip onClick={clearPriceRange}>
									${(minPrice / 100).toFixed(2)} - $
									{(maxPrice / 100).toFixed(2)}
								</Chip>
							)}
							{minPrice != undefined && maxPrice == null && (
								<Chip onClick={clearPriceRange}>
									Above ${(minPrice / 100).toFixed(2)}
								</Chip>
							)}
							{minPrice == null && maxPrice != undefined && (
								<Chip onClick={clearPriceRange}>
									Under ${(maxPrice / 100).toFixed(2)}
								</Chip>
							)}

							{rating !== undefined && rating === 5 && (
								<Chip onClick={clearRating}>5 Rating</Chip>
							)}
							{rating !== undefined && rating === 4 && (
								<Chip onClick={clearRating}>4.0+ Rating</Chip>
							)}
							{rating !== undefined && rating === 3 && (
								<Chip onClick={clearRating}>3.0+ Rating</Chip>
							)}
							{rating !== undefined && rating === 2 && (
								<Chip onClick={clearRating}>2.0+ Rating</Chip>
							)}
							{rating !== undefined && rating === 1 && (
								<Chip onClick={clearRating}>1.0+ Rating</Chip>
							)}
						</div>
					</div>

					<div className="flex justify-end items-center gap-4 flex-shrink-0">
						{isLoading === false && (
							<p className="text-grey hidden sm:block">
								Showing {data?.length} Products
							</p>
						)}

						<div className="flex items-center gap-2">
							<p className="hidden sm:block">Sort by:</p>

							<Select
								options={options}
								value={sort}
								onChange={(val) => setSort(val as SortOption)}
							/>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{data?.map((item) => (
						<ProductItem key={item._id} data={item} />
					))}
				</div>
			</Section>

			<Dialog
				className="flex flex-col gap-8"
				title="Filters"
				width="384px"
				isOpen={visible}
				onClose={() => setVisible(false)}
			>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<div className="text-lg">Price</div>

						<InputCurrencyRange
							minValue={draftMinPrice}
							maxValue={draftMaxPrice}
							onMinChange={(value) => setDraftMinPrice(value)}
							onMaxChange={(value) => setDraftMaxPrice(value)}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<div className="text-lg">Rating</div>

						<div className="flex flex-col gap-2">
							<RadioWithLabel
								name="rate"
								id="rate5"
								value="rate5"
								checked={draftRating === 5}
								onChange={(e) => setDraftRating(5)}
								label="★★★★★"
								labelClassName="text-primary-dark"
							/>
							<RadioWithLabel
								name="rate"
								id="rate4"
								value="rate4"
								checked={draftRating === 4}
								onChange={(e) => setDraftRating(4)}
								label="★★★★"
								labelClassName="text-primary-dark"
							/>
							<RadioWithLabel
								name="rate"
								id="rate3"
								value="rate3"
								checked={draftRating === 3}
								onChange={(e) => setDraftRating(3)}
								label="★★★"
								labelClassName="text-primary-dark"
							/>
							<RadioWithLabel
								name="rate"
								id="rate2"
								value="rate2"
								checked={draftRating === 2}
								onChange={(e) => setDraftRating(2)}
								label="★★"
								labelClassName="text-primary-dark"
							/>
							<RadioWithLabel
								name="rate"
								id="rate1"
								value="rate1"
								checked={draftRating === 1}
								onChange={(e) => setDraftRating(1)}
								label="★"
								labelClassName="text-primary-dark"
							/>
						</div>
					</div>
				</div>

				<div className="flex gap-2">
					<ButtonGhostGrey className="w-full" onClick={cancelFilters}>
						Cancel
					</ButtonGhostGrey>
					<ButtonFull className="w-full !m-0" onClick={applyFilters}>
						Apply filter
					</ButtonFull>
				</div>
			</Dialog>
		</Layout>
	);
}
