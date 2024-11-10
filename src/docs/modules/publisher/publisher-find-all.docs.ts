import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  apiOperationDescription as description,
  publisherMock,
  publisherMock2,
} from './publisher-mocks.docs';

export function FindAllPublisherDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna um array contendo todas as editoras.',
      description,
    }),

    ApiNotFoundResponse({
      description: 'Não foi possível encontrar as editoras.',
    }),

    ApiOkResponse({
      schema: {
        example: [publisherMock, publisherMock2],
      },
    }),
  );
}
