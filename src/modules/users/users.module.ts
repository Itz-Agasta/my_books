import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserEmailAlreadyExists } from './validate/user-email-already-exists.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, UserEntity, UserEmailAlreadyExists],
  exports: [UsersService],
})
export class UsersModule {}
