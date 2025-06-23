import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Perfil } from 'src/common/decorators/perfil.decorator';
import { ETipoAcesso } from 'src/types/auth/tipo-acesso.enum';

@Controller('/suporte')
@ApiTags('Suporte')
export class SuporteController {
  @ApiBearerAuth()
  @Get('/id/:id')
  @ApiOperation({ summary: 'Busca usuário suporte pelo ID.' })
  async buscarPorId() {}

  @ApiBearerAuth()
  @Get('/all')
  @Perfil(ETipoAcesso.USUARIO)
  @ApiOperation({ summary: 'Buscar todos os usuários suporte.' })
  async buscarTodos() {}

  @ApiBearerAuth()
  @Post('/')
  @Perfil(ETipoAcesso.USUARIO)
  @ApiOperation({ summary: 'Criar um usuário suporte.' })
  async criar() {}

  @ApiBearerAuth()
  @Patch('/:id')
  @Perfil(ETipoAcesso.USUARIO)
  @ApiOperation({ summary: 'Atualiza um usuário suporte pelo ID.' })
  async atualizar() {}

  @ApiBearerAuth()
  @Delete('/:id')
  @Perfil(ETipoAcesso.USUARIO)
  @ApiOperation({ summary: 'Deleta um usuário suporte pelo ID.' })
  async deletar() {}
}
