import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function DeleteUsersDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary:
        'Retorna uma mensagem de sucesso após deletar o usuário de acordo com o ID.',
      description: '## Obs:  O usuário só pode ser deletado pelo próprio.',
    }),

    ApiNotFoundResponse({
      description: 'Não foi possível encontrar o usuário.',
    }),

    ApiOkResponse({
      description: 'Usuário removido com sucesso.',
    }),
  );
}
