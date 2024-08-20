import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  apiOperationDescription as description,
  userMock,
  userMock2,
} from './users-mocks.docs';

export function FindAllUsersDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna um array contendo todas os usuários.',
      description,
    }),

    ApiNotFoundResponse({
      description: 'Não foi possível encontrar os usuários.',
    }),

    ApiOkResponse({
      schema: {
        example: [userMock, userMock2],
      },
    }),
  );
}
