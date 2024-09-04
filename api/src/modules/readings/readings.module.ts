import { Module } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { ReadingsController } from './readings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadingEntity } from './entities/reading.entity';
import { BooksService } from '../books/books.service';
import { BookEntity } from '../books/entities/book.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ReadingEntity, BookEntity])],
  controllers: [ReadingsController],
  providers: [ReadingsService, BooksService],
})
export class ReadingsModule {}
