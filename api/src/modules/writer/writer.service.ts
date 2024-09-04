import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { WriterEntity } from './entities/writer.entity';
import { WriterInterface } from './interfaces/writer.interface';
import { CreateWriterDto } from './dto/create-writer.dto';
import { UpdateWriterDto } from './dto/update-writer.dto';

@Injectable()
export class WriterService {
  constructor(
    @InjectRepository(WriterEntity)
    private writerRepository: Repository<WriterEntity>,
  ) {}

  async findAll(): Promise<WriterInterface[]> {
    try {
      return await this.writerRepository.find();
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar os autores.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<WriterInterface> {
    try {
      return await this.writerRepository.findOneOrFail({ 
        where: { id }, 
        relations: ['books']
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o autor.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findByName(
    name: string,
    writer: WriterInterface,
  ): Promise<WriterInterface> {
    try {
      const id = writer.id || 0;
      return await this.writerRepository.findOne({
        where: {
          name,
          id: Not(id),
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o autor.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(
    data: CreateWriterDto,
  ): Promise<{ writer: WriterInterface; message: string }> {
    try {
      const entity = Object.assign(new WriterEntity(), data);
      const writer = await this.writerRepository.save(entity);

      return { writer, message: 'o autor foi criado com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível criar o autor.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    data: UpdateWriterDto,
  ): Promise<{ writer: WriterInterface; message: string }> {
    try {
      const entity: WriterEntity = Object.assign(new WriterEntity(), {
        ...data,
        id,
      });
      await this.writerRepository.save(entity);

      const writer = await this.findOne(id);

      return { writer, message: 'o autor foi atualizado com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível atualizar o autor.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.writerRepository.softDelete(id);
      return { message: 'Autor removido com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível excluir o autor' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
