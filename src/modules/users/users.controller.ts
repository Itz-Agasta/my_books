import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInterface } from './interfaces/user.interface';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Public } from 'src/decorators/public.decorator';

//Docs
import { ApiTags } from '@nestjs/swagger';
import { FindAllUsersDocs } from 'src/docs/modules/users/users-find-all.docs';
import { GetMeUserDocs } from 'src/docs/modules/users/users-get-me.docs';
import { FindOneUsersDocs } from 'src/docs/modules/users/users-find-one.docs';
import { CreateUsersDocs } from 'src/docs/modules/users/users-create.docs';
import { UpdateUsersDocs } from 'src/docs/modules/users/users-update.docs';
import { DeleteUsersDocs } from 'src/docs/modules/users/users-delete.docs';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @FindAllUsersDocs()
  @Get()
  async findAll(): Promise<UserInterface[]> {
    return await this.usersService.findAll();
  }

  @GetMeUserDocs()
  @Get('me')
  async getMe(@CurrentUser() user: UserInterface): Promise<UserInterface> {
    return await this.usersService.getMe(user);
  }

  @FindOneUsersDocs()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserInterface> {
    return await this.usersService.findOne(+id);
  }

  @CreateUsersDocs()
  @Post()
  @Public()
  async create(
    @Body() data: CreateUserDto,
  ): Promise<{ user: UserInterface; message: string }> {
    return await this.usersService.create(data);
  }

  @UpdateUsersDocs()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
    @CurrentUser() currentUser: UserInterface,
  ): Promise<{ user: UserInterface; message: string }> {
    return await this.usersService.update(+id, data, currentUser);
  }

  @DeleteUsersDocs()
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @CurrentUser() currentUser: UserInterface,
  ) {
    return await this.usersService.remove(+id, currentUser);
  }
}
