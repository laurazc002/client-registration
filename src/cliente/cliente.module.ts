import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';
import { ClientRepository } from './client.repository';
import { ClienteController } from './cliente.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
    ])
  ],
  providers: [ClientRepository],
  controllers: [ClienteController]
})
export class ClienteModule {}
