import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  apiOperationDescription as description,
  drawerMock as example,
} from './drawer-mocks.docs';

export function FindOneDrawerDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna um ilustrador de acordo com o id passado.',
      description,
    }),

    ApiNotFoundResponse({
      description: 'Não foi possível encontrar o ilustrador.',
    }),

    ApiOkResponse({
      schema: { example },
    }),
  );
}
