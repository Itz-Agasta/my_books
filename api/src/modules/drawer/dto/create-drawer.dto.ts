import { IsNotEmpty, IsString, MaxLength, MinLength, Validate } from "class-validator";
import { DrawerNameAlreadyExists } from "../validate/drawer-name-already-exists.constraint";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDrawerDto {
  @ApiProperty({
    description: 'Nome do Ilustrador',
    default: 'Nome teste',
  })
  @Validate(DrawerNameAlreadyExists, {
    message: 'Já existe um ilustrador com este nome.',
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
