import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { WriterService } from '../writer.service';
import { WriterInterface } from '../interfaces/writer.interface';

let service: WriterService;

@ValidatorConstraint({ name: 'WriterNameAlreadyExists', async: true })
export class WriterNameAlreadyExists
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(WriterService);
  }

  async validate(
    name: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const writer: WriterInterface = Object.assign(validationArguments.object);
    const entity = await service.findByName(name, writer);
    return !entity;
  }
}
