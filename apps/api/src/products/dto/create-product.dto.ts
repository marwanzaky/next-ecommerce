import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	price: number;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	priceCompare: number;

	@ApiProperty()
	@IsString({ each: true })
	@IsNotEmpty()
	imgUrls: string[];

	@ApiProperty()
	@IsString({ each: true })
	@IsNotEmpty()
	description: string;
}
