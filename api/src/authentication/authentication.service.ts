import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { UserInterface } from 'src/modules/users/interfaces/user.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    try {
      const user: UserInterface =
        await this.usersService.findUserByEmailLogin(email);

      if (!user) {
        throw new HttpException(
          { message: 'Usuário não encontrado' },
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.usersService.checkUserPassword(user.id, password);
      return this.makeToken(user);
    } catch (error) {
      if (!!error.message) {
        throw new HttpException(
          {
            message: error.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        {
          message:
            'Não foi possível realizar o login, tente novamente mais tarde.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  makeToken(data: UserInterface): { access_token: string } {
    const payload = { id: data.id, username: data.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
