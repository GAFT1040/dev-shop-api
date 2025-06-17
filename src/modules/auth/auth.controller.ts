import { Controller, Delete, Head, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/auh')
@ApiTags('Autentificação')
export class AuthController {
  @Head('/')
  @ApiOperation({
    summary: 'Valida a autentificação',
    description: 'Rota para ping',
  })
  async auth() {
    return HttpStatus.OK;
  }

  @Post('/login')
  @ApiOperation({
    summary: 'Realiza a autentificação.',
    description:
      'Rota responsável pela autentificação do sistema, retorna um token JWT.',
  })
  async login() {}

  @Delete('/logout')
  @ApiOperation({
    summary: 'Realiza o logout.',
    description: 'Rota reponsável pelo logout do sistema.',
  })
  async logout() {}
}
