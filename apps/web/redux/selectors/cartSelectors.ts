import { RootState } from "../store";
import { CartItem } from "redux/slices/cartSlice";

export type Column<T> = {
	field: keyof T;
	header: string;
	type: "text" | "usd" | "custom" | "number-input" | "action" | "checkbox";
	width?: string;

	render?: (value: any, row: T) => React.ReactNode;
	onChange?: (value: number, row: T) => void;

	action?: (row: T) => void;
	actionIcon?: JSX.Element;
};

export type CartColumn = Column<CartItem & { imgUrl: string; total: number }>;

export type CartTableData = CartItem & {
	imgUrl: string;
	total: number;
};

export const selectCartTableData = (state: RootState): CartTableData[] => {
	return state.cartReducer.items.map((item) => ({
		...item,
		imgUrl: item.imgUrls[0] || "",
		total: item.quantity * item.price,
	}));
};

export const selectCartTotal = (state: RootState): number => {
	return state.cartReducer.items
		.map((item) => item.price * item.quantity)
		.reduce((sum, a) => sum + a, 0);
};
