import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/CriaPedidoDTO';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
  ) { }
}
