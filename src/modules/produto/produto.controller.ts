import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/produto')
@ApiTags('Produto')
export class ProdutoController {
  @Get('/:id')
  @ApiOperation({ summary: 'Buscar um produto pelo ID.' })
  async buscarPorId() {}

  @Get('/all')
  @ApiOperation({ summary: 'Buscar todos os produtos' })
  async buscarTodos() {}

  @ApiBearerAuth()
  @Post('/')
  @ApiOperation({ summary: 'Cria um novo produto.' })
  async criar() {}

  @ApiBearerAuth()
  @Patch('/:id')
  @ApiOperation({ summary: 'Atualiza um produto pelo ID' })
  async atualizar() {}

  @ApiBearerAuth()
  @Delete('/:id')
  @ApiOperation({ summary: 'Deleta um produto pelo ID' })
  async deletar() {}
}
