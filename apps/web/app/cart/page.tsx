"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useRouter } from "next/navigation";
import { IProduct } from "@repo/shared";
import { Avatar } from "@repo/ui/avatar";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import { ButtonIcon } from "@repo/ui/button-icon";
import { LucideProps, Trash2 } from "lucide-react";

type Column<T> = {
	field: keyof T;
	header: string;
	type: "text" | "usd" | "custom" | "number-input" | "action" | "checkbox";
	width?: string;

	render?: (value: any, row: T) => React.ReactNode;
	onChange?: (value: number, row: T) => void;

	action?: (row: T) => void;
	actionIcon?: JSX.Element;
};

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
			<Avatar size="sm" imgUrl={imgUrl} onClick={redirect}></Avatar>
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

		console.log("newSelectedRows", newSelectedRows);

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
											className="border rounded p-1"
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
										<ButtonIcon onClick={() => column.action!(row)}>
											{column.actionIcon}
										</ButtonIcon>
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
	const router = useRouter();

	const dispatch = useDispatch<AppDispatch>();

	const columns: Column<
		IProduct & { total: string; quantity: number; imgUrl: string }
	>[] = [
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
				value = Math.max(1, value);
				value = Math.min(100, value);

				setTableData(
					tableData.map((item) => {
						if (item._id === row._id) {
							item.quantity = value;
							item.total = value * item.price;
						}
						return item;
					}),
				);
			},
		},
		{ header: "Total", field: "total", type: "usd", width: "10%" },
		{
			field: "_id",
			header: "Actions",
			type: "action",
			width: "10%",
			action: (row) => {
				setTableData(tableData.filter((item) => item._id !== row._id));
			},
			actionIcon: <Trash2 size="1rem" />,
		},
	];

	const [tableData, setTableData] = useState<
		{
			_id: string;
			imgUrl: string;
			name: string;
			price: number;
			quantity: number;
			total: number;
		}[]
	>([
		{
			_id: "677468796e529aef945233aa",
			imgUrl:
				"https://tailwindui.com/plus/img/ecommerce-images/home-page-02-product-01.jpg",
			name: "Personalised Notebook 1",
			price: 999,
			quantity: 1,
			total: 999,
		},
		{
			_id: "67746fad537e5b283bd13524",
			imgUrl:
				"https://tailwindui.com/plus/img/ecommerce-images/home-page-02-product-02.jpg",
			name: "Personalised Notebook 2",
			price: 1299,
			quantity: 1,
			total: 999,
		},
		{
			_id: "67746fb3537e5b283bd13527",
			imgUrl:
				"https://tailwindui.com/plus/img/ecommerce-images/home-page-02-product-03.jpg",
			name: "Personalised Notebook 3",
			price: 599,
			quantity: 1,
			total: 999,
		},
		{
			_id: "67746fbf537e5b283bd1352a",
			imgUrl:
				"https://tailwindui.com/plus/img/ecommerce-images/home-page-02-product-04.jpg",
			name: "Personalised Notebook 4",
			price: 3499,
			quantity: 1,
			total: 999,
		},
	]);

	return (
		<div className="py-8">
			{tableData.length > 0 ? (
				<Table columns={columns} data={tableData} />
			) : (
				<div>You have no items in your cart</div>
			)}
		</div>
	);
}
