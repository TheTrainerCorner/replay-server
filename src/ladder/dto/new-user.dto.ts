import { IsNumber, IsOptional, IsString } from "class-validator";

export class NewUserDto {
	@IsString()
	showdown_username: string;

	@IsOptional()
	@IsString()
	discord_user_id?: string;

	@IsOptional()
	@IsNumber()
	elo?: number;
}