import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { EmailEhUnicoValidator } from './validacao/email-eh-unico.validator';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';
import { ProdutoEntity } from 'src/produto/produto.entity';
import { PedidoEntity } from 'src/pedido/pedido.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity, PedidoEntity, ProdutoEntity]),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, EmailEhUnicoValidator],
})
export class UsuarioModule {}
