import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: "Email do usuário",
    default: "exemplo@login.com"
  })
  @IsString({ message: 'O campo de email precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de email é obrigatório.' })
  @IsEmail({}, { message: 'O campo de email precisa ser um email válido.' })
  @MinLength(3, { message: 'O campo de email precisa ter pelo menos 3 caracteres.' })
  @MaxLength(255, { message: 'O campo de email pode ter no máximo 255 caracteres.' })
  email: string;

  @ApiProperty({
    description: "Senha do usuário",
    default: "111111111"
  })
  @IsString({ message: 'O campo de password precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de password é obrigatório.' })
  @MinLength(3, { message: 'O campo de password precisa ter pelo menos 3 caracteres.' })
  @MaxLength(255, { message: 'O campo de password pode ter no máximo 255 caracteres.' })
  password: string;
}
