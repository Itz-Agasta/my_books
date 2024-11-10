import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function DeleteStampDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary:
        'Retorna uma mensagem de sucesso após deletar o selo de acordo com o ID.',
      description:
        '## Obs: Um selo não pode ser deletado se houver um ou mais livros vinculados a ele.',
    }),

    ApiNotFoundResponse({
      description: 'Não foi possível encontrar o selo.',
    }),

    ApiOkResponse({
      description: 'Selo removido com sucesso.',
    }),
  );
}
