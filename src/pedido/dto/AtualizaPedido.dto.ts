import { PartialType } from '@nestjs/mapped-types';
import { CriaPedidoDTO } from './CriaPedido.dto';

export class AtualizaPedidoDto extends PartialType(CriaPedidoDTO) {}
