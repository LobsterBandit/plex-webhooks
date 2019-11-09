import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlexController } from './plex/plex.controller';

@Module({
  imports: [],
  controllers: [AppController, PlexController],
  providers: [AppService],
})
export class AppModule {}
