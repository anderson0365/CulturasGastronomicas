import {
  Body,
  CACHE_MANAGER,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductoEntity } from '../producto/producto.entity';
import { ProductoService } from '../producto/producto.service';
import { ErroresNegocioInterceptor } from '../compartido/interceptores/errores-negocio.interceptor';
import { CulturaGastronomicaProductoService } from './cultura-gastronomica-producto.service';
import { JwtAuthGuard } from '../autenticar/guards/jwt-auth.guard';
import { RolesGuard } from '../autenticar/guards/roles.guard';
import { Roles } from '../compartido/seguridad/decoradores';
import { Role } from '../usuario/usuario';
import { Cache } from 'cache-manager';

@UseInterceptors(ErroresNegocioInterceptor)
@Controller('culturasGastronomicas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CulturaGastronomicaProductoController {
  constructor(
    private readonly servicioCulturaGastronomicaProducto: CulturaGastronomicaProductoService,
    private readonly servicioProducto: ProductoService,

    @Inject(CACHE_MANAGER)
    private readonly administradorCache: Cache
  ) {}

  @Roles(Role.ADMIN, Role.ESCRITURA)
  @Post(':culturaId/productos/:productoId')
  async agregarProductoCulturaGastronomica(
    @Param('culturaId') culturaId: string,
    @Param('productoId') productoId: string,
  ) {
    return await this.servicioCulturaGastronomicaProducto.agregarProductoCulturaGastronomica(
      culturaId,
      productoId,
    );
  }

  @Roles(Role.ADMIN, Role.LECTOR)
  @Get(':culturaId/productos/:productoId')
  async obtenerProductoCulturaGastronomica(
    @Param('culturaId') culturaId: string,
    @Param('productoId') productoId: string,
  ) {
    return await this.servicioCulturaGastronomicaProducto.obtenerProductoporCulturaGastronomica(
      culturaId,
      productoId,
    );
  }

  @Roles(Role.ADMIN, Role.LECTOR)
  @Get(':culturaId/productos')
  async obtenerTodosProductosDeCulturaGastronomica(
    @Param('culturaId') culturaId: string,
  ) {
    const almacenado: ProductoEntity[] = await this.administradorCache.get<ProductoEntity[]>(culturaId);

    if (!almacenado){
      const productos: ProductoEntity[] = await this.servicioCulturaGastronomicaProducto.obtenerTodosProductosporCultura(culturaId,);
      await this.administradorCache.set(culturaId, productos);
      return productos
    }

    return almacenado
  }

  @Roles(Role.ADMIN, Role.ESCRITURA)
  @Put(':culturaId/productos')
  async asociarProductosACulturaGastronomica(
    @Body() productosIds: string[],
    @Param('culturaId') culturaId: string,
  ) {
    const productos: ProductoEntity[] = [];
    for (let i = 0; i < productosIds.length; i++) {
      const producto = await this.servicioProducto.obtenerUno(productosIds[i]);
      productos.push(producto);
    }

    return await this.servicioCulturaGastronomicaProducto.asociarProductoCultura(
      culturaId,
      productos,
    );
  }

  @Roles(Role.ADMIN, Role.ELIMINACION)
  @Delete(':culturaId/productos/:productoId')
  @HttpCode(204)
  async eliminarProductoDeCulturaGastronomica(
    @Param('culturaId') culturaId: string,
    @Param('productoId') productoId: string,
  ) {
    return await this.servicioCulturaGastronomicaProducto.eliminarProductoCultura(
      culturaId,
      productoId,
    );
  }
}
