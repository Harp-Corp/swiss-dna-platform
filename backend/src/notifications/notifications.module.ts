import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
