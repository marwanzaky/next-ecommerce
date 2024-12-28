import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { User, UserSchema } from "./users/entities/user.entity";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";
import { JwtService } from "@nestjs/jwt";

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				uri: config.get<string>("MONGODB_URI"),
			}),
		}),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		ConfigModule.forRoot({
			envFilePath: ".env",
			isGlobal: true,
		}),
		UsersModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [
		JwtService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule { }
