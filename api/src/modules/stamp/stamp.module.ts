import { Module } from '@nestjs/common';
import { StampService } from './stamp.service';
import { StampController } from './stamp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StampEntity } from './entities/stamp.entity';
import { StampNameAlreadyExists } from './validate/stamp-name-already-exists.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([StampEntity])],
  controllers: [StampController],
  providers: [StampService, StampNameAlreadyExists],
})
export class StampModule {}
