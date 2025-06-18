import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/suporte')
@ApiTags('Suporte')
export class SuporteController {
  @ApiBearerAuth()
  @Get('/id/:id')
  @ApiOperation({ summary: 'Busca usuário suporte pelo ID.' })
  async buscarPorId() {}

  @ApiBearerAuth()
  @Get('/all')
  @ApiOperation({ summary: 'Buscar todos os usuários suporte.' })
  async buscarTodos() {}

  @ApiBearerAuth()
  @Post('/')
  @ApiOperation({ summary: 'Criar um usuário suporte.' })
  async criar() {}

  @ApiBearerAuth()
  @Patch('/:id')
  @ApiOperation({ summary: 'Atualiza um usuário suporte pelo ID.' })
  async atualizar() {}

  @ApiBearerAuth()
  @Delete('/:id')
  @ApiOperation({ summary: 'Deleta um usuário suporte pelo ID.' })
  async deletar() {}
}
