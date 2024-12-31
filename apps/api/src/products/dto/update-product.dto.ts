import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	name: string;

	@ApiProperty()
	@IsNumber()
	@IsOptional()
	price: number;

	@ApiProperty()
	@IsNumber()
	@IsOptional()
	priceCompare: number;

	@ApiProperty()
	@IsString({ each: true })
	@IsOptional()
	imgUrls: string[];

	@ApiProperty()
	@IsString()
	@IsOptional()
	description: string;
}
