import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WriterService } from './writer.service';
import { WriterInterface } from './interfaces/writer.interface';
import { CreateWriterDto } from './dto/create-writer.dto';
import { UpdateWriterDto } from './dto/update-writer.dto';

//Docs
import { ApiTags } from '@nestjs/swagger';
import { FindOneWriterDocs } from 'src/docs/modules/writer/writer-find-one.docs';
import { FindAllWriterDocs } from 'src/docs/modules/writer/writer-find-all.docs';
import { CreateWriterDocs } from 'src/docs/modules/writer/writer-create.docs';
import { UpdateWriterDocs } from 'src/docs/modules/writer/writer-update.docs';
import { DeleteWriterDocs } from 'src/docs/modules/writer/writer-delete.docs';

@ApiTags('Writer')
@Controller('writer')
export class WriterController {
  constructor(private readonly writerService: WriterService) {}

  @FindOneWriterDocs()
  @Get()
  async findAll(): Promise<WriterInterface[]> {
    return await this.writerService.findAll();
  }

  @FindAllWriterDocs()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<WriterInterface> {
    return await this.writerService.findOne(+id);
  }

  @CreateWriterDocs()
  @Post()
  async create(
    @Body() data: CreateWriterDto,
  ): Promise<{ writer: WriterInterface; message: string }> {
    return await this.writerService.create(data);
  }

  @UpdateWriterDocs()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateWriterDto,
  ): Promise<{ writer: WriterInterface; message: string }> {
    return await this.writerService.update(+id, data);
  }

  @DeleteWriterDocs()
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.writerService.remove(+id);
  }
}
