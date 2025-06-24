import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Publico } from '../auth/auth.guard';
import { ETipoAcesso } from 'src/types/auth/tipo-acesso.enum';
import { Perfil } from '../auth/perfil.guard';

@Controller('/produto')
@ApiTags('Produto')
export class ProdutoController {
  @Get('/:id')
  @ApiOperation({ summary: 'Buscar um produto pelo ID.' })
  @Publico()
  async buscarPorId() {}

  @Get('/all')
  @ApiOperation({ summary: 'Buscar todos os produtos' })
  @Publico()
  async buscarTodos() {}

  @ApiBearerAuth()
  @Post('/')
  @ApiOperation({ summary: 'Cria um novo produto.' })
  @Perfil(ETipoAcesso.USUARIO)
  async criar() {}

  @ApiBearerAuth()
  @Patch('/:id')
  @ApiOperation({ summary: 'Atualiza um produto pelo ID' })
  @Perfil(ETipoAcesso.USUARIO)
  async atualizar() {}

  @ApiBearerAuth()
  @Delete('/:id')
  @ApiOperation({ summary: 'Deleta um produto pelo ID' })
  @Perfil(ETipoAcesso.USUARIO)
  async deletar() {}
}
