import { ButtonIcon } from "@ui/Button";
import { InputText } from "../inputText";

export type Column<T = any> = {
	field: keyof T;
	header: string;
	type: "text" | "usd" | "custom" | "number-input" | "action" | "checkbox";
	className?: string;
	width?: string;

	render?: (value: any, row: T) => React.ReactNode;
	onChange?: (value: number, row: T) => void;

	action?: (row: T) => void;
	actionIcon?: string;
};

export type TableProps = {
	className?: string;
	columns: Column[];
	data: any[];
};

export function Table({ className, columns, data }: TableProps) {
	return (
		<div className={`w-full overflow-x-auto ${className || ""}`}>
			<table className="w-full border rounded-xl !border-separate p-2.5">
				<thead>
					<tr>
						{columns.map((column, colIndex) => (
							<th
								key={`${column.field.toString()}-${colIndex}`}
								style={{ width: column.width }}
								className={`first:text-left p-2.5 ${column.className || ""}`}
							>
								{column.header}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{data.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{columns.map((column, colIndex) => (
								<td
									key={`${column.field.toString()}-${colIndex}`}
									style={{ width: column.width }}
									className={`px-2.5 h-16 text-center ${
										column.className || ""
									}`}
								>
									{column.type === "number-input" ? (
										<InputText
											className="mx-auto w-28"
											size="sm"
											type="number"
											value={row[column.field]}
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
										<ButtonIcon
											icon={column.actionIcon}
											onClick={() => column.action!(row)}
										/>
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
