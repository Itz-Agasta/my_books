import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function DeleteDrawerDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary:
        'Retorna uma mensagem de sucesso após deletar o ilustrador de acordo com o ID.',
      description:
        '## Obs: Um ilustrador não pode ser deletado se houver um ou mais livros vinculados a ele.',
    }),

    ApiNotFoundResponse({
      description: 'Não foi possível encontrar o ilustrador.',
    }),

    ApiOkResponse({
      description: 'Ilustrador removida com sucesso.',
    }),
  );
}
