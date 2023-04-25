import { MigrationInterface, QueryRunner } from 'typeorm';

export class alteraColunaDaTabelaProdutos1682434345418
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produtos" RENAME COLUMN "quantidade" TO "quantidadeDisponivel"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produtos" RENAME COLUMN "quantidadeDisponivel" TO "quantidade"`,
    );
  }
}
