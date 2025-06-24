import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CriarClienteDTO } from './dtos/criar-cliente.dto';
import { ClienteService } from './cliente.service';
import { Publico } from '../auth/auth.guard';
import { IdDTO } from 'src/common/decorators/dtos/id.dto';
import { ETipoAcesso } from 'src/types/auth/tipo-acesso.enum';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Perfil } from '../auth/perfil.guard';
import { IAuth } from 'src/types/auth/auth.interface';
import { AtualizarClienteDto } from './dtos/atualizar-cliente.dto';

@Controller('/cliente')
@ApiTags('Cliente')
export class ClienteController {
  constructor(private readonly service: ClienteService) {}

  @ApiBearerAuth()
  @Get('/:id')
  @ApiOperation({ summary: 'Buscar um cliente pelo ID.' })
  @ApiParam({ name: 'id', type: Number, required: true })
  async buscarPorId(@Param() param: IdDTO) {
    return await this.service.buscarPorId(param.id);
  }

  @ApiBearerAuth()
  @Get('/all')
  @ApiOperation({ summary: 'Buscar todos os cleintes.' })
  @Perfil(ETipoAcesso.USUARIO)
  async buscarTodos() {}

  @Post('/')
  @ApiOperation({ summary: 'Criar um novo cliente.' })
  @Publico()
  async criar(@Body() dto: CriarClienteDTO) {
    const cliente = await this.service.criar(dto);
    return {
      mensagem: 'Cliente cadastrado com sucesso!',
      data: cliente,
    };
  }

  @ApiBearerAuth()
  @Patch('/')
  @ApiOperation({ summary: 'Atualiza um clieante.' })
  @Perfil(ETipoAcesso.CLIENTE)
  async atualizar(@Auth() auth: IAuth, @Body() dto: AtualizarClienteDto) {
    const cliente = await this.service.atualizar(auth.id, dto);
    return {
      mensagem: `Cliente '${cliente.id}' atualizado com sucesso!`,
      data: cliente,
    };
  }

  @ApiBearerAuth()
  @Delete('/')
  @ApiOperation({ summary: 'Deleta um cliente.' })
  @ApiParam({ name: 'id', type: Number, required: true })
  @Perfil(ETipoAcesso.CLIENTE)
  async deletar(@Auth() auth: IAuth) {
    await this.service.deletar(auth.id);
    return {
      mensagem: `Cliente '${auth.id}' deletado com sucesso!`,
    };
  }
}
