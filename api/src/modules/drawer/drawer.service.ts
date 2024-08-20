import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { DrawerEntity } from './entities/drawer.entity';
import { DrawerInterface } from './interfaces/drawer.interface';
import { CreateDrawerDto } from './dto/create-drawer.dto';
import { UpdateDrawerDto } from './dto/update-drawer.dto';

@Injectable()
export class DrawerService {
  constructor(
    @InjectRepository(DrawerEntity)
    private drawerRepository: Repository<DrawerEntity>,
  ) {}

  async findAll(): Promise<DrawerInterface[]> {
    try {
      return await this.drawerRepository.find();
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar os ilustradores.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<DrawerInterface> {
    try {
      return await this.drawerRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o ilustrador.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findByName(
    name: string,
    drawer: DrawerInterface,
  ): Promise<DrawerInterface> {
    try {
      const id = drawer.id || 0;
      return await this.drawerRepository.findOne({
        where: {
          name,
          id: Not(id),
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o ilustrador.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(
    data: CreateDrawerDto,
  ): Promise<{ drawer: DrawerInterface; message: string }> {
    try {
      const entity = Object.assign(new DrawerEntity(), data);
      const drawer = await this.drawerRepository.save(entity);

      return { drawer, message: 'O ilustrador foi criado com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível criar o ilustrador.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    data: UpdateDrawerDto,
  ): Promise<{ drawer: DrawerInterface; message: string }> {
    try {
      const entity: DrawerEntity = Object.assign(new DrawerEntity(), {
        ...data,
        id,
      });
      await this.drawerRepository.save(entity);

      const drawer = await this.findOne(id);
      return { drawer, message: 'O ilustrador foi atualizado com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível atualizar o ilustrador.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.drawerRepository.softDelete(id);
      return { message: 'Ilustrador removido com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível excluir o ilustrador' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
