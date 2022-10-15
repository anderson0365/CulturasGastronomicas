/* eslint-disable prettier/prettier */
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
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/autenticar/guards/jwt-auth.guard';
import { RolesGuard } from 'src/autenticar/guards/roles.guard';
import { ErroresNegocioInterceptor } from 'src/compartido/interceptores/errores-negocio.interceptor';
import { Roles } from '../compartido/seguridad/decoradores';
import { Role } from '../usuario/usuario';
import { RestauranteDto } from './restaurante.dto';
import { RestauranteEntity } from './restaurante.entity';
import { RestauranteService } from './restaurante.service';
import { Cache } from 'cache-manager';

@Controller('restaurantes')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ErroresNegocioInterceptor)
export class RestauranteController {
  constructor(private readonly restauranteService: RestauranteService,
    @Inject(CACHE_MANAGER)
    private readonly administradorCache: Cache,) {}

  @Roles(Role.ADMIN, Role.LECTOR, Role.LECTOR_UNICO_RECURSO)
  @Get()
  async findAll() {
    const almacenado: RestauranteEntity[] = await this.administradorCache.get<RestauranteEntity[]>('restaurantes');

    if (!almacenado){
      const restaurantes: RestauranteEntity[] = await this.restauranteService.findAll();
      await this.administradorCache.set('restaurantes', restaurantes);
      return restaurantes
    }

    return almacenado
  }

  @Roles(Role.ADMIN, Role.LECTOR, Role.LECTOR_UNICO_RECURSO)
  @Get(':restauranteId')
  async findOne(@Param('restauranteId') restauranteId: string) {
    return await this.restauranteService.findOne(restauranteId);
  }

  @Roles(Role.ADMIN, Role.ESCRITURA)
  @Post()
  async create(@Body() restauranteDto: RestauranteDto) {
    const restaurante: RestauranteEntity = plainToInstance(RestauranteEntity, restauranteDto);
    return await this.restauranteService.create(restaurante);
  }

  @Roles(Role.ADMIN, Role.ESCRITURA)
  @Put(':restauranteId')
  async update(
    @Param('restauranteId') restauranteId: string,
    @Body() restauranteDto: RestauranteDto,
  ) {
    const restaurante: RestauranteEntity = plainToInstance(RestauranteEntity, restauranteDto);
    return await this.restauranteService.update(restauranteId, restaurante);
  }

  @Roles(Role.ADMIN, Role.ELIMINACION)
  @Delete(':restauranteId')
  @HttpCode(204)
  async delete(@Param('restauranteId') restauranteId: string) {
    return await this.restauranteService.delete(restauranteId);
  }
}
