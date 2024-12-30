import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { isEmail } from "class-validator";
import { Document } from "mongoose";
import { IUser } from "@repo/shared";
import * as bcrypt from "bcrypt";

@Schema()
export class User extends Document implements Omit<IUser, "_id"> {
	@Prop({ required: true, enum: ["user", "admin"], default: "user" })
	role: "user" | "admin";

	@Prop()
	photo: string;

	@Prop({ required: true })
	name: string;

	@Prop({
		unique: true,
		required: true,
		lowercase: true,
		validate: {
			validator: (value: string) => isEmail(value),
			message: "Please enter a valid email",
		},
	})
	email: string;

	@Prop({ required: true, minlength: 8, select: false })
	password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 12);

	next();
});
