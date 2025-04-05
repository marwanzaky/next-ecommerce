import { RootState } from "../store";

export const selectCartTotalStr = (state: RootState): string => {
	if (state.cartReducer.items.length <= 0) return "";

	const totalStr = state.cartReducer.items
		.map((item) => (item.product.price * item.quantity) / 100)
		.reduce((a, b) => a + b)
		.toFixed(2)
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	return `$${totalStr} USD`;
};
