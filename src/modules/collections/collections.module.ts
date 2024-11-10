import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionEntity } from './entities/collection.entity';
import { CollectionNameAlreadyExists } from './validate/collection-name-already-exists.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionEntity])],
  controllers: [CollectionsController],
  providers: [CollectionsService, CollectionNameAlreadyExists],
})
export class CollectionsModule {}
