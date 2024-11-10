import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function DeleteCollectionsDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary:
        'Retorna uma mensagem de sucesso após deletar a coleção de acordo com o ID.',
      description:
        '## Obs: Uma coleção não pode ser deletada se houver um ou mais livros vinculados a ele.',
    }),

    ApiNotFoundResponse({
      description: 'Não foi possível encontrar a coleção.',
    }),

    ApiOkResponse({
      description: 'Coleção removida com sucesso.',
    }),
  );
}
