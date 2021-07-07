import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddForeignKeyAulasToModulos1622871663933
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'aulas',
      new TableForeignKey({
        name: 'ModuloId',
        columnNames: ['modulo'],
        referencedColumnNames: ['id'],
        referencedTableName: 'modulos',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('aulas', 'ModuloId');
  }
}
