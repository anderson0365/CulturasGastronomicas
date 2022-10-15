import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { RestauranteService } from '../restaurante/restaurante.service';
import { CiudadRestauranteController } from './ciudad-restaurante.controller';
import { CiudadRestauranteService } from './ciudad-restaurante.service';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as sqliteStore from 'cache-manager-sqlite';


@Module({
  imports: [TypeOrmModule.forFeature([RestauranteEntity, CiudadEntity]), 
  CacheModule.register({
    store: sqliteStore,
    path: ':memory:',
    options: {
      ttl: 5
    },
  })
],
  providers: [CiudadRestauranteService, RestauranteService, JwtService, UsuarioService],
  controllers: [CiudadRestauranteController]
})
export class CiudadRestauranteModule {}
