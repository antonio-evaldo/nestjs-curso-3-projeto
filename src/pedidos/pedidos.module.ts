import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoEntity])],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule { }
