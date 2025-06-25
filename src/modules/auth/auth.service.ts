import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClienteService } from '../cliente/cliente.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { ETipoAcesso } from 'src/types/auth/tipo-acesso.enum';
import * as bcrypt from 'bcrypt';
import { IAuth } from 'src/types/auth/auth.interface';
import { SuporteService } from '../suporte/suporte.service';

@Injectable()
export class AuthSercice {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly jwtService: JwtService,
    private readonly suporteService: SuporteService,
  ) {}

  async login(dto: LoginDto) {
    let response: { id: number; senha: string } | undefined;

    switch (dto.tipo) {
      case ETipoAcesso.USUARIO:
        const usuario = await this.suporteService.buscarPorEmail(
          dto.identificador,
        );
        if (!usuario.ativo)
          throw new UnauthorizedException('Acesso não autorizado!');
        response = {
          id: usuario.id,
          senha: usuario.senha,
        };
        break;
      case ETipoAcesso.CLIENTE:
        const cliente = await this.clienteService.buscarPorEmail(
          dto.identificador,
        );
        response = {
          id: cliente.id,
          senha: cliente.senha,
        };
        break;
    }

    if (!response) throw new BadRequestException();

    const match = await bcrypt.compare(dto.senha, response?.senha);

    if (!match) throw new UnauthorizedException('Credenciais inválidas!');

    const payload: IAuth = { tipo: dto.tipo, id: response.id };

    const token = this.jwtService.sign(payload);

    return token;
  }

  async logout() {}
}
