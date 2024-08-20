import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  stampMock,
  apiOperationDescription as description,
} from './stamp-mocks.docs';
import { CreateStampDto } from 'src/modules/stamp/dto/create-stamp.dto';

export function CreateStampDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso e o selo criado.',
      description,
    }),

    ApiBody({ type: CreateStampDto }),

    ApiCreatedResponse({
      status: 201,
      description: 'O selo foi criado com sucesso.',
      schema: {
        example: stampMock,
      },
    }),

    ApiBadRequestResponse({ description: 'Não foi possível criar o selo.' }),
  );
}
