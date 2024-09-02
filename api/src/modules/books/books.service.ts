import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Not, Repository } from 'typeorm';
import { BookInterface } from './interfaces/book.interface';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async findAll(): Promise<BookInterface[]> {
    try {
      return await this.bookRepository.find();
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar os livros.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<BookInterface> {
    try {
      return await this.bookRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o livro.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findByName(name: string, book: BookInterface): Promise<BookInterface> {
    try {
      const id = book.id || 0;
      return await this.bookRepository.findOne({
        where: {
          name,
          id: Not(id),
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o livro.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(
    data: CreateBookDto,
  ): Promise<{ book: BookInterface; message: string }> {
    try {
      const entity = Object.assign(new BookEntity(), data);
      const book = await this.bookRepository.save(entity);

      return { book, message: 'O livro foi criado com sucesso.' };
    } catch (error) {
      console.log(error)
      throw new HttpException(
        { message: 'Não foi possível criar o livro.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    data: UpdateBookDto,
  ): Promise<{ book: BookInterface; message: string }> {
    try {
      const entity: BookEntity = Object.assign(new BookEntity(), {
        ...data,
        id,
      });
      await this.bookRepository.save(entity);

      const book = await this.findOne(id);
      return { book, message: 'O livro foi atualizado com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível atualizar o livro.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.bookRepository.softDelete(id);
      return { message: 'Livro removido com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível excluir o livro' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
