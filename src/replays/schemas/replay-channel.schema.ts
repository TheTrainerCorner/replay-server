import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ReplayChannelDocument = HydratedDocument<ReplayChannel>;

@Schema()
export class ReplayChannel {
	@Prop()
	format_id: string;

	@Prop()
	channel_id: string;
}

export const ReplayChannelSchema = SchemaFactory.createForClass(ReplayChannel);