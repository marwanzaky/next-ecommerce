import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./entities/user.entity";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) { }

	async createUsers(createUserDto: CreateUserDto): Promise<User> {
		const { name, email, password } = createUserDto;

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await this.userModel
			.create({
				name,
				email,
				password: hashedPassword,
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
		return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
	}

	removeUser(id: string): Promise<User> {
		return this.userModel.findByIdAndDelete(id);
	}
}
