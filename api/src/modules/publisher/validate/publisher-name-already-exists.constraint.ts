import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { PublisherService } from '../publisher.service';
import { PublisherInterface } from '../interfaces/publisher.interface';

let service: PublisherService;

@ValidatorConstraint({ name: 'PublisherNameAlreadyExists', async: true })
export class PublisherNameAlreadyExists
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(PublisherService);
  }

  async validate(
    name: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const publisher: PublisherInterface = Object.assign(
      validationArguments.object,
    );
    const entity = await service.findByName(name, publisher);
    return !entity;
  }
}
