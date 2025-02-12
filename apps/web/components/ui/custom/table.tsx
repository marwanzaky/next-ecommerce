import { useState } from "react";
import { Button } from "../button";

export type Column<T> = {
	field: keyof T;
	header: string;
	type: "text" | "usd" | "custom" | "number-input" | "action" | "checkbox";
	width?: string;

	render?: (value: any, row: T) => JSX.Element;
	onChange?: (value: number, row: T) => void;

	action?: (row: T) => void;
	actionIcon?: JSX.Element;
};

export type TableProps<T> = {
	columns: Column<T>[];
	data: any[];
	onSelectionChange?: (selectedRows: T[]) => void;
};

export function Table<T>({ columns, data, onSelectionChange }: TableProps<T>) {
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
