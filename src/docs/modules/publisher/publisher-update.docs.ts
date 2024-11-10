import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  apiOperationDescription as description,
  publisherMock,
} from './publisher-mocks.docs';
import { UpdatePublisherDto } from 'src/modules/publisher/dto/update-publisher.dto';

export function UpdatePublisherDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso e a editora editada.',
      description,
    }),

    ApiBody({ type: UpdatePublisherDto }),

    ApiCreatedResponse({
      status: 201,
      description: 'A editora foi atualizada com sucesso.',
      schema: {
        example: publisherMock,
      },
    }),

    ApiBadRequestResponse({
      description: 'Não foi possível atualizar a editora.',
    }),
  );
}
