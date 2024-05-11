import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Replay } from './schemas/replay.schema';
import { Model } from 'mongoose';
import { ReplayChannel } from './schemas/replay-channel.schema';
import { ShowdownServer } from './schemas/showdown-servers.schema';
import { NewReplayDto } from './dto/new-replay.dto';

@Injectable()
export class ReplaysService {
	constructor(
		@InjectModel(Replay.name) private replayModel: Model<Replay>,
		@InjectModel(ReplayChannel.name) private replayChannelModel: Model<ReplayChannel>,
		@InjectModel(ShowdownServer.name) private showdownServerModel: Model<ShowdownServer>,
	) {}

	//#region Replays

	async createReplay(newReplay: NewReplayDto) {
		return this.replayModel.create(newReplay);
	}

	async getReplayFromPathNameAndId(path_name: string, id: string) {
		return this.replayModel.findOne({ path_name, id });
	}

	async getReplaysFromPathName(path_name: string) {
		return this.replayModel.find({ path_name });
	}

	async getAllReplays() {
		return this.replayModel.find();
	}

	//#endregion


	//#region Showdown Server

	async getShowdownServerFromPathName(path_name: string) {
		return this.showdownServerModel.findOne({ path_name });
	}

	async getShowdownServerFromName(name: string) {
		return this.showdownServerModel.findOne({ server_name: name });
	}

	async getAllShowdownServer() {
		return this.showdownServerModel.find();
	}

	//#endregion
}
