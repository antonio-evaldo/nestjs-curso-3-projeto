import { MigrationInterface, QueryRunner } from 'typeorm';

export class alteraColunaDaTabelaProdutos1682456351595
  implements MigrationInterface
{
  name = 'alteraColunaDaTabelaProdutos1682456351595';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produtos" RENAME COLUMN "quantidade" TO "quantidadeDisponivel"`,
    );
    await queryRunner.query(
      `ALTER TABLE "produtos" ALTER COLUMN "quantidadeDisponivel" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produtos" ALTER COLUMN "quantidadeDisponivel" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "produtos" RENAME COLUMN "quantidadeDisponivel" TO "quantidade"`,
    );
  }
}
