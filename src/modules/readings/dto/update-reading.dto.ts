import { PartialType } from '@nestjs/swagger';
import { CreateReadingDto } from './create-reading.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateReadingDto extends PartialType(CreateReadingDto) {
  @IsInt({ message: 'O campo de id precisa ser um inteiro.' })
  @IsNotEmpty({ message: 'O campo de id é obrigatório.' })
  id: number;
}
