import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/users/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { SignUpDto } from "./dto/signup.dto";
import { Model } from "mongoose";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
		private jwtService: JwtService,
		private configService: ConfigService,
	) { }

	async signUp(signupDto: SignUpDto) {
		const { name, email, password } = signupDto;

		const user = await this.userModel
			.create({
				name,
				email,
				password,
			})
			.catch(() => {
				throw new UnauthorizedException("The user already have an account");
			});

		await user.save();

		const token = await this.jwtService.sign(
			{ id: user.id },
			{
				secret: this.configService.get("JWT_SECRET"),
				expiresIn: this.configService.get("JWT_EXPIRES"),
			},
		);

		return { token };
	}

	async login(loginDto: LoginDto) {
		const { email, password } = loginDto;

		const user = await this.userModel.findOne({
			email,
		}).select('+password');

		if (!user) throw new UnauthorizedException("Invalid email or password");

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch)
			throw new UnauthorizedException("Invalid email or password");

		const token = await this.jwtService.sign(
			{ id: user.id },
			{
				secret: this.configService.get("JWT_SECRET"),
				expiresIn: this.configService.get("JWT_EXPIRES"),
			},
		);

		return { token };
	}
}
