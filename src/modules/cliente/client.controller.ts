import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/cliente')
@ApiTags('Cliente')
export class ClienteController {
  @Get('/id/:id')
  @ApiOperation({ summary: 'Buscar um cliente pelo ID.' })
  async buscarPorId() {}
  @Get('/email/:email')
  @ApiOperation({ summary: 'Buscar um cliente pelo e-mail.' })
  async buscarPorEmail() {}
  @Get('/all')
  @ApiOperation({ summary: 'Buscar todos os cleintes.' })
  async buscarTodos() {}
  @Post('/ ')
  @ApiOperation({ summary: 'Criar um novo cliente.' })
  async criar() {}
  @Patch('/:id')
  @ApiOperation({ summary: 'Atualiza um clieante pelo ID.' })
  async atualizar() {}
  @Delete('/:id')
  @ApiOperation({ summary: 'Deleta um cliente por ID.' })
  async deletar() {}
}
