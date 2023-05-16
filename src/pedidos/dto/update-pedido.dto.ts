import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDto } from './CriaPedidoDTO';

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) { }
