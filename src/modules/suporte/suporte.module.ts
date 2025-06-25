import { Module } from '@nestjs/common';
import { SuporteController } from './suporte.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suporte } from './suporte.entity';
import { SuporteService } from './suporte.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Suporte])],
  controllers: [SuporteController],
  providers: [SuporteService],
  exports: [SuporteService],
})
export class SuporteModule {}
