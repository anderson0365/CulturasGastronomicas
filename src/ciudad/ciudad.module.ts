import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadService } from './ciudad.service';
import { CiudadResolver } from './ciudad.resolver';
import { CiudadEntity } from './ciudad.entity';
import { CiudadController } from './ciudad.controller';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as sqliteStore from 'cache-manager-sqlite';


@Module({
  imports: [TypeOrmModule.forFeature([CiudadEntity]),
  CacheModule.register({
    store: sqliteStore,
    path: ':memory:',
    options: {
      ttl: 5
    },
  })
],
  providers: [CiudadService, JwtService, UsuarioService, CiudadResolver],
  controllers: [CiudadController],
})
export class CiudadModule {}
