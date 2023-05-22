import { ProdutoEntity } from 'src/produto/produto.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { PedidoEntity } from './pedido.entity';

@Entity({ name: 'itens_pedidos' })
export class ItemPedidoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;

  @Column({ name: 'preco_venda', nullable: false })
  precoVenda: number;

  @ManyToOne(() => PedidoEntity, (pedido) => pedido.itensPedido, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  pedido: PedidoEntity;

  @ManyToOne(() => ProdutoEntity, (produto) => produto.itensPedido, {
    cascade: ['update'], // permite que a tabela ItemPedido apenas atualize a tabela Produto, mas não insira novos registros (o que seria 'insert')
  })
  produto: ProdutoEntity;
}
