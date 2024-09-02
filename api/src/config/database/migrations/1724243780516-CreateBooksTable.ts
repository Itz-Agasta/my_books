import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateBooksTable1724243780516 implements MigrationInterface {
  private BooksTable = new Table({
    name: 'books',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'VARCHAR',
        length: '255',
        isNullable: false,
      },
      {
        name: 'sinopse',
        type: 'VARCHAR',
        length: '255',
        isNullable: false,
      },
      {
        name: 'type',
        type: 'VARCHAR',
        length: '255',
        isNullable: false,
      },
      {
        name: 'pages',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'read',
        type: 'boolean',
        default: false,
        isNullable: false,
      },
      {
        name: 'writer_id',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'publisher_id',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'drawer_id',
        type: 'INTEGER',
        isNullable: true,
      },
      {
        name: 'stamp_id',
        type: 'INTEGER',
        isNullable: true,
      },
      {
        name: 'collection_id',
        type: 'INTEGER',
        isNullable: true,
      },
      {
        name: 'created_at',
        type: 'TIMESTAMP',
        default: 'NOW()',
      },
      {
        name: 'updated_at',
        type: 'TIMESTAMP',
        default: 'NOW() ON UPDATE CURRENT_TIMESTAMP()',
      },
      {
        name: 'deleted_at',
        type: 'TIMESTAMP',
        isNullable: true,
      },
    ],
  });

  private writerForeignKey = new TableForeignKey({
    name: 'fk_writer_books_writer_id',
    columnNames: ['writer_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'writers',
    onDelete: 'CASCADE',
  });

  private publisherForeignKey = new TableForeignKey({
    name: 'fk_publisher_books_publisher_id',
    columnNames: ['publisher_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'publishers',
    onDelete: 'CASCADE',
  });

  private drawersForeignKey = new TableForeignKey({
    name: 'fk_drawer_books_drawer_id',
    columnNames: ['drawer_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'drawers',
    onDelete: 'CASCADE',
  });

  private stampForeignKey = new TableForeignKey({
    name: 'fk_stamp_books_stamp_id',
    columnNames: ['stamp_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'stamps',
    onDelete: 'CASCADE',
  });

  private collectionForeignKey = new TableForeignKey({
    name: 'fk_collection_books_collection_id',
    columnNames: ['collection_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'collections',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.BooksTable);
    await queryRunner.createForeignKeys('books', [
      this.writerForeignKey,
      this.publisherForeignKey,
      this.drawersForeignKey,
      this.stampForeignKey,
      this.collectionForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('books', [
      this.writerForeignKey,
      this.publisherForeignKey,
      this.drawersForeignKey,
      this.stampForeignKey,
      this.collectionForeignKey,
    ]);
    await queryRunner.dropTable(this.BooksTable);
  }
}
