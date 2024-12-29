import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { IRequest } from "src/_interfaces/request.interface";
import { UpdateUserPasswordDto } from "./dto/update-user-password.dto";

@Controller("users")
@ApiBearerAuth("Authorization")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get("/me")
	async getMe(@Req() request: IRequest) {
		return this.usersService.findUser(request.user.id);
	}

	@Patch("/updateMe")
	async updateMe(
		@Req() request: IRequest,
		@Body() updateUserDto: UpdateUserDto,
	) {
		return this.usersService.updateUser(request.user.id, updateUserDto);
	}

	@Delete("/deleteMe")
	async removeMe(@Req() request: IRequest) {
		return this.usersService.removeUser(request.user.id);
	}

	@Patch("/updateMyPassword")
	async updateMyPassword(
		@Req() request: IRequest,
		@Body() updateUserPasswordDto: UpdateUserPasswordDto,
	) {
		return this.usersService.updateUserPassword(
			request.user.id,
			updateUserPasswordDto.currentPassword,
			updateUserPasswordDto.newPassword,
		);
	}

	@Post()
	async createUsers(@Body() createUserDto: CreateUserDto) {
		return this.usersService.createUsers(createUserDto);
	}

	@Get()
	async getAllUsers() {
		return this.usersService.findAllUsers();
	}

	@Get(":id")
	async getUser(@Param("id") id: string) {
		return this.usersService.findUser(id);
	}

	@Patch(":id")
	async updateUser(
		@Param("id") id: string,
		@Body() updateUserDto: UpdateUserDto,
	) {
		return this.usersService.updateUser(id, updateUserDto);
	}

	@Delete(":id")
	async removeUser(@Param("id") id: string) {
		return this.usersService.removeUser(id);
	}
}
