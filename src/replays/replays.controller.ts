import { Body, Controller, Get, HttpCode, NotFoundException, Param, Post, Render, UnauthorizedException } from '@nestjs/common';
import { ReplaysService } from './replays.service';
import { NewReplayDto } from './dto/new-replay.dto';
import axios from 'axios';
import path from 'path';
import { LadderService } from 'src/ladder/ladder.service';

@Controller("replays")
export class ReplaysController {
	constructor(
		private replaysService: ReplaysService,
		private ladderSerivce: LadderService,
	) {}

	@Post("/:path_name")
	@HttpCode(200)
	async createNewReplay(@Param("path_name") path_name: string, @Body() body: NewReplayDto) {
		const server = await this.replaysService.getShowdownServerFromPathName(path_name);
		if (!server) return new UnauthorizedException(
			"Your server is not authorized to use our replay server!",
			"Please join the TTC discord server and talk to Koreanpanda345 in order to get registered to use our replay server!",
		);

		await this.replaysService.createReplay(body);
		// await this.ladderSerivce.handleElo(body.players, body.log);
		if (path_name === "ttc") {
			await axios.post("https://main.thetrainercorner.net/api/discord/replay", {
				replay_id: body.id,
			});
		}

		return "Replay has been saved!";
	}

	@Get("/:path_name")
	@Render("server")
	async getServer(@Param("path_name") path_name: string) {
		const server = await this.replaysService.getShowdownServerFromPathName(path_name);
		if (!server) return new NotFoundException(
			"There doesn't seem to be a server under that path name!",
			"If you would like to use our replay server, then please join our discord server and talk to koreanpanda345!",
		);

		const replays = await this.replaysService.getReplaysFromPathName(path_name);
		return {
			server: server,
			replays: replays.reverse(),
		}
	}

	@Get("/:path_name/:id")
	@Render("replay")
	async getReplay(@Param("path_name") path_name: string, @Param("id") id: string) {
		const server = await this.replaysService.getShowdownServerFromPathName(path_name);
		if (!server) return new UnauthorizedException(
			"The path name that was given does not match any registered Showdown servers!",
			"If this is wrong, then please contact koreanpanda345!"
		);

		let replay = await this.replaysService.getReplayFromPathNameAndId(path_name, id);
		if (!replay) {
			if (path_name === "ttc") {
				replay = await this.replaysService.getReplayFromPathNameAndId(undefined, id);
			}

			if (!replay) return new NotFoundException("That replay doesn't seem to exist for this showdown server!");
		}

		return {
			server,
			replay,
		};
	}
}
