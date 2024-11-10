import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StampService } from './stamp.service';
import { CreateStampDto } from './dto/create-stamp.dto';
import { UpdateStampDto } from './dto/update-stamp.dto';
import { StampInterface } from './interfaces/stamp.interface';

//Docs
import { ApiTags } from '@nestjs/swagger';
import { FindAllStampDocs } from 'src/docs/modules/stamp/stamp-find-all.docs';
import { FindOneStampDocs } from 'src/docs/modules/stamp/stamp-find-one.docs';
import { CreateStampDocs } from 'src/docs/modules/stamp/stamp-create.docs';
import { UpdateStampDocs } from 'src/docs/modules/stamp/stamp-update.docs';
import { DeleteStampDocs } from 'src/docs/modules/stamp/stamp-delete.docs';

@ApiTags('Stamp')
@Controller('stamp')
export class StampController {
  constructor(private readonly stampService: StampService) {}

  @FindAllStampDocs()
  @Get()
  async findAll(): Promise<StampInterface[]> {
    return await this.stampService.findAll();
  }

  @FindOneStampDocs()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StampInterface> {
    return await this.stampService.findOne(+id);
  }

  @CreateStampDocs()
  @Post()
  async create(
    @Body() data: CreateStampDto,
  ): Promise<{ stamp: StampInterface; message: string }> {
    return await this.stampService.create(data);
  }

  @UpdateStampDocs()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateStampDto,
  ): Promise<{ stamp: StampInterface; message: string }> {
    return await this.stampService.update(+id, data);
  }

  @DeleteStampDocs()
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.stampService.remove(+id);
  }
}
