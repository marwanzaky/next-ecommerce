import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
} from "@nestjs/common";

import { ProductsService } from "./products.service";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { GetAllProductsDto } from "./dto/get-all-products.dto";
import { Public } from "src/auth/auth.guard";

@Controller("products")
@Public()
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	async createProducts(@Body() createProductDto: CreateProductDto) {
		return this.productsService.createProducts(createProductDto);
	}

	@Get()
	async getAllProducts(@Query() getAllProductsDto: GetAllProductsDto) {
		const { sortProperty, sortOrder, searchTerm, minPrice, maxPrice } =
			getAllProductsDto;

		return this.productsService.findAllProducts(
			sortProperty,
			sortOrder,
			searchTerm,
			minPrice,
			maxPrice,
		);
	}

	@Get(":id")
	async getProduct(@Param("id") id: string) {
		return this.productsService.findProduct(id);
	}

	@Patch(":id")
	async updateProduct(
		@Param("id") id: string,
		@Body() updateProductDto: UpdateProductDto,
	) {
		return this.productsService.updateProduct(id, updateProductDto);
	}

	@Delete(":id")
	async removeProduct(@Param("id") id: string) {
		return this.productsService.removeProduct(id);
	}
}
