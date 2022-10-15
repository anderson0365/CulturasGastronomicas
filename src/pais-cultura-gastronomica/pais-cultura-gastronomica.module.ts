import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturaGastronomicaService } from '../cultura-gastronomica/cultura-gastronomica.service';
import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { PaisEntity } from '../pais/pais.entity';
import { PaisService } from '../pais/pais.service';
import { PaisCulturaGastronomicaController } from './pais-cultura-gastronomica.controller';
import { PaisCulturaGastronomicaService } from './pais-cultura-gastronomica.service';
import { JwtService } from '@nestjs/jwt';
import * as sqliteStore from 'cache-manager-sqlite';

@Module({
  imports: [TypeOrmModule.forFeature([PaisEntity, CulturaGastronomicaEntity]),
  CacheModule.register({
    store: sqliteStore,
    path: ':memory:',
    options: {
      ttl: 5
    },
  })],
  providers: [PaisCulturaGastronomicaService, CulturaGastronomicaService, JwtService],
  controllers: [PaisCulturaGastronomicaController]
})
export class PaisCulturaGastronomicaModule {}
