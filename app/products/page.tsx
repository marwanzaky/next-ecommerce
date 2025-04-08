"use client";

import Layout from "@components/layout";
import ProductItem from "@ui/ProductItem";
import Select from "_shared/components/select";
import { Section } from "_shared/components/section";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { productsService } from "@redux/services/productsService";
import { IProduct } from "_shared/interfaces";

type SortOption = "relevancy" | "most-popular" | "low-price" | "high-price";

export default function Page() {
	const [selected, setSelected] = useState<SortOption>("relevancy");

	const sortMap: Record<
		SortOption,
		{ property: keyof IProduct; order: "asc" | "desc" }
	> = {
		relevancy: { property: "createdAt", order: "asc" },
		"most-popular": { property: "numReviews", order: "desc" },
		"low-price": { property: "price", order: "asc" },
		"high-price": { property: "price", order: "desc" },
	};

	const { data } = useQuery({
		queryKey: ["products", selected],
		queryFn: () => productsService.getAllProducts({ sort: sortMap[selected] }),
		staleTime: 1000 * 60 * 5,
	});

	const options: { label: string; value: SortOption }[] = [
		{ label: "Relevancy", value: "relevancy" },
		{ label: "Most popular", value: "most-popular" },
		{ label: "Low price", value: "low-price" },
		{ label: "High price", value: "high-price" },
	];

	return (
		<Layout title="Products">
			<Section>
				<div className="flex items-center justify-between mb-4">
					<h2 className="!m-0">Casual</h2>

					<div className="flex items-center gap-4">
						<p className="text-grey">Showing {data?.length} Products</p>

						<div className="flex items-center gap-2">
							<p>Sort by:</p>

							<Select
								options={options}
								value={selected}
								onChange={(val) => setSelected(val as SortOption)}
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
		</Layout>
	);
}
