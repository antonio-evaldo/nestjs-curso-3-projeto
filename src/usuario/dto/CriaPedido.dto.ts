import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { StatusPedido } from '../enums/statusPedido.enum';

class ItemPedidoDTO {
  // @IsUUID()
  // produtoId: string;

  @IsInt()
  quantidade: number;

  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  precoVenda: number;
}

export class CriaPedidoDTO {
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  valorTotal: number;

  @IsIn(['em_processamento', 'processado', 'cancelado'])
  status: StatusPedido;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemPedidoDTO)
  itensPedido: ItemPedidoDTO[];
}
