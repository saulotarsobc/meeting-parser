import { PartialType } from '@nestjs/mapped-types';
import { CreateMwbDto } from './create-mwb.dto';

export class UpdateMwbDto extends PartialType(CreateMwbDto) {}
