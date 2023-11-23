import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config/constants';
import { ClienteModule } from './cliente/cliente.module';
import { ClientEntity } from './cliente/client.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { UserEntity } from './usuario/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>(DB_HOST),
        port: +configService.get<string>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        entities: [
          ClientEntity,
          UserEntity,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ClienteModule,
    UsuarioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
