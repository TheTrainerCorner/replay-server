import { Module } from '@nestjs/common';
import { ReplaysController } from './replays.controller';
import { ReplaysService } from './replays.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Replay, ReplaySchema } from './schemas/replay.schema';
import { ReplayChannel, ReplayChannelSchema } from './schemas/replay-channel.schema';
import { ShowdownServer, ShowdownServerSchema } from './schemas/showdown-servers.schema';

@Module({
  imports: [
	MongooseModule.forFeature([
		{ name: Replay.name, schema: ReplaySchema },
		{ name: ReplayChannel.name, schema: ReplayChannelSchema },
		{ name: ShowdownServer.name, schema: ShowdownServerSchema },
	]),
  ],
  controllers: [ReplaysController],
  providers: [ReplaysService],
  exports: [ReplaysService],
})
export class ReplaysModule {}
