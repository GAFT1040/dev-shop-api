import { Module } from '@nestjs/common';
import { ClienteController } from './client.controller';

@Module({
  controllers: [ClienteController],
})
export class ClienteModule {}
