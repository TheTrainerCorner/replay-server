import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	@Prop()
	showdown_username: string;

	@Prop()
	discord_user_id?: string;

	@Prop()
	elo?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);