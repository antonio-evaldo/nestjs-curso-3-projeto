import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsUUID,
  Min,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';
// import { QuantidadeSolicitadaEhValida } from '../validacao/quantidade-solicitada.validator';

export class ItemPedidoDTO {
  @IsUUID()
  produtoId: string;

  @IsInt()
  @Min(1, {
    message: ({ object, value }: ValidationArguments) => {
      const produtoId = (object as ItemPedidoDTO).produtoId;

      return `A quantidade solicitada (${value}) é inválida para o produto de id ${produtoId}.`;
    },
  })
  // @QuantidadeSolicitadaEhValida({})
  quantidade: number;
}

export class CriaPedidoDTO {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemPedidoDTO)
  itensPedido: ItemPedidoDTO[];
}
