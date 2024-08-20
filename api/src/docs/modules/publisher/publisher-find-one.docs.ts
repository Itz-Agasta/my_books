import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  apiOperationDescription as description,
  publisherMock as example,
} from './publisher-mocks.docs';

export function FindOnePublisherDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma editora de acordo com o id passado.',
      description,
    }),

    ApiNotFoundResponse({
      description: 'Não foi possível encontrar a editora.',
    }),

    ApiOkResponse({
      schema: { example },
    }),
  );
}
