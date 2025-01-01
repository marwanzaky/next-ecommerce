import { ApiProperty } from "@nestjs/swagger";
import { IGetAllProductsDto, IProduct } from "@repo/shared";
import { IsOptional } from "class-validator";

export class GetAllProductsDto implements IGetAllProductsDto {
	@ApiProperty({ example: "price", type: String })
	@IsOptional()
	property?: keyof IProduct;

	@ApiProperty({ example: "asc", type: String })
	@IsOptional()
	order?: "asc" | "desc";
}
