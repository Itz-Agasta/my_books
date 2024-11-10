import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  apiOperationDescription as description,
  stampMock,
  stampMock2,
} from './stamp-mocks.docs';

export function FindAllStampDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna um array contendo todos os selos.',
      description,
    }),

    ApiNotFoundResponse({
      description: 'Não foi possível encontrar os selos.',
    }),

    ApiOkResponse({
      schema: {
        example: [stampMock, stampMock2],
      },
    }),
  );
}
