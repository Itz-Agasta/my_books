import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DrawerService } from './drawer.service';
import { CreateDrawerDto } from './dto/create-drawer.dto';
import { UpdateDrawerDto } from './dto/update-drawer.dto';
import { DrawerInterface } from './interfaces/drawer.interface';

//Docs
import { ApiTags } from '@nestjs/swagger';
import { FindAllDrawerDocs } from 'src/docs/modules/drawer/drawer-find-all.docs';
import { FindOneDrawerDocs } from 'src/docs/modules/drawer/drawer-find-one.docs';
import { CreateDrawerDocs } from 'src/docs/modules/drawer/drawer-create.docs';
import { UpdateDrawerDocs } from 'src/docs/modules/drawer/drawer-update.docs';
import { DeleteDrawerDocs } from 'src/docs/modules/drawer/drawer-delete.docs';

@ApiTags('Drawer')
@Controller('drawer')
export class DrawerController {
  constructor(private readonly drawerService: DrawerService) {}

  @FindAllDrawerDocs()
  @Get()
  async findAll(): Promise<DrawerInterface[]> {
    return await this.drawerService.findAll();
  }

  @FindOneDrawerDocs()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DrawerInterface> {
    return await this.drawerService.findOne(+id);
  }

  @CreateDrawerDocs()
  @Post()
  async create(
    @Body() data: CreateDrawerDto,
  ): Promise<{ drawer: DrawerInterface; message: string }> {
    return await this.drawerService.create(data);
  }

  @UpdateDrawerDocs()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateDrawerDto,
  ): Promise<{ drawer: DrawerInterface; message: string }> {
    return await this.drawerService.update(+id, data);
  }

  @DeleteDrawerDocs()
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.drawerService.remove(+id);
  }
}
