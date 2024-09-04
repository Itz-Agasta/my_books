import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { ReadingInterface } from './interfaces/reading.interface';

@Controller('readings')
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}

  @Get()
  async findAll(): Promise<ReadingInterface[]> {
    return await this.readingsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReadingInterface> {
    return await this.readingsService.findOne(+id);
  }

  @Get('user/:userId')
  async findAllByUser(
    @Param('userId') userId: number,
  ): Promise<ReadingInterface[]> {
    return await this.readingsService.findAllByUser(userId);
  }

  @Post()
  async create(
    @Body() data: CreateReadingDto,
  ): Promise<{ reading: ReadingInterface; message: string }> {
    return await this.readingsService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateReadingDto,
  ): Promise<{ reading: ReadingInterface; message: string }> {
    return await this.readingsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.readingsService.remove(+id);
  }
}
