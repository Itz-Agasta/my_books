import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreatePublisherDto } from 'src/modules/publisher/dto/create-publisher.dto';
import {
  publisherMock,
  apiOperationDescription as description,
} from './publisher-mocks.docs';

export function CreatePublisherDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso e a editora criada.',
      description,
    }),

    ApiBody({ type: CreatePublisherDto }),

    ApiCreatedResponse({
      status: 201,
      description: 'A editora foi criado com sucesso.',
      schema: {
        example: publisherMock,
      },
    }),

    ApiBadRequestResponse({ description: 'Não foi possível criar a editora.' }),
  );
}
