import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { PublisherInterface } from './interfaces/publisher.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { PublisherEntity } from './entities/publisher.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(PublisherEntity)
    private publishRepository: Repository<PublisherEntity>,
  ) {}

  async findAll(): Promise<PublisherInterface[]> {
    try {
      return await this.publishRepository.find();
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar as editoras.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<PublisherInterface> {
    try {
      return await this.publishRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar a editora.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findByName(
    name: string,
    publisher: PublisherInterface,
  ): Promise<PublisherInterface> {
    try {
      const id = publisher.id || 0;
      return await this.publishRepository.findOne({
        where: {
          name,
          id: Not(id),
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar a editora.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(
    data: CreatePublisherDto,
  ): Promise<{ publisher: PublisherInterface; message: string }> {
    try {
      const entity = Object.assign(new PublisherEntity(), data);
      const publisher = await this.publishRepository.save(entity);

      return { publisher, message: 'A editora foi criada com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível criar a editora.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    data: UpdatePublisherDto,
  ): Promise<{ publisher: PublisherInterface; message: string }> {
    try {
      const entity: PublisherEntity = Object.assign(new PublisherEntity(), {
        ...data,
        id,
      });
      await this.publishRepository.save(entity);

      const publisher = await this.findOne(id);
      return { publisher, message: 'A editora foi atualizado com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível atualizar a editora.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.publishRepository.softDelete(id);
      return { message: 'Editora removida com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível excluir a editora' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
