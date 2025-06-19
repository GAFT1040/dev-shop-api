import {
  Body,
  Controller,
  Delete,
  Head,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { AuthSercice } from './auth.service';
import { Publico } from './auth.guard';

@Controller('/auh')
@ApiTags('Autentificação')
export class AuthController {
  constructor(private readonly service: AuthSercice) {}

  @ApiBearerAuth()
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
  @Publico()
  async login(@Body() dto: LoginDto) {
    const token = await this.service.login(dto);
    return {
      mensagem: 'Login realizado com sucesso!',
      token,
    };
  }

  @ApiBearerAuth()
  @Delete('/logout')
  @ApiOperation({
    summary: 'Realiza o logout.',
    description: 'Rota reponsável pelo logout do sistema.',
  })
  async logout() {}
}
