import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ReplayDocument = HydratedDocument<Replay>;

@Schema()
export class Replay {
	@Prop()
	id: string;

	@Prop()
	log: string;

	@Prop()
	players: string[];

	@Prop()
	format: string;

	@Prop()
	rating?: string;

	@Prop()
	private?: string;

	@Prop()
	password?: string;

	@Prop()
	inputlog?: string;

	@Prop()
	uploadtime?: string;
	
	@Prop()
	path_name?: string;
}

export const ReplaySchema = SchemaFactory.createForClass(Replay);