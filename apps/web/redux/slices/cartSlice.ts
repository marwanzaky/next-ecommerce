import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProduct } from "@repo/shared";
import { toast } from "@/components/hooks/use-toast";

export type CartItem = IProduct & {
	quantity: number;
};

export type CartState = {
	items: CartItem[];
};

const initialState: CartState = {
	items: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		cartAddItem: (state, action: PayloadAction<IProduct>) => {
			const existingItem = state.items.find(
				(item) => item._id === action.payload._id,
			);

			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				state.items.push({
					...action.payload,
					quantity: 1,
				});
			}

			toast({
				title: "The item successfully added to the cart",
			});
		},
		cartRemoveItem: (state, action: PayloadAction<{ _id: string }>) => {
			state.items = state.items.filter(
				(item) => item._id !== action.payload._id,
			);
		},
		cartUpdateItemQuantity: (
			state,
			action: PayloadAction<{ _id: string; quantity: number }>,
		) => {
			const item = state.items.find((item) => item._id === action.payload._id);

			if (item) {
				let quantity = Math.max(1, action.payload.quantity);
				quantity = Math.min(100, quantity);

				item.quantity = quantity;
			}
		},
	},
});

export const { cartAddItem, cartRemoveItem, cartUpdateItemQuantity } =
	cartSlice.actions;

export default cartSlice.reducer;
