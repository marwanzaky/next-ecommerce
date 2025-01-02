import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./entities/product.entity";
import { Model } from "mongoose";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { GetAllProductsDto } from "./dto/get-all-products.dto";
import { IProduct } from "@repo/shared";

@Injectable()
export class ProductsService {
	constructor(
		@InjectModel(Product.name) private productModel: Model<Product>,
	) {}

	async createProducts(createProductDto: CreateProductDto): Promise<Product> {
		const { name, price, priceCompare, imgUrls, description } =
			createProductDto;

		const user = await this.productModel.create({
			name,
			price,
			priceCompare,
			imgUrls,
			description,
		});

		return user.save();
	}

	async findAllProducts(
		sortProperty?: keyof IProduct,
		sortOrder?: "asc" | "desc",
		searchTerm?: string,
		minPrice?: number,
		maxPrice?: number,
	): Promise<Product[]> {
		const sort: { [key: string]: 1 | -1 } = {};

		if (sortProperty && sortOrder) {
			sort[sortProperty] = sortOrder === "asc" ? 1 : -1;
		}

		const query: { [key: string]: any } = {};

		if (searchTerm) {
			query.name = { $regex: new RegExp(searchTerm, "i") };
		}

		if (minPrice !== undefined || maxPrice !== undefined) {
			query.price = {};

			if (minPrice !== undefined) query.price.$gte = minPrice;
			if (maxPrice !== undefined) query.price.$lte = maxPrice;
		}

		return this.productModel.find(query).sort(sort);
	}

	async findProduct(id: string): Promise<Product> {
		const user = await this.productModel.findById(id);

		if (!user) {
			throw new NotFoundException("Could not find the user");
		}

		return user;
	}

	updateProduct(
		id: string,
		updateProductDto: UpdateProductDto,
	): Promise<Product> {
		return this.productModel.findByIdAndUpdate(id, updateProductDto, {
			new: true,
			runValidators: true,
		});
	}

	removeProduct(id: string): Promise<Product> {
		return this.productModel.findByIdAndDelete(id);
	}
}
