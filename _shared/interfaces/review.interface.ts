import { IProduct } from "./product.interface";
import { IUser } from "./user.interface";

export interface IReview {
	_id: string;
	rating: number;
	description: string;
	product: IProduct;
	user: IUser;
	createdAt: string;
}
