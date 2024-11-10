import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  apiOperationDescription as description,
  drawerMock,
  drawerMock2,
} from './drawer-mocks.docs';

export function FindAllDrawerDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna um array contendo todos os ilustradores.',
      description,
    }),

    ApiNotFoundResponse({
      description: 'Não foi possível encontrar os ilustradores.',
    }),

    ApiOkResponse({
      schema: {
        example: [drawerMock, drawerMock2],
      },
    }),
  );
}
