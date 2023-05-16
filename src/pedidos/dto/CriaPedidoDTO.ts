import { IsIn, IsNumber } from 'class-validator';

export class CriaPedidoDTO {
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  valorTotal: number;

  @IsIn(['em_processamento', 'aprovado', 'cancelado'])
  status: string;
}
