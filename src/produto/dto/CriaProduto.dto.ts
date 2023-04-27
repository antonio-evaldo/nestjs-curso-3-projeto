import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProdutoEntity } from '../produto.entity';

export class CaracteristicaProdutoDTO {
  id: string;

  @IsString({ message: 'Nome da característica deve ser uma string' })
  @IsNotEmpty({ message: 'Nome da cadasterística não pode ser vazio' })
  nome: string;

  @IsString({ message: 'Descrição da característica deve ser uma string' })
  @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
  descricao: string;

  produto: ProdutoEntity;
}

export class ImagemProdutoDTO {
  id: string;

  @IsUrl(undefined, { message: 'URL para imagem inválida' })
  url: string;

  @IsString({ message: 'Descrição da imagem deve ser uma string' })
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  descricao: string;

  produto: ProdutoEntity;
}

export class CriaProdutoDTO {
  @IsUUID(4, { message: 'ID de usuário inválido' })
  usuarioId: string;

  @IsString({ message: 'O nome do produto deve ser uma string' })
  @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
  nome: string;

  @IsNumber(
    { maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false },
    { message: 'O valor do produto deve ser um número válido' },
  )
  @IsPositive({ message: 'O valor do produto precisa ser maior que zero' })
  valor: number;

  @IsInt({ message: 'A quantidade disponível deve ser um número inteiro' })
  @Min(0, { message: 'Quantidade disponível inválida' })
  quantidadeDisponivel: number;

  @IsString({ message: 'O nome do produto deve ser uma string' })
  @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia' })
  @MaxLength(5000, {
    message: 'Descrição não pode ter mais que 1000 caracteres',
  })
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1, {
    message: 'O produto deve conter pelo menos uma característica',
  })
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1, { message: 'O produto deve conter pelo menos uma imagem' })
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @IsString({ message: 'Categoria do produto deve ser uma string' })
  @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
  categoria: string;
}
