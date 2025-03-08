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
}

export type IUpdateProduct = Partial<IProduct>;
