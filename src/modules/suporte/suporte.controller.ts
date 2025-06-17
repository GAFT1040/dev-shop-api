import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/suporte')
@ApiTags('Suporte')
export class SuporteController {
  @Get('/id/:id')
  @ApiOperation({ summary: 'Busca usuário suporte pelo ID.' })
  async buscarPorId() {}
  @Get('/email/:email')
  @ApiOperation({ summary: 'Buscar usuário suporte pelo E-mail.' })
  async buscarPorEmail() {}
  @Get('/all')
  @ApiOperation({ summary: 'Buscar todos os usuários suporte.' })
  async buscarTodos() {}
  @Post('/')
  @ApiOperation({ summary: 'Criar um usuário suporte.' })
  async criar() {}
  @Patch('/:id')
  @ApiOperation({ summary: 'Atualiza um usuário suporte pelo ID.' })
  async atualizar() {}
  @Delete('/:id')
  @ApiOperation({ summary: 'Deleta um usuário suporte pelo ID.' })
  async deletar() {}
}
