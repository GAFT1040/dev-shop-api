import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ETipoAcesso } from 'src/types/auth/tipo-acesso.enum';

export const PERFIL_KEY = 'perfil';
export const Perfil = (perfil: ETipoAcesso) => SetMetadata(PERFIL_KEY, perfil);

@Injectable()
export class PerfilGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const required = this.reflector.getAllAndOverride<ETipoAcesso>(PERFIL_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!required) return true;

    const { user } = context.switchToHttp().getRequest();

    return user.tipo === required;
  }
}
