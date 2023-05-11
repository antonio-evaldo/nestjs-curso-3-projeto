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
import { StatusPedido } from './enums/statusPedido.enum';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(ItemPedidoEntity)
    private readonly itemPedidoRepository: Repository<ItemPedidoEntity>,
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

  // recebemos o DTO, não a entidade
  async cadastraPedido(idUsuario: string, dadosDoPedido: CriaPedidoDTO) {
    console.log(idUsuario, dadosDoPedido);

    const pedidoEntity = this.pedidoRepository.create({
      status: StatusPedido.EM_PROCESSAMENTO,
      usuarioId: idUsuario,
    });

    let valorTotal = 0;

    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const itemPedidoEntity = this.itemPedidoRepository.create({
        produtoId: itemPedido.produtoId,
        precoVenda: itemPedido.precoVenda,
        quantidade: itemPedido.quantidade,
      });

      valorTotal += itemPedido.precoVenda * itemPedido.quantidade;

      return itemPedidoEntity;
    });

    pedidoEntity.valorTotal = valorTotal;

    pedidoEntity.itensPedido = itensPedidoEntidades;

    // fazendo cascata
    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);

    return pedidoCriado;
  }
}
