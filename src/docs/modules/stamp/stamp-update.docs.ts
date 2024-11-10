import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  apiOperationDescription as description,
  stampMock,
} from './stamp-mocks.docs';
import { UpdateStampDto } from 'src/modules/stamp/dto/update-stamp.dto';

export function UpdateStampDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso e o selo criado.',
      description,
    }),

    ApiBody({ type: UpdateStampDto }),

    ApiCreatedResponse({
      status: 201,
      description: 'O selo foi atualizado com sucesso.',
      schema: {
        example: stampMock,
      },
    }),

    ApiBadRequestResponse({
      description: 'Não foi possível atualizar o selo.',
    }),
  );
}
