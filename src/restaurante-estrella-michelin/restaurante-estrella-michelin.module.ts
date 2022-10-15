import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstrellaMichelinService } from '../estrella-michelin/estrella-michelin.service';
import { EstrellaMichelinEntity } from '../estrella-michelin/estrella-michelin.entity';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { RestauranteEstrellaMichelinService } from './restaurante-estrella-michelin.service';
import { RestauranteEstrellaMichelinController } from './restaurante-estrella-michelin.controller';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as sqliteStore from 'cache-manager-sqlite';

@Module({
  imports: [
    TypeOrmModule.forFeature([RestauranteEntity, EstrellaMichelinEntity]),
    CacheModule.register({
      store: sqliteStore,
      path: ':memory:',
      options: {
        ttl: 15,
      },
    }),
  ],
  providers: [
    RestauranteEstrellaMichelinService,
    EstrellaMichelinService,
    JwtService,
    UsuarioService,
  ],
  controllers: [RestauranteEstrellaMichelinController],
})
export class RestauranteEstrellaMichelinModule {}
