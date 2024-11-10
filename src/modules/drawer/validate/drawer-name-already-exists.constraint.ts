import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { DrawerService } from '../drawer.service';
import { DrawerInterface } from '../interfaces/drawer.interface';

let service: DrawerService;

@ValidatorConstraint({ name: 'DrawerNameAlreadyExists', async: true })
export class DrawerNameAlreadyExists
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(DrawerService);
  }

  async validate(
    name: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const drawer: DrawerInterface = Object.assign(
      validationArguments.object,
    );
    const entity = await service.findByName(name, drawer);
    return !entity;
  }
}
