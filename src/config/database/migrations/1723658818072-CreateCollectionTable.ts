import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCollectionTable1723658818072 implements MigrationInterface {
  private CollectionTable = new Table({
    name: 'collections',
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
        length: '50',
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

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.CollectionTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.CollectionTable);
  }
}
