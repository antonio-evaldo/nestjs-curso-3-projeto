import { ProdutoEntity } from 'src/produto/produto.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { PedidoEntity } from './pedido.entity';

@Entity({ name: 'produdo_pedido' })
export class ItemPedidoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;

  @Column({ name: 'preco_venda', type: 'float', nullable: false })
  precoVenda: number;

  @ManyToOne(() => PedidoEntity, (pedido) => pedido.itensPedido)
  pedido: PedidoEntity;

  @Column({ name: 'produtoId', nullable: false })
  produtoId: string;

  @ManyToOne(() => ProdutoEntity, (produto) => produto.produtosPedido)
  produto: ProdutoEntity;
}
