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
	async handleElo(players: string[], logs: string) {

		let user = await this.getUser(players[0]);
		if (!user) user = await this.createUser({
			showdown_username: players[0],
		});
		
		let opponent = await this.getUser(players[0]);
		if (!opponent) user = await this.createUser({
			showdown_username: players[0],
		});

		// Update Elo
		let winner = () => {
			let lines = logs.split("\n");
			for (let line of lines) {
				if (line.startsWith("|win|")) {
					return line.split("|")[2];
				}
			}
		}
		let probability = (e1: number, e2: number) => {
			let elo = 0;
			let step1 = (e2 - e1);
			let step2 = (step1/400);
			let step3 = 10^step2;
			let step4 = 1 + step3;
			let step5 = 1/step4;
			elo = step5;
			return elo;
		}

		let up = probability(user.elo, opponent.elo);
		let op = probability(opponent.elo, user.elo);
		let determineK = (e) => {
			if (e <= 1200) return 32;
			else if (e >= 1200 && e <= 1400) return 24;
			else if (e >= 1400) return 16;
		}
		if (winner() === user.showdown_username) {
			user.elo = Math.floor(Math.round(user.elo + determineK(user.elo) * (1 - up)));
			opponent.elo = Math.floor(Math.round(opponent.elo + determineK(opponent.elo) * (0 - op)));
		} else {
			user.elo = Math.floor(Math.round(user.elo + determineK(user.elo) * (0 - up)));
			opponent.elo = Math.floor(Math.round(opponent.elo + determineK(opponent.elo) * (1 - op)));
		}

		await user.save();
		await opponent.save();
		
	}

	//#endregion
}
