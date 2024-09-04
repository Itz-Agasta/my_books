import { BookInterface } from "src/modules/books/interfaces/book.interface";

export interface WriterInterface {
  id: number;
  name: string;
  books?: BookInterface[]
}
