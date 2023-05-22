/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { In, Repository } from 'typeorm';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { AtualizaPedidoDto } from './dto/AtualizaPedido.dto';
import { ProdutoEntity } from 'src/produto/produto.entity';
import { ItemPedidoEntity } from './itemPedido.entity';
import { PedidoEntity } from './pedido.entity';
import { StatusPedido } from './enum/statuspedido.enum';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ItemPedidoEntity)
    private readonly itemPedidoRepository: Repository<ItemPedidoEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  private async buscaUsuarioPorId(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (usuario === null) {
      throw new NotFoundException(
        `Não foi encontrado um usuário com o id ${id}.`,
      );
    }

    return usuario;
  }

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.buscaUsuarioPorId(usuarioId);

    const pedidoEntity = new PedidoEntity();

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;

    const produtosIds = dadosDoPedido.itensPedido.map(
      (itemPedido) => itemPedido.produtoId,
    );

    const produtosRelacionados = await this.produtoRepository.findBy({
      id: In(produtosIds),
    });

    this.trataDadosDoPedido(dadosDoPedido, produtosRelacionados);

    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );

      const itemPedidoEntity = new ItemPedidoEntity();

      itemPedidoEntity.produto = produtoRelacionado!;
      itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
      itemPedidoEntity.quantidade = itemPedido.quantidade;

      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade;

      return itemPedidoEntity;
    });

    const valorTotal = itensPedidoEntidades.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade;
    }, 0);

    pedidoEntity.valorTotal = valorTotal;

    pedidoEntity.itensPedido = itensPedidoEntidades; // vai criar os itemPedido automaticamente por causa do `cascade: true` na entidade `Pedido`

    // await this.itemPedidoRepository.save(itensPedidoEntidades);

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
        itensPedido: true,
      },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} pedido`;
  // }

  async atualizaPedido(id: string, atualizaPedidoDto: AtualizaPedidoDto) {
    const pedido = await this.pedidoRepository.findOneBy({ id });

    if (pedido === null) {
      throw new NotFoundException(
        `Não foi encontrado um pedido com o id ${id}.`,
      );
    }

    // Object.assign(pedido, atualizaPedidoDto as PedidoEntity);
    Object.assign(pedido, atualizaPedidoDto);

    return this.pedidoRepository.save(pedido);
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }

  private trataDadosDoPedido(
    dadosDoPedido: CriaPedidoDTO,
    produtosRelacionados: ProdutoEntity[],
  ) {
    dadosDoPedido.itensPedido.forEach((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );

      if (produtoRelacionado === undefined) {
        throw new NotFoundException(
          `Não foi encontrado um produto com o id ${itemPedido.produtoId}.`,
        );
      }

      if (itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel) {
        throw new BadRequestException(
          `A quantidade solicitada (${itemPedido.quantidade}) para o produto ${produtoRelacionado.nome} é maior que a disponível (${produtoRelacionado.quantidadeDisponivel})`,
        );
      }
    });
  }
}
