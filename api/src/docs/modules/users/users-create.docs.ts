import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  userMock,
  apiOperationDescription as description,
} from './users-mocks.docs';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export function CreateUsersDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso e o usuário criado.',
      description,
    }),

    ApiBody({ type: CreateUserDto }),

    ApiCreatedResponse({
      status: 201,
      description: 'O usuário foi criado com sucesso.',
      schema: {
        example: userMock,
      },
    }),

    ApiBadRequestResponse({ description: 'Não foi possível criar o usuário.' }),
  );
}
