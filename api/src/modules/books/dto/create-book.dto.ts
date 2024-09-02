import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { BookNameAlreadyExists } from '../validate/book-name-already-exists.constraint';
import { BookTypeValidate } from '../validate/book-type-validate.constraint';

export class CreateBookDto {
  @ApiProperty({
    description: 'Nome do livro',
    default: 'Nome teste',
  })
  @Validate(BookNameAlreadyExists, {
    message: 'Já existe um livro com este nome.',
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

  @ApiProperty({
    description: 'Sinopse do livro',
    default: 'Sinopse teste',
  })
  @IsString({ message: 'O campo de sinopse precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de sinopse é obrigatório.' })
  @MinLength(3, {
    message: 'O campo de sinopse precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(144, {
    message: 'O campo de sinopse pode ter no máximo 144 caracteres.',
  })
  sinopse: string;

  @ApiProperty({
    description: 'Tipo do livro',
    default: 'book',
  })
  @IsNotEmpty({ message: 'O campo de tipo é obrigatório.' })
  @Validate(BookTypeValidate, {
    message: 'Selecione um tipo válido para o livro.',
  })
  @IsString({ message: 'O campo de tipo precisa ser uma string.' })
  type: string;

  @ApiProperty({
    description: 'Quantidade de páginas do livro.',
    default: 0,
  })
  @IsInt({ message: 'O campo de quantidade de páginas precisa ser um número.' })
  @IsNotEmpty({ message: 'O campo de quantidade de páginas é obrigatório.' })
  pages: number;

  @ApiProperty({
    description: 'Indica se o livro já foi lido.',
    default: false,
  })
  @IsBoolean({ message: 'O campo de lido precisa ser um booleano.' })
  @IsNotEmpty({ message: 'O campo de lido é obrigatório.' })
  read: boolean = false;

  @ApiProperty({
    description: 'Id do escritor.',
    default: 0,
  })
  @IsInt({ message: 'O campo de id do escritor precisa ser um número.' })
  @IsNotEmpty({ message: 'O campo de id do escritor é obrigatório.' })
  writerId: number;

  @ApiProperty({
    description: 'Id do escritor.',
    default: 0,
  })
  @IsInt({ message: 'O campo de id do editora precisa ser um número.' })
  @IsNotEmpty({ message: 'O campo de id do editora é obrigatório.' })
  publisherId: number;

  @ApiProperty({
    description: 'Id do ilustrador.',
  })
  @IsOptional()
  @IsInt({ message: 'O campo de id do ilustrador precisa ser um número.' })
  drawerId?: number;

  @ApiProperty({
    description: 'Id do selo.',
  })
  @IsOptional()
  @IsInt({ message: 'O campo de id do selo precisa ser um número.' })
  stampId?: number;

  @ApiProperty({
    description: 'Id da coleção.',
  })
  @IsOptional()
  @IsInt({ message: 'O campo de id da coleção precisa ser um número.' })
  collectionId?: number;
}
