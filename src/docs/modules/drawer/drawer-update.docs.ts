import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  apiOperationDescription as description,
  drawerMock,
} from './drawer-mocks.docs';
import { UpdateDrawerDto } from 'src/modules/drawer/dto/update-drawer.dto';

export function UpdateDrawerDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso e o ilustrador criado.',
      description,
    }),

    ApiBody({ type: UpdateDrawerDto }),

    ApiCreatedResponse({
      status: 201,
      description: 'O ilustrador foi atualizado com sucesso.',
      schema: {
        example: drawerMock,
      },
    }),

    ApiBadRequestResponse({
      description: 'Não foi possível atualizar o ilustrador.',
    }),
  );
}
