import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { CollectionsService } from '../collections.service';
import { CollectionInterface } from '../interfaces/collection.interface';

let service: CollectionsService;

@ValidatorConstraint({ name: 'CollectionNameAlreadyExists', async: true })
export class CollectionNameAlreadyExists
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(CollectionsService);
  }

  async validate(
    name: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const collection: CollectionInterface = Object.assign(
      validationArguments.object,
    );
    const entity = await service.findByName(name, collection);
    return !entity;
  }
}
