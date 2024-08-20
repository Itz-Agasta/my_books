import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CollectionInterface } from './interfaces/collection.interface';

//Docs
import { ApiTags } from '@nestjs/swagger';
import { FindAllCollectionDocs } from 'src/docs/modules/collections/collections-find-all.docs';
import { FindOneCollectionDocs } from 'src/docs/modules/collections/collections-find-one.docs';
import { CreateCollectionDocs } from 'src/docs/modules/collections/collections-create.docs';
import { UpdateCollectionDocs } from 'src/docs/modules/collections/collections-update.docs';
import { DeleteCollectionsDocs } from 'src/docs/modules/collections/collections-delete.docs';

@ApiTags('Collections')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @FindAllCollectionDocs()
  @Get()
  async findAll(): Promise<CollectionInterface[]> {
    return await this.collectionsService.findAll();
  }

  @FindOneCollectionDocs()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CollectionInterface> {
    return await this.collectionsService.findOne(+id);
  }

  @CreateCollectionDocs()
  @Post()
  async create(
    @Body() data: CreateCollectionDto,
  ): Promise<{ collection: CollectionInterface; message: string }> {
    return await this.collectionsService.create(data);
  }

  @UpdateCollectionDocs()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCollectionDto,
  ): Promise<{ collection: CollectionInterface; message: string }> {
    return await this.collectionsService.update(+id, data);
  }

  @DeleteCollectionsDocs()
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.collectionsService.remove(+id);
  }
}
