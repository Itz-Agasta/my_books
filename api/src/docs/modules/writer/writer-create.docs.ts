import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  writerMock,
  apiOperationDescription as description,
} from './writer-mocks.docs';
import { CreateWriterDto } from 'src/modules/writer/dto/create-writer.dto';

export function CreateWriterDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso e o escritor criado.',
      description,
    }),

    ApiBody({ type: CreateWriterDto }),

    ApiCreatedResponse({
      status: 201,
      description: 'O escritor foi criado com sucesso.',
      schema: {
        example: writerMock,
      },
    }),

    ApiBadRequestResponse({ description: 'Não foi possível criar o escritor.' }),
  );
}
