import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ShowdownServerDocument = HydratedDocument<ShowdownServer>;

@Schema()
export class ShowdownServer {
	@Prop()
	owner_username: string;

	@Prop()
	server_name: string;

	@Prop()
	path_name: string;

	@Prop()
	server_url: string;

	@Prop()
	test_server_url?: string;

	@Prop()
	dex_site_url?: string;

	@Prop()
	description?: string;

	@Prop()
	banner_image_url?: string;

	@Prop()
	discord_server_url?: string;
}

export const ShowdownServerSchema = SchemaFactory.createForClass(ShowdownServer);