import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaEntity } from '../receta/receta.entity';
import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { CulturaGastronomicaRecetaController } from './cultura-gastronomica-receta.controller';
import { CulturaGastronomicaRecetaService } from './cultura-gastronomica-receta.service';
import { RecetaService } from '../receta/receta.service';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as sqliteStore from 'cache-manager-sqlite';

@Module({
  imports: [
    TypeOrmModule.forFeature([CulturaGastronomicaEntity, RecetaEntity]),
    CacheModule.register({
      store: sqliteStore,
      path: ':memory:',
      options: {
        ttl: 15,
      },
    }),
  ],
  providers: [
    CulturaGastronomicaRecetaService,
    RecetaService,
    JwtService,
    UsuarioService,
  ],
  controllers: [CulturaGastronomicaRecetaController],
})
export class CulturaGastronomicaRecetaModule {}
