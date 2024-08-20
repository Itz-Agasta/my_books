import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublisherEntity } from './entities/publisher.entity';
import { PublisherNameAlreadyExists } from './validate/publisher-name-already-exists.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([PublisherEntity])],
  controllers: [PublisherController],
  providers: [PublisherService, PublisherNameAlreadyExists],
})
export class PublisherModule {}
