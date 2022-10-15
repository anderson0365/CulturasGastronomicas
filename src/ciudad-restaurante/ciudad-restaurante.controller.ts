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
import { RolesGuard } from '../autenticar/guards/roles.guard';
import { RestauranteEntity } from 'src/restaurante/restaurante.entity';
import { RestauranteService } from 'src/restaurante/restaurante.service';
import { ErroresNegocioInterceptor } from '../compartido/interceptores/errores-negocio.interceptor';
import { CiudadRestauranteService } from './ciudad-restaurante.service';
import { JwtAuthGuard } from '../autenticar/guards/jwt-auth.guard';
import { Roles } from '../compartido/seguridad/decoradores';
import { Role } from '../usuario/usuario';

@UseInterceptors(ErroresNegocioInterceptor)
@Controller('ciudades')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CiudadRestauranteController {
  constructor(
    private readonly servicioCiudadRestaurante: CiudadRestauranteService,
    private readonly servicioRestaurante: RestauranteService,
  ) {}


  @Roles(Role.ADMIN, Role.ESCRITURA)
  @Post(':ciudadId/restaurantes/:restauranteId')
  async agregarRestaurateCiudad(
    @Param('ciudadId') ciudadId: string,
    @Param('restauranteId') restauranteId: string,
  ) {
    return await this.servicioCiudadRestaurante.agregarRestauranteCiudad(
      ciudadId,
      restauranteId,
    );
  }

  @Roles(Role.ADMIN, Role.LECTOR)
  @Get(':ciudadId/restaurantes/:restauranteId')
  async obtenerRestauranteCiudad(
    @Param('ciudadId') ciudadId: string,
    @Param('restauranteId') restauranteId: string,
  ) {
    return await this.servicioCiudadRestaurante.obtenerRestauranteCiudad(
      ciudadId,
      restauranteId,
    );
  }


  @Roles(Role.ADMIN, Role.LECTOR)
  @Get(':ciudadId/restaurantes')
  async obtenerTodosRestaurantesDeCiudad(
    @Param('ciudadId') ciudadId: string,
  ) {
    return await this.servicioCiudadRestaurante.obtenerTodosRestaurantesDeCiudad(
      ciudadId,
    );
  }


  @Roles(Role.ADMIN, Role.ESCRITURA)
  @Put(':ciudadId/restaurantes')
  async associateArtworksMuseum(
    @Body() restaurantesIds: string[],
    @Param('ciudadId') ciudadId: string,
  ) {
    const restaurantes: RestauranteEntity[] = [];
    for (let i = 0; i < restaurantesIds.length; i++) {
      const restaurante = await this.servicioRestaurante.findOne(restaurantesIds[i]);
      restaurantes.push(restaurante);
    }

    return await this.servicioCiudadRestaurante.asociarRestaurantesCiudad(
      ciudadId,
      restaurantes,
    );
  }


  @Roles(Role.ADMIN, Role.ELIMINACION)
  @Delete(':ciudadId/restaurantes/:restauranteId')
  @HttpCode(204)
  async deleteArtworkMuseum(
    @Param('ciudadId') ciudadId: string,
    @Param('restauranteId') restauranteId: string,
  ) {
    return await this.servicioCiudadRestaurante.eliminarRestauranteCiudad(
      ciudadId,
      restauranteId,
    );
  }
}
