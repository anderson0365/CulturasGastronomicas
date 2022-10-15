import { CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaEntity } from '../../receta/receta.entity';
import { CiudadEntity } from '../../ciudad/ciudad.entity';
import { CulturaGastronomicaEntity } from '../../cultura-gastronomica/cultura-gastronomica.entity';
import { RestauranteEntity } from '../../restaurante/restaurante.entity';
import { EstrellaMichelinEntity } from '../../estrella-michelin/estrella-michelin.entity';
import { PaisEntity } from '../../pais/pais.entity';
import { ProductoEntity } from '../../producto/producto.entity';
import * as sqliteStore from 'cache-manager-sqlite';


export const TypeOrmConfiguracionPruebas = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [CulturaGastronomicaEntity,RecetaEntity,CiudadEntity,RestauranteEntity,EstrellaMichelinEntity,PaisEntity,ProductoEntity],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([CulturaGastronomicaEntity,RecetaEntity,CiudadEntity,PaisEntity,ProductoEntity,RestauranteEntity,EstrellaMichelinEntity]),
  CacheModule.register({
    store: sqliteStore,
    path: ':memory:',
    options: {
      ttl: 5
    },
  })

];
