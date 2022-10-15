import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaService } from './receta.service';
import { RecetaEntity } from './receta.entity';
import { RecetaResolver } from './receta.resolver';
import { RecetaController } from './receta.controller';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as sqliteStore from 'cache-manager-sqlite';


@Module({
  imports: [TypeOrmModule.forFeature([RecetaEntity]),
  CacheModule.register({
    store: sqliteStore,
    path: ':memory:',
    options: {
      ttl: 5
    },
  })
],
  providers: [RecetaService, JwtService, UsuarioService, RecetaResolver],
  controllers: [RecetaController],
})
export class RecetaModule {}
