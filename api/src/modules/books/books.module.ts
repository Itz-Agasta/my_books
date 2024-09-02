import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { BookNameAlreadyExists } from './validate/book-name-already-exists.constraint';
import { BookTypeValidate } from './validate/book-type-validate.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  controllers: [BooksController],
  providers: [BooksService, BookNameAlreadyExists, BookTypeValidate],
})
export class BooksModule {}
