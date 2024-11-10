import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function DeleteWriterDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary:
        'Retorna uma mensagem de sucesso após deletar o escritor de acordo com o ID.',
      description:
        '## Obs: Um escritor não pode ser deletado se houver um ou mais livros vinculados a ele.',
    }),

    ApiNotFoundResponse({
      description: 'Não foi possível encontrar o escritor.',
    }),

    ApiOkResponse({
      description: 'Escritor removida com sucesso.',
    }),
  );
}
