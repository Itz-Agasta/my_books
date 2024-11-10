import { Module } from '@nestjs/common';
import { WriterService } from './writer.service';
import { WriterController } from './writer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WriterEntity } from './entities/writer.entity';
import { WriterNameAlreadyExists } from './validate/writer-name-already-exists.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([WriterEntity])],
  controllers: [WriterController],
  providers: [WriterService, WriterNameAlreadyExists],
})
export class WriterModule {}
