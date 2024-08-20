import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  apiOperationDescription as description,
  collectionMock,
} from './collections-mocks.docs';
import { UpdateCollectionDto } from 'src/modules/collections/dto/update-collection.dto';

export function UpdateCollectionDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso e a coleção editada.',
      description,
    }),

    ApiBody({ type: UpdateCollectionDto }),

    ApiCreatedResponse({
      status: 201,
      description: 'A coleção foi atualizado com sucesso.',
      schema: {
        example: collectionMock,
      },
    }),

    ApiBadRequestResponse({
      description: 'Não foi possível atualizar a coleção.',
    }),
  );
}
