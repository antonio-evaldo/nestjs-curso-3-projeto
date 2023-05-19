import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { In, Repository } from 'typeorm';
import { PedidoEntity } from './pedido.entity';
import { ItemPedidoEntity } from './itemPedido.entity';

import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ListaPedidoDTO } from './dto/ListaPedido.dto';
import { StatusPedido } from './enums/statusPedido.enum';
import { ProdutoEntity } from 'src/produto/produto.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(ItemPedidoEntity)
    private readonly itemPedidoRepository: Repository<ItemPedidoEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
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
      relations: {
        itensPedido: { produto: true },
      },
    });
  }

  async cadastraPedido(idUsuario: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id: idUsuario });

    if (usuario === null) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const pedidoEntity = this.pedidoRepository.create({
      status: StatusPedido.EM_PROCESSAMENTO,
      usuario,
    });

    const produtosIds = dadosDoPedido.itensPedido.map(
      (itemPedido) => itemPedido.produtoId,
    );

    const produtos = await this.produtoRepository.findBy({
      id: In(produtosIds),
    });

    let valorTotal = 0;

    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const itemPedidoEntity = this.itemPedidoRepository.create({
        precoVenda: 10,
        quantidade: itemPedido.quantidade,
      });

      valorTotal += itemPedidoEntity.precoVenda * itemPedido.quantidade;

      return itemPedidoEntity;
    });

    pedidoEntity.valorTotal = valorTotal;

    pedidoEntity.itensPedido = itensPedidoEntidades;

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);

    return pedidoCriado;
  }
}
