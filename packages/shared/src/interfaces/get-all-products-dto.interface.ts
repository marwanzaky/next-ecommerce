import { IProduct } from "./product.interface";

export interface IGetAllProductsDto {
	property?: keyof IProduct;
	order?: "asc" | "desc";
}
