import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { SignInDto } from 'src/authentication/dtos/sign-in.dto';

export function SingInDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna o token de autenticação.',
    }),

    ApiBody({ type: SignInDto }),

    ApiCreatedResponse({
      status: 201,
      schema: {
        example: 'token: Token bolado',
      },
    }),

    ApiBadRequestResponse({
      description:
        'Não foi possível realizar o login, tente novamente mais tarde.',
    }),
  );
}
