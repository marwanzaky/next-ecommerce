"use client";

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	cartRemoveItem,
	cartUpdateItemQuantity,
} from "@redux/slices/cartSlice";
import {
	CartColumn,
	Column,
	selectCartTableData,
	selectCartTotal,
} from "@redux/selectors/cartSelectors";
import { Muted } from "@repo/ui/muted";
import { Paragraph } from "@repo/ui/paragraph";
import { Header } from "@repo/ui/header";
import { IProduct } from "@repo/shared";
import ProductCard from "@/components/product-card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

function LogoCell({
	label,
	imgUrl,
	href,
}: {
	label: string;
	imgUrl: string;
	href: string;
}) {
	const router = useRouter();

	const redirect: React.MouseEventHandler<HTMLImageElement> = () => {
		router.push(href);
	};

	return (
		<div className="flex gap-2 items-center">
			{/* <Avatar size="sm" imgUrl={imgUrl} onClick={redirect}></Avatar> */}

			<Avatar className="h-8 w-8 rounded-lg">
				<AvatarImage src={imgUrl} />
			</Avatar>

			<div role="button" onClick={redirect}>
				{label}
			</div>
		</div>
	);
}

function Table<T>({
	columns,
	data,
	onSelectionChange,
}: {
	columns: Column<T>[];
	data: any[];
	onSelectionChange?: (selectedRows: T[]) => void;
}) {
	const [selectedRows, setSelectedRows] = useState<string[]>([]);

	const handleRowSelect = (id: string) => {
		const newSelectedRows = selectedRows.includes(id)
			? selectedRows.filter((rowId) => rowId !== id)
			: [...selectedRows, id];
		setSelectedRows(newSelectedRows);

		if (onSelectionChange) {
			const selected = data.filter((row) => newSelectedRows.includes(row._id));
			onSelectionChange(selected);
		}
	};

	const handleSelectAll = () => {
		if (selectedRows.length === data.length) {
			setSelectedRows([]);
			onSelectionChange?.([]);
		} else {
			const allRowIds = data.map((row) => row._id);
			setSelectedRows(allRowIds);
			onSelectionChange?.(data);
		}
	};

	return (
		<div className="border rounded-md">
			<table className="w-full">
				<thead className="">
					<tr className="border-b">
						<th className="h-10 px-2 text-sm text-left text-gray-500 font-medium">
							<input
								type="checkbox"
								checked={selectedRows.length === data.length}
								onChange={handleSelectAll}
							/>
						</th>

						{columns.map((column) => (
							<th
								key={column.field.toString()}
								style={{ width: column.width }}
								className="h-10 px-2 text-sm text-left text-gray-500 font-medium"
							>
								{column.header}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{data.map((row, rowIndex) => (
						<tr key={rowIndex} className="border-b last:border-b-0">
							<td className="h-12 px-2 justify-center items-center w-4">
								<input
									type="checkbox"
									checked={selectedRows.includes(row._id)}
									onChange={() => handleRowSelect(row._id)}
								/>
							</td>

							{columns.map((column) => (
								<td
									key={column.field.toString()}
									style={{ width: column.width }}
									className="h-12 px-2 text-sm font-normal"
								>
									{column.type === "number-input" ? (
										<input
											type="number"
											value={row[column.field]}
											className="border rounded p-1 dark:bg-black"
											onChange={(e) =>
												column.onChange &&
												column.onChange(Number(e.target.value), row)
											}
										/>
									) : column.type === "usd" ? (
										"$" +
										(row[column.field] / 100).toLocaleString(undefined, {
											minimumFractionDigits: 2,
										})
									) : column.type === "custom" && column.render ? (
										column.render(row[column.field], row)
									) : column.type === "action" &&
									  column.action &&
									  column.actionIcon ? (
										<Button
											variant="outline"
											size="icon"
											onClick={() => column.action!(row)}
										>
											{column.actionIcon}
										</Button>
									) : (
										row[column.field]
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default function Card() {
	const dispatch = useDispatch<AppDispatch>();

	const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);
	const tableData = useAppSelector(selectCartTableData);
	const total = useAppSelector(selectCartTotal);

	const columns: CartColumn[] = [
		{
			header: "Product name",
			field: "imgUrl",
			type: "custom",
			render: (value, row) => (
				<LogoCell href={`shop/${row._id}`} label={row.name} imgUrl={value} />
			),
		},
		{ header: "Price", field: "price", type: "usd", width: "10%" },
		{
			header: "Quantity",
			field: "quantity",
			type: "number-input",
			width: "15%",
			onChange: (value, row) => {
				dispatch(cartUpdateItemQuantity({ _id: row._id, quantity: value }));
			},
		},
		{ header: "Total", field: "total", type: "usd", width: "10%" },
		{
			field: "_id",
			header: "Actions",
			type: "action",
			width: "10%",
			action: (row) => {
				dispatch(cartRemoveItem({ _id: row._id }));
			},
			actionIcon: <Trash2 size="1rem" />,
		},
	];

	useEffect(() => {
		fetch(`http://localhost:3001/products`)
			.then((res) => res.json())
			.then((data) => setFeaturedProducts(data));
	}, []);

	return (
		<div className="py-8 px-4 flex flex-col gap-4">
			<Header>Shopping cart</Header>

			{tableData.length > 0 ? (
				<div className="flex flex-col gap-4">
					<Table columns={columns} data={tableData} />

					<div className="w-fit ml-auto flex flex-col gap-4">
						<div>
							<Paragraph className="text-right text-sm">
								Subtotal $
								{(total / 100).toLocaleString(undefined, {
									minimumFractionDigits: 2,
								})}{" "}
								USD
							</Paragraph>
							<Muted className="text-right text-sm">
								Shipping and taxes will be calculated at checkout.
							</Muted>
						</div>
						<div className="w-fit ml-auto">
							<Button>Checkout</Button>
						</div>
					</div>
				</div>
			) : (
				<div className="text-center text-sm">
					You have no items in your cart
				</div>
			)}

			<div className="flex flex-col gap-4">
				<Header>Customers also purchased</Header>

				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
					{featuredProducts.map((item, i) => (
						<ProductCard key={i} data={item} />
					))}
				</div>
			</div>
		</div>
	);
}
