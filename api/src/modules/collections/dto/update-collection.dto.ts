import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCollectionDto } from './create-collection.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateCollectionDto extends PartialType(CreateCollectionDto) {
  @ApiProperty({
    description: 'Id da Coleção',
    default: 1,
  })
  @IsInt({ message: 'O campo de id precisa ser um inteiro.' })
  @IsNotEmpty({ message: 'O campo de id é obrigatório.' })
  id: number;
}
