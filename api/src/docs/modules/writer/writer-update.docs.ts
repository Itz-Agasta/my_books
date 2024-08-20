import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  apiOperationDescription as description,
  writerMock,
} from './writer-mocks.docs';
import { UpdateWriterDto } from 'src/modules/writer/dto/update-writer.dto';

export function UpdateWriterDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso e o escritor criado.',
      description,
    }),

    ApiBody({ type: UpdateWriterDto }),

    ApiCreatedResponse({
      status: 201,
      description: 'O escritor foi atualizado com sucesso.',
      schema: {
        example: writerMock,
      },
    }),

    ApiBadRequestResponse({
      description: 'Não foi possível atualizar o escritor.',
    }),
  );
}
