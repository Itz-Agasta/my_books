import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  apiOperationDescription as description,
  writerMock as example,
} from './writer-mocks.docs';

export function FindOneWriterDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna um escritor de acordo com o id passado.',
      description,
    }),

    ApiNotFoundResponse({
      description: 'Não foi possível encontrar o escritor.',
    }),

    ApiOkResponse({
      schema: { example },
    }),
  );
}
