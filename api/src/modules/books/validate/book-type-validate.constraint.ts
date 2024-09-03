import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { BookInterface } from '../interfaces/book.interface';

@ValidatorConstraint({ name: 'BookTypeValidate', async: true })
export class BookTypeValidate implements ValidatorConstraintInterface {
  validate(
    type: string,
    validationArguments: ValidationArguments,
  ): boolean {
    const book: BookInterface = Object.assign(validationArguments.object);
    if (book.type === 'book' || book.type === 'HQ') return !!book;
    return !book;
  }
}
