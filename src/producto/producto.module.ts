import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoEntity } from './producto.entity';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { JwtService } from '@nestjs/jwt';
import { ProductoResolver } from './producto.resolver';
import * as sqliteStore from 'cache-manager-sqlite';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoEntity]),
  CacheModule.register({
    store: sqliteStore,
    path: ':memory:',
    options: {
      ttl: 5
    },
  })
  ],
  providers: [ProductoService, JwtService, ProductoResolver],
  controllers: [ProductoController]
})
export class ProductoModule {}
