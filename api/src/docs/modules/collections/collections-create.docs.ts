import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  collectionMock,
  apiOperationDescription as description,
} from './collections-mocks.docs';
import { CreateCollectionDto } from 'src/modules/collections/dto/create-collection.dto';

export function CreateCollectionDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso e a coleção criada.',
      description,
    }),

    ApiBody({ type: CreateCollectionDto }),

    ApiCreatedResponse({
      status: 201,
      description: 'A coleção foi criada com sucesso.',
      schema: {
        example: collectionMock,
      },
    }),

    ApiBadRequestResponse({ description: 'Não foi possível criar a coleção.' }),
  );
}
