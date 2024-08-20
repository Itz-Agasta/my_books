import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  drawerMock,
  apiOperationDescription as description,
} from './drawer-mocks.docs';
import { CreateDrawerDto } from 'src/modules/drawer/dto/create-drawer.dto';

export function CreateDrawerDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso e o ilustrador criado.',
      description,
    }),

    ApiBody({ type: CreateDrawerDto }),

    ApiCreatedResponse({
      status: 201,
      description: 'O ilustrador foi criado com sucesso.',
      schema: {
        example: drawerMock,
      },
    }),

    ApiBadRequestResponse({ description: 'Não foi possível criar o ilustrador.' }),
  );
}
