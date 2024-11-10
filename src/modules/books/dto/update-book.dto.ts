import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({
    description: 'Id do livro',
    default: 1,
  })
  @IsInt({ message: 'O campo de id precisa ser um inteiro.' })
  @IsNotEmpty({ message: 'O campo de id é obrigatório.' })
  id: number;
}
