import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { PublisherInterface } from './interfaces/publisher.interface';

//Docs
import { ApiTags } from '@nestjs/swagger';
import { FindAllPublisherDocs } from 'src/docs/modules/publisher/publisher-find-all.docs';
import { FindOnePublisherDocs } from 'src/docs/modules/publisher/publisher-find-one.docs';
import { CreatePublisherDocs } from 'src/docs/modules/publisher/publisher-create.docs';
import { UpdatePublisherDocs } from 'src/docs/modules/publisher/publisher-update.docs';
import { DeletePublisherDocs } from 'src/docs/modules/publisher/publisher-delete.docs';

@ApiTags('Publisher')
@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @FindAllPublisherDocs()
  @Get()
  async findAll(): Promise<PublisherInterface[]> {
    return await this.publisherService.findAll();
  }

  @FindOnePublisherDocs()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PublisherInterface> {
    return await this.publisherService.findOne(+id);
  }

  @CreatePublisherDocs()
  @Post()
  async create(
    @Body() data: CreatePublisherDto,
  ): Promise<{ publisher: PublisherInterface; message: string }> {
    return await this.publisherService.create(data);
  }

  @UpdatePublisherDocs()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdatePublisherDto,
  ): Promise<{ publisher: PublisherInterface; message: string }> {
    return await this.publisherService.update(+id, data);
  }

  @DeletePublisherDocs()
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.publisherService.remove(+id);
  }
}
