import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CriarClienteDTO } from './dtos/criar-cliente.dto';
import { ClienteService } from './cliente.service';
import { Publico } from '../auth/auth.guard';

@Controller('/cliente')
@ApiTags('Cliente')
export class ClienteController {
  constructor(private readonly service: ClienteService) {}

  @ApiBearerAuth()
  @Get('/id/:id')
  @ApiOperation({ summary: 'Buscar um cliente pelo ID.' })
  async buscarPorId() {}

  @ApiBearerAuth()
  @Get('/all')
  @ApiOperation({ summary: 'Buscar todos os cleintes.' })
  async buscarTodos() {}

  @Post('/')
  @ApiOperation({ summary: 'Criar um novo cliente.' })
  @Publico()
  async criar(@Body() dto: CriarClienteDTO) {
    const cliente = await this.service.criar(dto);
    return {
      mensagem: 'Cliente cadastrado com sucesso!',
      cliente,
    };
  }

  @ApiBearerAuth()
  @Patch('/:id')
  @ApiOperation({ summary: 'Atualiza um clieante pelo ID.' })
  async atualizar() {}

  @ApiBearerAuth()
  @Delete('/:id')
  @ApiOperation({ summary: 'Deleta um cliente pelo ID.' })
  async deletar() {}
}
