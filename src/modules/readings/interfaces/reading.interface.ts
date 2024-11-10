import { BookInterface } from "src/modules/books/interfaces/book.interface";
import { UserInterface } from "src/modules/users/interfaces/user.interface";

export interface ReadingInterface {
  id: number;
  actually_page: number;
  expected_end_date: Date;
  bookId: number;
  userId: number;
  book: BookInterface;
  user: UserInterface;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}