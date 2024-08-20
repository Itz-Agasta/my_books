import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  apiOperationDescription as description,
  writerMock,
  writerMock2,
} from './writer-mocks.docs';

export function FindAllWriterDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna um array contendo todos os escritores.',
      description,
    }),

    ApiNotFoundResponse({
      description: 'Não foi possível encontrar os escritores.',
    }),

    ApiOkResponse({
      schema: {
        example: [writerMock, writerMock2],
      },
    }),
  );
}
