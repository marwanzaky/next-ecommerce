import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./entities/product.entity";
import { Model } from "mongoose";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { GetAllProductsDto } from "./dto/get-all-products.dto";

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
		getAllProductsDto: GetAllProductsDto,
	): Promise<Product[]> {
		return this.productModel.find().sort({
			[getAllProductsDto.property]: getAllProductsDto.order === "asc" ? 1 : -1,
		});
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
