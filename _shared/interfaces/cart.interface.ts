import { IProduct } from "./product.interface";

export type CartItem = {
	product: Pick<IProduct, "_id" | "name" | "imgUrls" | "price">;
	quantity: number;
};

export interface ICart {
	_id: string;
	user: string;
	items: CartItem[];
}
