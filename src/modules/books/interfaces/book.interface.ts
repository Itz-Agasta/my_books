import { CollectionInterface } from 'src/modules/collections/interfaces/collection.interface';
import { DrawerInterface } from 'src/modules/drawer/interfaces/drawer.interface';
import { PublisherInterface } from 'src/modules/publisher/interfaces/publisher.interface';
import { StampInterface } from 'src/modules/stamp/interfaces/stamp.interface';
import { WriterInterface } from 'src/modules/writer/interfaces/writer.interface';

export interface BookInterface {
  id: number;
  name: string;
  sinopse: string;
  type: string;
  pages: number;
  read: boolean;
  writerId: number;
  publisherId: number;
  drawerId?: number;
  stampId?: number;
  collectionId?: number;
  writer: WriterInterface;
  publisher: PublisherInterface;
  drawer?: DrawerInterface;
  stamp?: StampInterface;
  collection?: CollectionInterface;
}
