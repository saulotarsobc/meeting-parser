import { Module } from '@nestjs/common';
import { MwbController } from './mwb.controller';
import { MwbService } from './mwb.service';

@Module({
  controllers: [MwbController],
  providers: [MwbService],
})
export class MwbModule {}
