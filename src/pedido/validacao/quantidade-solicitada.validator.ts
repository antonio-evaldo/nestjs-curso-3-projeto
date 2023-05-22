// import { Injectable } from '@nestjs/common';
// import {
//   registerDecorator,
//   ValidationArguments,
//   ValidationOptions,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
// } from 'class-validator';
// import { ProdutoService } from 'src/produto/produto.service';
// import { ItemPedidoDTO } from '../dto/CriaPedido.dto';

// @Injectable()
// @ValidatorConstraint({ async: true })
// export class QuantidadeSolicitadaValidator
//   implements ValidatorConstraintInterface
// {
//   constructor(private produtoService: ProdutoService) {}

//   async validate(value: any, args: ValidationArguments): Promise<boolean> {
//     const pedidoSolicitado = args.object as ItemPedidoDTO;

//     // const produtoRelacionado = await this.produtoService.

//     // const usuarioComEmailExiste = await this.produtoService.buscaPorEmail(
//     //   value,
//     // );
//     // return !usuarioComEmailExiste;
//     return true;
//   }
// }

// export const QuantidadeSolicitadaEhValida = (
//   opcoesDeValidacao: ValidationOptions,
// ) => {
//   return (objeto: object, propriedade: string) => {
//     registerDecorator({
//       target: objeto.constructor,
//       propertyName: propriedade,
//       options: opcoesDeValidacao,
//       constraints: [],
//       validator: QuantidadeSolicitadaValidator,
//     });
//   };
// };
