import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusPedido } from 'src/usuario/enums/statusPedido.enum';
import { ItemPedidoEntity } from 'src/usuario/itemPedido.entity';
import { PedidoEntity } from 'src/usuario/pedido.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { Repository } from 'typeorm';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { AtualizaPedidoDto } from './dto/AtualizaPedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ItemPedidoEntity)
    private readonly itemPedidoRepository: Repository<ItemPedidoEntity>,
  ) {}

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    const pedidoEntity = new PedidoEntity();

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;

    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const itemPedidoEntity = new ItemPedidoEntity();

      itemPedidoEntity.precoVenda = 10;
      itemPedidoEntity.quantidade = itemPedido.quantidade;

      return itemPedidoEntity;
    });

    const valorTotal = itensPedidoEntidades.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade;
    }, 0);

    pedidoEntity.valorTotal = valorTotal;

    pedidoEntity.itensPedido = itensPedidoEntidades; // vai criar os itemPedido automaticamente por causa do `cascade: true` na entidade `Pedido`

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);

    return pedidoCriado;
  }

  async obtemPedidosDeUsuario(idUsuario: string) {
    return this.pedidoRepository.find({
      where: {
        usuario: { id: idUsuario },
      },
      relations: {
        usuario: true,
      },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} pedido`;
  // }

  async atualizaPedido(id: string, atualizaPedidoDto: AtualizaPedidoDto) {
    const pedido = await this.pedidoRepository.findOneBy({ id });

    Object.assign(pedido, atualizaPedidoDto as PedidoEntity);

    return this.pedidoRepository.save(pedido);
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
