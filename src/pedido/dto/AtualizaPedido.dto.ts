import { PartialType } from '@nestjs/mapped-types';
import { CriaPedidoDTO, ItemPedidoDTO } from './CriaPedido.dto';

export class AtualizaPedidoDto extends PartialType(CriaPedidoDTO) {}
