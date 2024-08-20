import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CollectionEntity } from './entities/collection.entity';
import { CollectionInterface } from './interfaces/collection.interface';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { UserInterface } from '../users/interfaces/user.interface';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(CollectionEntity)
    private collectionRepository: Repository<CollectionEntity>,
  ) {}

  async findAll(): Promise<CollectionInterface[]> {
    try {
      return await this.collectionRepository.find();
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar as coleções.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<CollectionInterface> {
    try {
      return await this.collectionRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar a coleção.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findByName(
    name: string,
    collection: CollectionInterface,
  ): Promise<CollectionInterface> {
    try {
      const id = collection.id || 0;
      return await this.collectionRepository.findOne({
        where: {
          name,
          id: Not(id),
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar a coleção.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(
    data: CreateCollectionDto,
  ): Promise<{ collection: CollectionInterface; message: string }> {
    try {
      const entity = Object.assign(new CollectionEntity(), data);
      const collection = await this.collectionRepository.save(entity);

      return { collection, message: 'A coleção foi criada com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível criar a coleção.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    data: UpdateCollectionDto,
  ): Promise<{ collection: CollectionInterface; message: string }> {
    try {
      const entity: CollectionEntity = Object.assign(new CollectionEntity(), {
        ...data,
        id,
      });
      await this.collectionRepository.save(entity);

      const collection = await this.findOne(id);
      return { collection, message: 'A coleção foi atualizado com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível atualizar a coleção.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(
    id: number,
  ): Promise<{ message: string }> {
    try {
      await this.collectionRepository.softDelete(id);
      return { message: 'Coleção removida com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível excluir a coleção' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
