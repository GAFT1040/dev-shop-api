import { Optional } from '@nestjs/common';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { CriarClienteDTO } from 'src/modules/cliente/dtos/criar-cliente.dto';

export class AtualizarSuporteDto extends PartialType(CriarClienteDTO) {
  @Optional()
  @IsBoolean({ message: "O campo 'ativo' deve ser um booleano" })
  @ApiPropertyOptional()
  ativo?: boolean;
}
