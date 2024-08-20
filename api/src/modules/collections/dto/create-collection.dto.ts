import { ApiProperty } from '@nestjs/swagger';
import { CollectionNameAlreadyExists } from '../validate/collection-name-already-exists.constraint';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

export class CreateCollectionDto {
  @ApiProperty({
    description: 'Nome da Coleção',
    default: 'Nome teste',
  })
  @Validate(CollectionNameAlreadyExists, {
    message: 'Já existe uma coleção com este nome.',
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
