import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstrellaMichelinEntity } from './estrella-michelin.entity';
import { EstrellaMichelinService } from './estrella-michelin.service';
import { EstrellaMichelinController } from './estrella-michelin.controller';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { EstrellaMichelinResolver } from './estrella-michelin.resolver';
import * as sqliteStore from 'cache-manager-sqlite';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstrellaMichelinEntity]),
    CacheModule.register({
      store: sqliteStore,
      path: ':memory:',
      options: {
        ttl: 15,
      },
    }),
  ],
  providers: [EstrellaMichelinService, JwtService, UsuarioService, EstrellaMichelinResolver],
  controllers: [EstrellaMichelinController],
})
export class EstrellaMichelinModule {}
