import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  apiOperationDescription as description,
  collectionMock,
  collectionMock2,
} from './collections-mocks.docs';

export function FindAllCollectionDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna um array contendo todas as coleções.',
      description,
    }),

    ApiNotFoundResponse({
      description: 'Não foi possível encontrar as coleções.',
    }),

    ApiOkResponse({
      schema: {
        example: [collectionMock, collectionMock2],
      },
    }),
  );
}
