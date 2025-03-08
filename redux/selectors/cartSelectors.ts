// import { CartTableData } from "app/cart/constants";
import { RootState } from "../store";

// export const selectCartTableData = (state: RootState): CartTableData[] => {
// 	return state.cartReducer.items.map((item) => ({
// 		...item,
// 		imgUrl: item.imgUrls[0] || "",
// 		total: item.quantity * item.price,
// 	}));
// };

export const selectCartTotal = (state: RootState): number => {
	return state.cartReducer.items
		.map((item) => item.product.price * item.quantity)
		.reduce((sum, a) => sum + a, 0);
};
