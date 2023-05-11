import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class ItemPedidoDTO {
  @IsUUID()
  produtoId: string;

  @IsInt()
  quantidade: number;

  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  precoVenda: number;
}

export class CriaPedidoDTO {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemPedidoDTO)
  itensPedido: ItemPedidoDTO[];
}
