import { CartItem } from "_shared/interfaces/cart.interface";
import { IProduct } from "_shared/interfaces";

const STORAGE_KEY = "guest_cart";

const getItems = (): CartItem[] => {
	const raw = localStorage.getItem(STORAGE_KEY);
	return raw ? JSON.parse(raw) : [];
};

const saveItems = (items: CartItem[]) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const guestCartService = {
	getMe: async (): Promise<{ items: CartItem[] }> => {
		return { items: getItems() };
	},

	postItem: async (
		product: IProduct,
		quantity: number,
	): Promise<{ items: CartItem[] }> => {
		const cartItems = getItems();
		const index = cartItems.findIndex(
			(item) => item.product._id === product._id,
		);

		if (index > -1) {
			cartItems[index].quantity += quantity;
		} else {
			cartItems.push({ product, quantity });
		}

		saveItems(cartItems);
		return { items: cartItems };
	},

	updateItemQuantity: async (
		productId: string,
		quantity: number,
	): Promise<{ items: CartItem[] }> => {
		const cartItems = getItems();
		const index = cartItems.findIndex((item) => item.product._id === productId);

		if (index > -1) {
			if (quantity <= 0) {
				cartItems.splice(index, 1);
			} else {
				cartItems[index].quantity = quantity;
			}
		}

		saveItems(cartItems);
		return { items: cartItems };
	},

	deleteItem: async (productId: string): Promise<{ items: CartItem[] }> => {
		const cartItems = getItems().filter(
			(item) => item.product._id !== productId,
		);
		saveItems(cartItems);
		return { items: cartItems };
	},
};
