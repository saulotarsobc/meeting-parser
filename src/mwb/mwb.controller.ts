import { Controller, Post, Body } from '@nestjs/common';
import { MwbService } from './mwb.service';

@Controller('mwb')
export class MwbController {
  constructor(private readonly mwbService: MwbService) {}

  @Post('/parser')
  create(@Body('content') content: string) {
    return this.mwbService.parser(content);
  }
}
