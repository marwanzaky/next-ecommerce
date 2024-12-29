import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional } from "class-validator";

export class UpdateUserDto {
	@ApiProperty()
	@IsOptional()
	name?: string;

	@ApiProperty()
	@IsEmail()
	@IsOptional()
	email?: string;

	@ApiProperty()
	@IsOptional()
	photo?: string;
}
