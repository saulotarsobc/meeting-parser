import { Module } from '@nestjs/common';
import { MwbModule } from './mwb/mwb.module';

@Module({
  imports: [MwbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
