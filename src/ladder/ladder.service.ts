import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { NewUserDto } from './dto/new-user.dto';

@Injectable()
export class LadderService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
	) {}

	//#region Users

	async createUser(newUser: NewUserDto) {
		if (!newUser.elo) newUser.elo = 1200;
		return this.userModel.create(newUser);
	}

	async getUser(username: string) {
		return this.userModel.findOne({ showdown_username: username });
	}

	/***
	 * Resource: https://en.m.wikipedia.org/wiki/Elo_rating_system#Mathematical_details
	 */
	async handleElo(username: string, opponent: string, logs: string) {

		let user = await this.getUser(username);
		if (!user) user = await this.createUser({
			showdown_username: username,
		});
		let opp = await this.getUser(opponent);
		if (!opp) user = await this.createUser({
			showdown_username: username,
		})

		let elo = 0;
		let step1 = (opp.elo - user.elo);
		let step2 = (step1/400);
		let step3 = 10^step2;
		let step4 = 1 + step3;
		let step5 = 1/step4;
		elo = step5;

		return this.userModel.updateOne({ showdown_username: username }, { elo: elo});
	}

	//#endregion
}
