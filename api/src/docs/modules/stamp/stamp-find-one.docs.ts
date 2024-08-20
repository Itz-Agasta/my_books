import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  apiOperationDescription as description,
  stampMock as example,
} from './stamp-mocks.docs';

export function FindOneStampDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna um selo de acordo com o id passado.',
      description,
    }),

    ApiNotFoundResponse({
      description: 'Não foi possível encontrar o selo.',
    }),

    ApiOkResponse({
      schema: { example },
    }),
  );
}
