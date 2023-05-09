export class ListaPedidoDTO {
  constructor(
    readonly id: string,
    readonly valorTotal: number,
    readonly status: string,
  ) {}
}
