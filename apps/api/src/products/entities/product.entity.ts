import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IProduct } from "@repo/shared";

@Schema()
export class Product extends Document implements Omit<IProduct, "_id"> {
	@Prop({
		type: String,
		required: [true, "A product must have a name"],
		unique: true,
		trim: true,
	})
	name: string;

	@Prop({
		type: Number,
		required: [true, "A product must have a price"],
	})
	price: number;

	@Prop({
		type: Number,
		required: [true, "A product must have a priceCompare"],
	})
	priceCompare: number;

	@Prop({
		type: Number,
		default: 0,
	})
	avgRatings: number;

	@Prop({
		type: Number,
		default: 0,
	})
	numReviews: number;

	@Prop({
		type: [String],
		required: true,
	})
	imgUrls: string[];

	@Prop({
		type: String,
		required: [true, "A product must have a description"],
		trim: true,
	})
	description: string;

	@Prop({
		type: Date,
		default: Date.now(),
	})
	createdAt: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
