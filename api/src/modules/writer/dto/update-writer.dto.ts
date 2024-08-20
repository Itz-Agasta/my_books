import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWriterDto } from './create-writer.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateWriterDto extends PartialType(CreateWriterDto) {
  @ApiProperty({
    description: 'Id do Escritor',
    default: 1,
  })
  @IsInt({ message: 'O campo de id precisa ser um inteiro.' })
  @IsNotEmpty({ message: 'O campo de id é obrigatório.' })
  id: number;
}
