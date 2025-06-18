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

@Injectable()
export class AuthSercice {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    let response: { id: number; senha: string } | undefined;

    switch (dto.tipo) {
      case ETipoAcesso.USUARIO:
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

    const payload = { tipo: dto.tipo, id: response.id };

    const token = this.jwtService.sign(payload);

    return token;
  }

  async logout() {}
}
