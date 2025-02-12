import { Trash2 } from "lucide-react";
import { LogoCell } from "@/components/ui/custom/cells/logoCell";
import {
	CartItem,
	cartRemoveItem,
	cartUpdateItemQuantity,
} from "@redux/slices/cartSlice";
import { AppDispatch } from "../../redux/store";
import { Column } from "@/components/ui/custom/table";

export type CartColumn = Column<CartItem & { imgUrl: string; total: number }>;
export type CartTableData = CartItem & {
	imgUrl: string;
	total: number;
};

export const getCartColumns = (dispatch: AppDispatch): CartColumn[] => [
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
