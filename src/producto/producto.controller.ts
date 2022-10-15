import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RolesGuard } from '../autenticar/guards/roles.guard';
import { JwtAuthGuard } from '../autenticar/guards/jwt-auth.guard';
import { ErroresNegocioInterceptor } from '../compartido/interceptores/errores-negocio.interceptor';
import { ProductoDto } from './producto.dto';
import { ProductoEntity } from './producto.entity';
import { ProductoService } from './producto.service';
import { Roles } from '../compartido/seguridad/decoradores';
import { Role } from '../usuario/usuario';

@UseInterceptors(ErroresNegocioInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('productos')
export class ProductoController {
  constructor(private readonly servicioProductos: ProductoService) {}

  @Roles(Role.ADMIN, Role.LECTOR, Role.LECTOR_UNICO_RECURSO)
  @Get()
  async obtenerTodos() {
    return await this.servicioProductos.obtenerTodos();
  }

  @Roles(Role.ADMIN, Role.LECTOR, Role.LECTOR_UNICO_RECURSO)
  @Get(':productoId')
  async obtenerUno(@Param('productoId') productoId: string) {
    return await this.servicioProductos.obtenerUno(productoId);
  }

  @Roles(Role.ADMIN, Role.ESCRITURA)
  @Post()
  async crear(@Body() productoDto: ProductoDto) {
    const producto: ProductoEntity = plainToInstance(
      ProductoEntity,
      productoDto,
    );
    return await this.servicioProductos.crear(producto);
  }

  @Roles(Role.ADMIN, Role.ESCRITURA)
  @Put(':productoId')
  async actualizar(
    @Param('productoId') productoId: string,
    @Body() productoDto: ProductoDto,
  ) {
    const producto: ProductoEntity = plainToInstance(
      ProductoEntity,
      productoDto,
    );
    return await this.servicioProductos.actualizar(productoId, producto);
  }

  @Roles(Role.ADMIN, Role.ELIMINACION)
  @Delete(':productoId')
  @HttpCode(204)
  async eliminar(@Param('productoId') productoId: string) {
    return await this.servicioProductos.borrar(productoId);
  }
}
