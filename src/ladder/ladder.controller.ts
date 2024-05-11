import { Controller, Get, Param } from '@nestjs/common';
import { LadderService } from './ladder.service';

@Controller('ladder')
export class LadderController {
	constructor(
		private ladderService: LadderService,
	) {}

	@Get("/:username")
	async getUser(@Param("username") username) {
		const user = await this.ladderService.getUser(username);

		return { user };
	}
}
