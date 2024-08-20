import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function DeletePublisherDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary:
        'Retorna uma mensagem de sucesso após deletar a editora de acordo com o ID.',
      description:
        '## Obs: Uma editora não pode ser deletado se houver um ou mais alunos matriculados nele.',
    }),

    ApiNotFoundResponse({
      description: 'Não foi possível encontrar a editora.',
    }),

    ApiOkResponse({
      description: 'Editora removida com sucesso.',
    }),
  );
}
