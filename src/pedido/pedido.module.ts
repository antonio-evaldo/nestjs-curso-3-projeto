import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { PedidoEntity } from 'src/usuario/pedido.entity';
import { ItemPedidoEntity } from 'src/usuario/itemPedido.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PedidoEntity, UsuarioEntity, ItemPedidoEntity]),
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
