import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  apiOperationDescription as description,
  userMock as example,
} from './users-mocks.docs';

export function FindOneUsersDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna um usuário de acordo com o id passado.',
      description,
    }),

    ApiNotFoundResponse({
      description: 'Não foi possível encontrar o usuário.',
    }),

    ApiOkResponse({
      schema: { example },
    }),
  );
}
