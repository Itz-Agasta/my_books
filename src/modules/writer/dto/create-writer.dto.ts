import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { WriterNameAlreadyExists } from '../validate/writer-name-already-exists.constraint';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWriterDto {
  @ApiProperty({
    description: 'Nome do escritor',
    default: 'Nome teste',
  })
  @Validate(WriterNameAlreadyExists, {
    message: 'Já existe um autor com este nome.',
  })
  @IsString({ message: 'O campo de nome precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de nome é obrigatório.' })
  @MinLength(3, {
    message: 'O campo de nome precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(50, {
    message: 'O campo de nome pode ter no máximo 50 caracteres.',
  })
  name: string;
}
