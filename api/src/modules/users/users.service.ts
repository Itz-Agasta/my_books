import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInterface } from './interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import { UserWithPasswordsInterface } from './interfaces/user-with-password.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserInterface[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar os usuários.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<UserInterface> {
    try {
      return await this.usersRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o autor.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findUserByEmail(
    email: string,
    user: UserInterface,
  ): Promise<UserInterface> {
    try {
      const id = user.id || 0;
      return await this.usersRepository.findOne({
        where: {
          email,
          id: Not(id),
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar esse usuário.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findUserByEmailLogin(email: string): Promise<UserInterface> {
    try {
      return await this.usersRepository.findOne({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar esse usuário.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getMe(user: UserInterface): Promise<UserInterface> {
    try {
      return await this.findOne(user.id);
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar esse usuário.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async checkUserPassword(id: number, password: string): Promise<void> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { id },
        select: ['password', 'email', 'username'],
      });
      if (!user || !password || !(await user.checkPassword(password))) {
        throw new UnauthorizedException('Estas credenciais estão incorretas.');
      }
    } catch (error) {
      throw error;
    }
  }

  async create(
    data: CreateUserDto,
  ): Promise<{ user: UserInterface; message: string }> {
    try {
      const entity: UserEntity = Object.assign(new UserEntity(), data);
      const user: UserWithPasswordsInterface =
        await this.usersRepository.save(entity);
      this.removePasswords(user);
      return { user, message: 'O usuário foi criado com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível criar esse usuário.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    data: UpdateUserDto,
    currentUser: UserInterface,
  ): Promise<{ user: UserInterface; message: string }> {
    if (currentUser.id === id) {
      try {
        const entity: UserEntity = Object.assign(new UserEntity(), {
          ...data,
          id,
        });
        await this.usersRepository.save(entity);
        const user = await this.findOne(id);
        return { user, message: 'O usuário foi atualizado com sucesso.' };
      } catch (error) {
        throw new HttpException(
          { message: 'Não foi possível atualizar o usuário.' },
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException(
        { message: 'Você não tem permissão para atualizar este usuário' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(
    id: number,
    currentUser: UserInterface,
  ): Promise<{ message: string }> {
    if (currentUser.id === id) {
      try {
        await this.usersRepository.softDelete(id);
        return { message: 'Usuário excluído com sucesso!' };
      } catch (error) {
        throw new HttpException(
          { message: 'Não foi possível excluir o usuário' },
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException(
        { message: 'Você não tem permissão para excluir este usuário' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  removePasswords(user: UserWithPasswordsInterface): void {
    delete user.password;
    delete user.confirmPassword;
  }
}
