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

export function GetMeUserDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna o usuário atual.',
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
