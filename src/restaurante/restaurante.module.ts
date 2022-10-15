import { CacheModule, Module } from '@nestjs/common';
import { RestauranteEntity } from './restaurante.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteService } from './restaurante.service';
import { RestauranteController } from './restaurante.controller';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { RestauranteResolver } from './restaurante.resolver';
import * as sqliteStore from 'cache-manager-sqlite';

@Module({
  imports: [
    TypeOrmModule.forFeature([RestauranteEntity]),
    CacheModule.register({
      store: sqliteStore,
      path: ':memory:',
      options: {
        ttl: 15,
      },
    }),
  ],
  providers: [RestauranteService, JwtService, UsuarioService, RestauranteResolver],
  controllers: [RestauranteController],
})
export class RestauranteModule {}
