import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStampDto } from './dto/create-stamp.dto';
import { UpdateStampDto } from './dto/update-stamp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StampEntity } from './entities/stamp.entity';
import { Not, Repository } from 'typeorm';
import { StampInterface } from './interfaces/stamp.interface';

@Injectable()
export class StampService {
  constructor(
    @InjectRepository(StampEntity)
    private stampRepository: Repository<StampEntity>,
  ) {}

  async findAll(): Promise<StampInterface[]> {
    try {
      return await this.stampRepository.find();
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar os selos.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<StampInterface> {
    try {
      return await this.stampRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o selo.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findByName(
    name: string,
    stamp: StampInterface,
  ): Promise<StampInterface> {
    try {
      const id = stamp.id || 0;
      return await this.stampRepository.findOne({
        where: {
          name,
          id: Not(id),
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o selo.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(
    data: CreateStampDto,
  ): Promise<{ stamp: StampInterface; message: string }> {
    try {
      const entity = Object.assign(new StampEntity(), data);
      const stamp = await this.stampRepository.save(entity);

      return { stamp, message: 'O selo foi criada com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível criar o selo.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    data: UpdateStampDto,
  ): Promise<{ stamp: StampInterface; message: string }> {
    try {
      const entity: StampEntity = Object.assign(new StampEntity(), {
        ...data,
        id,
      });
      await this.stampRepository.save(entity);

      const stamp = await this.findOne(id);
      return { stamp, message: 'O selo foi atualizado com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível atualizar o selo.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.stampRepository.softDelete(id);
      return { message: 'Selo removido com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível excluir o selo' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
