/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { BooksService } from '../books.service';
import { BookInterface } from '../interfaces/book.interface';
let service: BooksService;

@ValidatorConstraint({ name: 'BookNameAlreadyExists', async: true })
export class BookNameAlreadyExists
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(BooksService);
  }

  async validate(
    name: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const book: BookInterface = Object.assign(validationArguments.object);
    const entity = await service.findByName(name, book);
    return !entity;
  }
}
