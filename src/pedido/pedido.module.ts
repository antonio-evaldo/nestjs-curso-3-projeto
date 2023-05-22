import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { ProdutoEntity } from '../produto/produto.entity';
import { ItemPedidoEntity } from './itemPedido.entity';
import { PedidoEntity } from './pedido.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PedidoEntity,
      UsuarioEntity,
      ProdutoEntity,
      ItemPedidoEntity,
    ]),
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
