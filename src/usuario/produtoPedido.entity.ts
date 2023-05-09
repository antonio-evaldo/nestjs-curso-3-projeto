import { ProdutoEntity } from 'src/produto/produto.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { PedidoEntity } from './pedido.entity';

@Entity({ name: 'produdo_pedido' })
export class ProdutoPedidoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;

  @Column({ name: 'preco_venda', type: 'float', nullable: false })
  precoVenda: number;

  @ManyToOne(() => PedidoEntity, (pedido) => pedido.produtosPedido)
  pedido: PedidoEntity;

  // @ManyToOne(() => ProdutoEntity, (produto) => produto.produtosPedido)
  // produto: ProdutoEntity;
}
