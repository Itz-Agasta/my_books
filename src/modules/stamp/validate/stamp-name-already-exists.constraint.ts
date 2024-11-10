import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { StampService } from '../stamp.service';
import { StampInterface } from '../interfaces/stamp.interface';

let service: StampService;

@ValidatorConstraint({ name: 'StampNameAlreadyExists', async: true })
export class StampNameAlreadyExists
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(StampService);
  }

  async validate(
    name: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const stamp: StampInterface = Object.assign(validationArguments.object);
    const entity = await service.findByName(name, stamp);
    return !entity;
  }
}
