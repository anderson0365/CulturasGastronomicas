import { CacheModule, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from '../usuario/usuario.service';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { CiudadService } from '../ciudad/ciudad.service';
import { PaisEntity } from '../pais/pais.entity';
import { PaisCiudadController } from './pais-ciudad.controller';
import { PaisCiudadService } from './pais-ciudad.service';
import * as sqliteStore from 'cache-manager-sqlite';

@Module({
  imports: [TypeOrmModule.forFeature([PaisEntity, CiudadEntity]), 
  CacheModule.register({
    store: sqliteStore,
    path: ':memory:',
    options: {
      ttl: 5
    },
  })
],
  providers: [PaisCiudadService, CiudadService, JwtService, UsuarioService],
  controllers: [PaisCiudadController],
})
export class PaisCiudadModule {}
