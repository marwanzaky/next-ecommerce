import { IsEmail, IsNotEmpty } from "class-validator";

export class SignUpDto {
	@IsNotEmpty()
	name: string;

	@IsEmail()
	email: string;

	@IsNotEmpty()
	password: string;
}
