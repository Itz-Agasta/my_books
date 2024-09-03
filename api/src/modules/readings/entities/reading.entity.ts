import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

//   @OneToMany(() => BookEntity, (book) => book.writer, {
//     cascade: true,
//   })
//   book?: BookEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
