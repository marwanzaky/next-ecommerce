export interface IProduct {
	_id: string;
	name: string;
	price: number;
	priceCompare: number;
	avgRatings: number;
	numReviews: number;
	imgUrls: string[];
	description: string;
	createdAt: string;
}

export type IUpdateProduct = Partial<IProduct>;
