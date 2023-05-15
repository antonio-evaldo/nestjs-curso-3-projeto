import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeColunasUsuarioidEProdutoid1684159853005
  implements MigrationInterface
{
  name = 'removeColunasUsuarioidEProdutoid1684159853005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pedidos" DROP CONSTRAINT "FK_e60a655127c227b5e063e73165b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedidos" ALTER COLUMN "usuarioId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "produdo_pedido" DROP CONSTRAINT "FK_8e43ab132121ff833e0d5a3d662"`,
    );
    await queryRunner.query(
      `ALTER TABLE "produdo_pedido" ALTER COLUMN "produtoId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedidos" ADD CONSTRAINT "FK_e60a655127c227b5e063e73165b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "produdo_pedido" ADD CONSTRAINT "FK_8e43ab132121ff833e0d5a3d662" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produdo_pedido" DROP CONSTRAINT "FK_8e43ab132121ff833e0d5a3d662"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedidos" DROP CONSTRAINT "FK_e60a655127c227b5e063e73165b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "produdo_pedido" ALTER COLUMN "produtoId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "produdo_pedido" ADD CONSTRAINT "FK_8e43ab132121ff833e0d5a3d662" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedidos" ALTER COLUMN "usuarioId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedidos" ADD CONSTRAINT "FK_e60a655127c227b5e063e73165b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
