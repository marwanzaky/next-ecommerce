import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./entities/user.entity";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
		private jwtService: JwtService,
		private configService: ConfigService,
	) { }

	async updateUserPassword(id: string, currentPassword: string, newPassword: string): Promise<{ token: string; }> {
		const user = await this.userModel.findById(id).select('+password');
		const isCorrect = await bcrypt.compare(currentPassword, user.password);

		if (isCorrect === false) {
			throw new UnauthorizedException("Incorrect current password");
		}

		user.password = newPassword;

		try { await user.save(); }
		catch (_) {
			throw new UnauthorizedException("Password is shorter than the minimum allowed length (8)");
		}

		const token = await this.jwtService.sign(
			{ id: user.id },
			{
				secret: this.configService.get("JWT_SECRET"),
				expiresIn: this.configService.get("JWT_EXPIRES"),
			},
		);

		return { token };
	}

	async createUsers(createUserDto: CreateUserDto): Promise<User> {
		const { name, email, password } = createUserDto;

		const user = await this.userModel
			.create({
				name,
				email,
				password,
			})
			.catch(() => {
				throw new UnauthorizedException("The user already have an account");
			});

		return user.save();
	}

	async findAllUsers(): Promise<User[]> {
		return this.userModel.find();
	}

	async findUser(id: string): Promise<User> {
		const user = await this.userModel.findById(id);

		if (!user) {
			throw new NotFoundException("Could not find the user");
		}

		return user;
	}

	updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true, runValidators: true });
	}

	removeUser(id: string): Promise<User> {
		return this.userModel.findByIdAndDelete(id);
	}
}
