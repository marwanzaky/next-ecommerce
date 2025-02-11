import { ApiProperty } from "@nestjs/swagger";
import { IGetAllProductsDto, IProduct } from "@repo/shared";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class GetAllProductsDto implements IGetAllProductsDto {
	@ApiProperty({ type: String, example: "price" })
	@IsOptional()
	sortProperty?: keyof IProduct;

	@ApiProperty({ type: String, example: "price" })
	@IsOptional()
	sortOrder?: "asc" | "desc";

	@ApiProperty({ type: String, example: "iPhone" })
	@IsOptional()
	searchTerm?: string;

	@ApiProperty({ type: Number, example: 499 })
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	minPrice?: number;

	@ApiProperty({ type: Number, example: 799 })
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	maxPrice?: number;
}
