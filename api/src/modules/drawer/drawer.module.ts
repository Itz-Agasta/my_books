import { Module } from '@nestjs/common';
import { DrawerService } from './drawer.service';
import { DrawerController } from './drawer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrawerEntity } from './entities/drawer.entity';
import { DrawerNameAlreadyExists } from './validate/drawer-name-already-exists.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([DrawerEntity])],
  controllers: [DrawerController],
  providers: [DrawerService, DrawerNameAlreadyExists],
})
export class DrawerModule {}
