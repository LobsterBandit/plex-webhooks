import {
  Body,
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { deserialize } from 'class-transformer';
import { PlexWebhookDto } from './plex-webhook.dto';

@Controller('plex')
export class PlexController {
  private readonly logger = new Logger(PlexController.name);

  @Post()
  @UseInterceptors(FileInterceptor('thumb'))
  async webhook(@Body('payload') plexWebhookDto, @UploadedFile() file) {
    const parsed = deserialize(PlexWebhookDto, plexWebhookDto);
    this.logger.log(`Plex event type: ${parsed.event}`);
    this.logger.log(JSON.stringify(parsed));
    if (file) {
      this.logger.log(Object.keys(file));
    }
    return 'accepted webhook';
  }
}
