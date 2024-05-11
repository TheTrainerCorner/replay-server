import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ReplaysModule } from './replays/replays.module';
import { ShowdownServer, ShowdownServerSchema } from './replays/schemas/showdown-servers.schema';
import { LadderModule } from './ladder/ladder.module';
import databaseConfig from './config/database.config';
import serverConfig from './config/server.config';

@Module({
  imports: [
	ConfigModule.forRoot({
		load: [databaseConfig, serverConfig],
	}),
	MongooseModule.forRootAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: async (configServer: ConfigService) => ({
			uri: configServer.get<string>("database.uri"),
		}),
	}),
	ReplaysModule,
	LadderModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
