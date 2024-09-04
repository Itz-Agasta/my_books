import { BookEntity } from 'src/modules/books/entities/book.entity';
import { BookInterface } from 'src/modules/books/interfaces/book.interface';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UserInterface } from 'src/modules/users/interfaces/user.interface';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'readings' })
export class ReadingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  actually_page: number;

  @Column()
  expected_end_date: Date;

  @Column({ name: 'book_id' })
  bookId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => BookEntity)
  @JoinColumn({ name: 'book_id' })
  book: BookInterface;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserInterface;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
