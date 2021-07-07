import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnQntAulasToModulos1625507786454
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'modulos',
      new TableColumn({
        name: 'qntAulas',
        type: 'integer',
        isNullable: true,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('modulos', 'qntAulas');
  }
}
