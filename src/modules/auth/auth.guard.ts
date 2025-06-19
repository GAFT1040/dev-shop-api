import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export const IS_PUBLIC_KEY = 'isPublic';
export const Publico = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtSercice: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublico = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublico) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extrairToken(request);
    try {
      if (!token) throw new Error();

      const payload = await this.jwtSercice.verify(token);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Acesso negado!');
    }
    return true;
  }

  private extrairToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
