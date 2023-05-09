import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { EmailEhUnicoValidator } from './validacao/email-eh-unico.validator';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';
import { PedidoEntity } from './pedido.entity';
import { ItemPedidoEntity } from './itemPedido.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity, PedidoEntity, ItemPedidoEntity]),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, EmailEhUnicoValidator],
})
export class UsuarioModule {}
