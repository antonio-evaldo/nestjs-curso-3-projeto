import { MigrationInterface, QueryRunner } from 'typeorm';

export class renomeiaColunaDaTabela1682603039196 implements MigrationInterface {
  name = 'renomeiaColunaDaTabela1682603039196';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produtos" RENAME COLUMN "quantidade" TO "quantidade_disponivel"`,
    );
    await queryRunner.query(
      `ALTER TABLE "produtos" ALTER COLUMN "quantidade_disponivel" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produtos" ALTER COLUMN "quantidade_disponivel" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "produtos" RENAME COLUMN "quantidade_disponivel" TO "quantidade"`,
    );
  }
}
