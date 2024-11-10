import { IsDate, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReadingDto {
  @IsOptional()
  actually_page: number = 0;

  @IsOptional()
  @IsDate({ message: 'O campo de expectativa de término precisa ser um data.' })
  expected_end_date: Date;

  @IsInt({ message: 'O campo de id do livro precisa ser um número.' })
  @IsNotEmpty({ message: 'O campo de id do livro é obrigatório.' })
  bookId: number;

  @IsInt({ message: 'O campo de id do usuário precisa ser um número.' })
  @IsNotEmpty({ message: 'O campo de id do usuário é obrigatório.' })
  userId: number;
}
