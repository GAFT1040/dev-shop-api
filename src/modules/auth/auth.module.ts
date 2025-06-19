import { Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthSercice } from './auth.service';
import { ClienteModule } from '../cliente/client.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    ClienteModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const logger: Logger = new Logger(AuthModule.name);

        const secret = config.get<string>('JWT_SECRET');

        if (!secret) {
          logger.error("Variável de ambiente 'JWT_SECRET' não configurada!");
          process.exit(1);
        }

        return {
          global: true,
          secret,
          signOptions: { expiresIn: '24h' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthSercice,
  ],
  exports: [AuthSercice],
})
export class AuthModule {}
