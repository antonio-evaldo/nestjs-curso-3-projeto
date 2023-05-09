import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { PedidoEntity } from './pedido.entity';
import { ItemPedidoEntity } from './itemPedido.entity';

import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ListaPedidoDTO } from './dto/ListaPedido.dto';
import { ProdutoEntity } from 'src/produto/produto.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(ItemPedidoEntity)
    private readonly produtoPedidoRepository: Repository<ItemPedidoEntity>,
  ) {}

  async criaUsuario(usuarioEntity: UsuarioEntity) {
    await this.usuarioRepository.save(usuarioEntity);
  }

  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find({
      relations: {
        pedidos: true,
      },
    });

    const usuariosLista = usuariosSalvos.map(
      (usuario) =>
        new ListaUsuarioDTO(
          usuario.id,
          usuario.nome,
          usuario.pedidos.map((pedido) => {
            return new ListaPedidoDTO(
              pedido.id,
              pedido.valorTotal,
              pedido.status,
            );
          }),
        ),
    );

    return usuariosLista;
  }

  async buscaPorEmail(email: string) {
    const checkEmail = await this.usuarioRepository.findOne({
      where: { email },
    });
    return checkEmail;
  }

  async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
    await this.usuarioRepository.update(id, novosDados);
  }

  async deletaUsuario(id: string) {
    await this.usuarioRepository.delete(id);
  }

  async obtemPedidos(idUsuario: string) {
    return await this.pedidoRepository.find({
      where: {
        usuario: { id: idUsuario },
      },
    });
  }

  async cadastraPedido(idUsuario: string, dadosDoPedido: CriaPedidoDTO) {
    console.log(idUsuario, dadosDoPedido);

    const usuario = await this.usuarioRepository.findOneBy({ id: idUsuario });

    const pedidoEntity = new PedidoEntity();

    pedidoEntity.valorTotal = dadosDoPedido.valorTotal;
    pedidoEntity.status = dadosDoPedido.status;
    pedidoEntity.usuario = usuario;

    // const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);

    const produtosPedidoEntidades = dadosDoPedido.itensPedido.map(
      (itemPedido) => {
        const produtoPedidoEntity = new ItemPedidoEntity();

        // const produtoEntity = new ProdutoEntity();
        // produtoEntity.id = itemPedido.produtoId;

        produtoPedidoEntity.precoVenda = itemPedido.precoVenda;
        produtoPedidoEntity.quantidade = itemPedido.quantidade;
        // produtoPedidoEntity.pedido = pedidoCriado;
        // produtoPedidoEntity.produto = produtoEntity;

        return produtoPedidoEntity;
      },
    );

    pedidoEntity.itensPedido = produtosPedidoEntidades;

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);

    // this.produtoPedidoRepository.save(produtosPedidoEntidades);

    // this.produtoPedidoRepository.save(dadosDoPedido)

    // pedidoEntity.produtosPedido = dadosDoPedido.produtosPedido;

    // dadosDoPedido.produtosPedido.forEach((produtoPedido) => {
    //   const produtoPedidoEntity = new ProdutoPedidoEntity();
    //   const produtoEntity = new ProdutoEntity();

    //   produtoEntity.id = produtoPedido.produtoId;

    //   produtoPedidoEntity.precoVenda = produtoPedido.precoVenda;
    //   produtoPedidoEntity.quantidade = produtoPedido.quantidade;
    //   produtoPedidoEntity.pedido = produtoEntity;

    //   this.produtoPedidoRepository.save(produtoPedido);
    // });

    return pedidoCriado;
  }
}
