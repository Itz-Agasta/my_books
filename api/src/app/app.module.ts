import { Module } from '@nestjs/common';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { CollectionsModule } from 'src/modules/collections/collections.module';
import { DrawerModule } from 'src/modules/drawer/drawer.module';
import { PublisherModule } from 'src/modules/publisher/publisher.module';
import { StampModule } from 'src/modules/stamp/stamp.module';
import { UsersModule } from 'src/modules/users/users.module';
import { WriterModule } from 'src/modules/writer/writer.module';
import { DatabaseModule } from 'src/providers/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PublisherModule,
    WriterModule,
    DrawerModule,
    StampModule,
    CollectionsModule,
    AuthenticationModule,
    UsersModule,
  ],
})
export class AppModule {}
