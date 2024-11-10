import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateReadingsTable1725386949379 implements MigrationInterface {
  private ReadingsTable = new Table({
    name: 'readings',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'actually_page',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'expected_end_date',
        type: 'TIMESTAMP',
        isNullable: true,
      },
      {
        name: 'finished',
        type: 'boolean',
        default: false,
        isNullable: false,
      },
      {
        name: 'book_id',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'user_id',
        type: 'INTEGER',
        isNullable: false,
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

  private bookForeignKey = new TableForeignKey({
    name: 'fk_book_readings_book_id',
    columnNames: ['book_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'books',
    onDelete: 'CASCADE',
  });

  private userForeignKey = new TableForeignKey({
    name: 'fk_user_readings_user_id',
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.ReadingsTable);
    await queryRunner.createForeignKeys('readings', [
      this.bookForeignKey,
      this.userForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('readings', [
      this.bookForeignKey,
      this.userForeignKey,
    ]);
    await queryRunner.dropTable(this.ReadingsTable);
  }
}
