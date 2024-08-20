import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsInt, IsNotEmpty, Validate } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: "Id do usuário",
    default: 1
  })
  @IsInt({ message: 'O campo de id precisa ser um inteiro.' })
  @IsNotEmpty({ message: 'O campo de id é obrigatório.' })
  id: number;
}
