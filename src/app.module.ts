import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecetaModule } from './receta/receta.module';
import { RecetaEntity } from './receta/receta.entity';
import { CiudadModule } from './ciudad/ciudad.module';
import { CiudadEntity } from './ciudad/ciudad.entity';
import { CulturaGastronomicaEntity } from './cultura-gastronomica/cultura-gastronomica.entity';
import { CulturaGastronomicaModule } from './cultura-gastronomica/cultura-gastronomica.module';
import { PaisModule } from './pais/pais.module';
import { PaisEntity } from './pais/pais.entity';
import { ProductoModule } from './producto/producto.module';
import { ProductoEntity } from './producto/producto.entity';
import { RestauranteModule } from './restaurante/restaurante.module';
import { EstrellaMichelinModule } from './estrella-michelin/estrella-michelin.module';
import { EstrellaMichelinEntity } from './estrella-michelin/estrella-michelin.entity';
import { RestauranteEntity } from './restaurante/restaurante.entity';
import { CulturaGastronomicaRecetaModule } from './cultura-gastronomica-receta/cultura-gastronomica-receta.module';
import { CulturaGastronomicaProductoModule } from './cultura-gastronomica-producto/cultura-gastronomica-producto.module';
import { RestauranteRecetaModule } from './restaurante-receta/restaurante-receta.module';
import { CulturaGastronomicaPaisModule } from './cultura-gastronomica-pais/cultura-gastronomica-pais.module';
import { PaisCulturaGastronomicaModule } from './pais-cultura-gastronomica/pais-cultura-gastronomica.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AutenticarModule } from './autenticar/autenticar.module';
import { RestauranteEstrellaMichelinModule } from './restaurante-estrella-michelin/restaurante-estrella-michelin.module';
import { CiudadRestauranteModule } from './ciudad-restaurante/ciudad-restaurante.module';
import { PaisCiudadModule } from './pais-ciudad/pais-ciudad.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    CulturaGastronomicaModule,
    RecetaModule,
    CiudadModule,
    ProductoModule,
    PaisModule,
    RestauranteModule,
    EstrellaMichelinModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'gastronomia',
      entities: [
        CulturaGastronomicaEntity,
        RecetaEntity,
        CiudadEntity,
        ProductoEntity,
        PaisEntity,
        EstrellaMichelinEntity,
        RestauranteEntity,
      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver
    }),
    CulturaGastronomicaRecetaModule,
    CulturaGastronomicaPaisModule,
    PaisCulturaGastronomicaModule,
    CulturaGastronomicaProductoModule,
    CiudadRestauranteModule,
    RestauranteRecetaModule,
    UsuarioModule,
    AutenticarModule,
    PaisCiudadModule,
    RestauranteEstrellaMichelinModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
