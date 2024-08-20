import { PartialType } from '@nestjs/swagger';
import { CreateStampDto } from './create-stamp.dto';

export class UpdateStampDto extends PartialType(CreateStampDto) {}
