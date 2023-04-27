import { MigrationInterface, QueryRunner } from 'typeorm';

export class alteraColunaDaTabela1682604383744 implements MigrationInterface {
  name = 'alteraColunaDaTabela1682604383744';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produtos" ALTER COLUMN "valor" TYPE double precision`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produtos" ALTER COLUMN "valor" TYPE integer`,
    );
  }
}
