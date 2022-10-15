import { CacheModule, Module } from '@nestjs/common';
import * as sqliteStore from 'cache-manager-sqlite';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoEntity } from '../producto/producto.entity';
import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { CulturaGastronomicaProductoController } from './cultura-gastronomica-producto.controller';
import { CulturaGastronomicaProductoService } from './cultura-gastronomica-producto.service';
import { ProductoService } from '../producto/producto.service';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([CulturaGastronomicaEntity, ProductoEntity]),
    CacheModule.register(
      {
        store: sqliteStore,
        path: ':memory:',
        options: {
          ttl: 15
        },
      }
    ),
  ],
  providers: [
    CulturaGastronomicaProductoService,
    ProductoService,
    JwtService,
    UsuarioService,
  ],
  controllers: [CulturaGastronomicaProductoController],
})
export class CulturaGastronomicaProductoModule {}
