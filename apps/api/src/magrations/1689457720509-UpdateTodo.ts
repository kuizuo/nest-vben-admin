import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTodo1689457720509 implements MigrationInterface {
  name = 'UpdateTodo1689457720509';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`todo\` ADD \`status\` tinyint NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`todo\` ADD \`status\` varchar(255) NOT NULL DEFAULT '0'`,
    );
  }
}
