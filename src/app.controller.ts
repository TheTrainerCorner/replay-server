import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ReplaysService } from './replays/replays.service';

@Controller()
export class AppController {
  constructor(
	private readonly appService: AppService,
	private readonly replaysService: ReplaysService,
) {}

  @Get("/")
  @Render("index")
  async root() {
	const main = await this.replaysService.getShowdownServerFromPathName("ttc");
	const servers = await this.replaysService.getAllShowdownServer();
	return {
		main,
		servers,
	};
  }
}
