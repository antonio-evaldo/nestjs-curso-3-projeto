import { MigrationInterface, QueryRunner } from 'typeorm';

export class criaEMapeiaPedidos1683748700834 implements MigrationInterface {
  name = 'criaEMapeiaPedidos1683748700834';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pedidos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "valor_total" double precision NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "usuarioId" uuid, CONSTRAINT "PK_ebb5680ed29a24efdc586846725" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "produdo_pedido" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantidade" integer NOT NULL, "preco_venda" double precision NOT NULL, "pedidoId" uuid, "produtoId" uuid, CONSTRAINT "PK_3a9f4b7ca14ae031aa1b11da481" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "usuario_id"`);
    await queryRunner.query(
      `ALTER TABLE "pedidos" ADD CONSTRAINT "FK_e60a655127c227b5e063e73165b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "produdo_pedido" ADD CONSTRAINT "FK_c4cd027f3997d95476c7d04b57e" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "produdo_pedido" DROP CONSTRAINT "FK_c4cd027f3997d95476c7d04b57e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedidos" DROP CONSTRAINT "FK_e60a655127c227b5e063e73165b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "produtos" ADD "usuario_id" character varying(100)`,
    );
    await queryRunner.query(`DROP TABLE "produdo_pedido"`);
    await queryRunner.query(`DROP TABLE "pedidos"`);
  }
}
