import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  apiOperationDescription as description,
  userMock,
} from './users-mocks.docs';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';

export function UpdateUsersDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso e o usuário atualizado.',
      description,
    }),

    ApiBody({ type: UpdateUserDto }),

    ApiCreatedResponse({
      status: 201,
      description: 'O usuário foi atualizado com sucesso.',
      schema: {
        example: userMock,
      },
    }),

    ApiBadRequestResponse({
      description: 'Não foi possível atualizar o usuário.',
    }),
  );
}
