import { Module } from '@nestjs/common';
import { SuporteController } from './suporte.controller';

@Module({
  controllers: [SuporteController],
})
export class SuporteModule {}
