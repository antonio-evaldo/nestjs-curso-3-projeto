import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { EmailEhUnicoValidator } from './validacao/email-eh-unico.validator';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';
import { PedidoEntity } from './pedido.entity';
import { ProdutoPedidoEntity } from './produtoPedido.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsuarioEntity,
      PedidoEntity,
      ProdutoPedidoEntity,
    ]),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, EmailEhUnicoValidator],
})
export class UsuarioModule {}
