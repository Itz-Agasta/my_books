import { CollectionEntity } from 'src/modules/collections/entities/collection.entity';
import { DrawerEntity } from 'src/modules/drawer/entities/drawer.entity';
import { PublisherEntity } from 'src/modules/publisher/entities/publisher.entity';
import { StampEntity } from 'src/modules/stamp/entities/stamp.entity';
import { WriterEntity } from 'src/modules/writer/entities/writer.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'books' })
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sinopse: string;

  @Column({ default: 'book' })
  type: string;

  @Column()
  pages: number;

  @Column({ default: false })
  read: boolean;

  @Column({ name: 'writer_id' })
  writerId: number;

  @Column({ name: 'publisher_id' })
  publisherId: number;

  @Column({ name: 'drawer_id' })
  drawerId?: number;

  @Column({ name: 'stamp_id' })
  stampId?: number;

  @Column({ name: 'collection_id' })
  collectionId?: number;

  @ManyToOne(() => WriterEntity)
  @JoinColumn({ name: 'writer_id' })
  writer: WriterEntity;

  @ManyToOne(() => PublisherEntity)
  @JoinColumn({ name: 'publisher_id' })
  publisher: PublisherEntity;

  @ManyToOne(() => DrawerEntity)
  @JoinColumn({ name: 'drawer_id' })
  drawer?: DrawerEntity;

  @ManyToOne(() => StampEntity)
  @JoinColumn({ name: 'stamp_id' })
  stamp?: StampEntity;

  @ManyToOne(() => CollectionEntity)
  @JoinColumn({ name: 'collection_id' })
  collection?: CollectionEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
