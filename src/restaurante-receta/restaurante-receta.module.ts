import { CacheModule, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from '../usuario/usuario.service';
import { RecetaEntity } from '../receta/receta.entity';
import { RecetaService } from '../receta/receta.service';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { RestauranteRecetaController } from './restaurante-receta.controller';
import { RestauranteRecetaService } from './restaurante-receta.service';
import * as sqliteStore from 'cache-manager-sqlite';

@Module({
  imports: [
    TypeOrmModule.forFeature([RestauranteEntity, RecetaEntity]),
    CacheModule.register({
      store: sqliteStore,
      path: ':memory:',
      options: {
        ttl: 15,
      },
    }),
  ],
  providers: [
    RestauranteRecetaService,
    RecetaService,
    JwtService,
    UsuarioService,
  ],
  controllers: [RestauranteRecetaController],
})
export class RestauranteRecetaModule {}
