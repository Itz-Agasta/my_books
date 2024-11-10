import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadingEntity } from './entities/reading.entity';
import { ReadingInterface } from './interfaces/reading.interface';
import { BooksService } from '../books/books.service';
import { UpdateBookDto } from '../books/dto/update-book.dto';

@Injectable()
export class ReadingsService {
  constructor(
    @InjectRepository(ReadingEntity)
    private readingRepository: Repository<ReadingEntity>,

    private readonly bookService: BooksService,
  ) {}

  async findAll(): Promise<ReadingInterface[]> {
    try {
      return await this.readingRepository.find();
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar as leituras.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllByUser(userId: number): Promise<ReadingInterface[]> {
    try {
      return await this.readingRepository.find({
        where: { userId },
        relations: ['book'],
        order: { createdAt: 'ASC' },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar as leituras.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<ReadingInterface> {
    try {
      return await this.readingRepository.findOneOrFail({
        where: { id },
        relations: ['book'],
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o autor.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(
    data: CreateReadingDto,
  ): Promise<{ reading: ReadingInterface; message: string }> {
    try {
      const entity = Object.assign(new ReadingEntity(), data);
      const reading = await this.readingRepository.save(entity);

      return { reading, message: 'A leitura foi criada com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível criar a leitura.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    data: UpdateReadingDto,
  ): Promise<{ reading: ReadingInterface; message: string }> {
    try {
      const entity: ReadingEntity = Object.assign(new ReadingEntity(), {
        ...data,
        id,
      });
      await this.readingRepository.save(entity);

      const reading = await this.findOne(id);

      if (reading.actually_page === reading.book.pages) {
        const book: UpdateBookDto = reading.book;
        book.read = true;
        this.bookService.update(book.id, book);
      }

      return { reading, message: 'A leitura foi atualizada com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível atualizar a leitura.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.readingRepository.softDelete(id);
      return { message: 'Leitura removida com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível excluir o leitura' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
