import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaisService } from '../pais/pais.service';
import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { CulturaGastronomicaPaisController } from './cultura-gastronomica-pais.controller';
import { PaisEntity } from '../pais/pais.entity';
import { CulturaGastronomicaPaisService } from './cultura-gastronomica-pais.service';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as sqliteStore from 'cache-manager-sqlite';

@Module({
  imports: [
    TypeOrmModule.forFeature([CulturaGastronomicaEntity, PaisEntity]),
    CacheModule.register({
      store: sqliteStore,
      path: ':memory:',
      options: {
        ttl: 15,
      },
    }),
  ],
  providers: [
    CulturaGastronomicaPaisService,
    PaisService,
    JwtService,
    UsuarioService,
  ],
  controllers: [CulturaGastronomicaPaisController],
})
export class CulturaGastronomicaPaisModule {}
