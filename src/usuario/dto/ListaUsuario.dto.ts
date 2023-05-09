import { ListaPedidoDTO } from './ListaPedido.dto';

export class ListaUsuarioDTO {
  constructor(
    readonly id: string,
    readonly nome: string,
    readonly pedidos: ListaPedidoDTO[],
  ) {}
}
