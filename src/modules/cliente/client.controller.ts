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

@Controller('/cliente')
@ApiTags('Cliente')
export class ClienteController {
  constructor(private readonly service: ClienteService) {}

  @ApiBearerAuth()
  @Get('/:id')
  @ApiOperation({ summary: 'Buscar um cliente pelo ID.' })
  @ApiParam({ name: 'id', type: Number, required: true })
  async buscarPorId(@Param() param: IdDTO) {
    console.log(param);
  }

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
  @ApiParam({ name: 'id', type: Number, required: true })
  async atualizar(@Param() param: IdDTO) {}

  @ApiBearerAuth()
  @Delete('/:id')
  @ApiOperation({ summary: 'Deleta um cliente pelo ID.' })
  @ApiParam({ name: 'id', type: Number, required: true })
  async deletar(@Param() param: IdDTO) {}
}
