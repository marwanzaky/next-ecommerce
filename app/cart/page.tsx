"use client";

import { useRouter } from "next/navigation";

import Layout from "@components/layout";
import YouMayAlsoLike from "@components/youMayAlsoLike";

import { ButtonFull } from "@ui/Button";

import { useCart } from "@hooks/useCart";

import { Table } from "_shared/components/table";
import { Section } from "_shared/components/section";
import { paymentsService } from "@redux/services/paymentsService";

export default function Page() {
	const router = useRouter();

	const { items, columns, tableData, cartTotalStr, similarProducts } =
		useCart();

	const checkout: React.MouseEventHandler<HTMLButtonElement> = async (
		event,
	) => {
		event.preventDefault();

		const res = await paymentsService.createCheckoutSession(
			items.map((item) => ({
				id: item.product._id,
				quantity: item.quantity,
			})),
		);

		(window as Window).location = res.url;
	};

	return (
		<Layout title="Cart">
			<Section>
				{items.length > 0 ? (
					<div>
						<h4 className="text-center">Your Cart</h4>

						<Table className="mb-8" columns={columns} data={tableData} />

						<div className="flex flex-col justify-center items-end gap-[10px] mb-[20px]">
							<div>Subtotal&emsp;{cartTotalStr}</div>

							<div className="text-[80%] text-grey">
								Taxes and shipping calculated at checkout
							</div>
						</div>

						<div className="flex justify-end items-end">
							<ButtonFull className="!mr-0" onClick={checkout}>
								Check out
							</ButtonFull>
						</div>
					</div>
				) : (
					<div className="h-48 flex flex-col justify-center">
						<h1 className="text-center">Your cart is empty</h1>

						<div className="flex justify-center">
							<ButtonFull
								className="!mr-0"
								onClick={() => router.push("/products")}
							>
								Continue shopping
							</ButtonFull>
						</div>
					</div>
				)}
			</Section>

			{items.length === 0 && similarProducts && (
				<YouMayAlsoLike products={similarProducts} />
			)}
		</Layout>
	);
}
