import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDrawerDto } from './create-drawer.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateDrawerDto extends PartialType(CreateDrawerDto) {
  @ApiProperty({
    description: 'Id do Ilustrador',
    default: 1,
  })
  @IsInt({ message: 'O campo de id precisa ser um inteiro.' })
  @IsNotEmpty({ message: 'O campo de id é obrigatório.' })
  id: number;
}
