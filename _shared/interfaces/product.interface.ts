import { IReview } from "./review.interface";

export interface IProduct {
	_id: string;
	name: string;
	price: number;
	priceCompare: number;
	discount: string;
	avgRatings: number;
	numReviews: number;
	reviews: IReview[];
	imgUrls: string[];
	description: string;
	createdAt: string;
	stock: number;
}

export type IUpdateProduct = Pick<
	Partial<IProduct>,
	"name" | "price" | "priceCompare" | "description" | "imgUrls"
>;
