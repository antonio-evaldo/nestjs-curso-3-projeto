import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { StatusPedido } from './enums/statusPedido.enum';
import { ProdutoPedidoEntity } from './produtoPedido.entity';
import { UsuarioEntity } from './usuario.entity';

@Entity({ name: 'pedidos' })
export class PedidoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'valor_total', type: 'float', nullable: false })
  valorTotal: number;

  @Column({ name: 'status', type: 'enum', enum: StatusPedido, nullable: false })
  status: StatusPedido;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.pedidos)
  usuario: UsuarioEntity;

  @OneToMany(() => ProdutoPedidoEntity, (produtoPedido) => produtoPedido.pedido)
  produtosPedido: ProdutoPedidoEntity[];
}
