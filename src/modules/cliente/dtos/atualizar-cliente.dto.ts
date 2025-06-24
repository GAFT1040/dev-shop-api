import { PartialType } from '@nestjs/swagger';
import { CriarClienteDTO } from './criar-cliente.dto';

export class AtualizarClienteDto extends PartialType(CriarClienteDTO) {}
