import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'bcryptjs';

export default class InsertIntoUsers1625669969074
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashedPassword = await hash('teste', 8);
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users')
      .values({
        name: 'teste',
        email: 'teste@gmail.com',
        password: hashedPassword,
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('users')
      .where('email = :email', { email: 'teste@gmail.com' })
      .execute();
  }
}
