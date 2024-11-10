import { BookEntity } from "src/modules/books/entities/book.entity";
import { CollectionEntity } from "src/modules/collections/entities/collection.entity";
import { DrawerEntity } from "src/modules/drawer/entities/drawer.entity";
import { PublisherEntity } from "src/modules/publisher/entities/publisher.entity";
import { ReadingEntity } from "src/modules/readings/entities/reading.entity";
import { StampEntity } from "src/modules/stamp/entities/stamp.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { WriterEntity } from "src/modules/writer/entities/writer.entity";

export const entities = [
    PublisherEntity,
    WriterEntity,
    DrawerEntity,
    StampEntity,
    CollectionEntity,
    UserEntity,
    BookEntity,
    ReadingEntity
];