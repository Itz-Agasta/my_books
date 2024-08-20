import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1724152772168 implements MigrationInterface {
  private UserTable = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'username',
        type: 'VARCHAR',
        length: '255',
        isNullable: false,
      },
      {
        name: 'email',
        type: 'VARCHAR',
        length: '255',
        isNullable: false,
      },
      {
        name: 'password',
        type: 'VARCHAR',
        length: '255',
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
    await queryRunner.createTable(this.UserTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.UserTable);
  }
}
