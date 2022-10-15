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
import { JwtAuthGuard } from '../autenticar/guards/jwt-auth.guard';
import { RolesGuard } from '../autenticar/guards/roles.guard';
import { Roles } from '../compartido/seguridad/decoradores';
import { Role } from '../usuario/usuario';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { CiudadService } from '../ciudad/ciudad.service';
import { ErroresNegocioInterceptor } from '../compartido/interceptores/errores-negocio.interceptor';
import { PaisCiudadService } from './pais-ciudad.service';

@Controller('paises')
@UseInterceptors(ErroresNegocioInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaisCiudadController {
  constructor(
    private readonly servicioPaisCiudades: PaisCiudadService,
    private readonly servicioCiudad: CiudadService,
  ) {}

  @Roles(Role.ADMIN, Role.ESCRITURA)
  @Post(':paisId/ciudades/:ciudadId')
  async agregarRecetaCulturaGastronomica(
    @Param('paisId') paisId: string,
    @Param('ciudadId') ciudadId: string,
  ) {
    return await this.servicioPaisCiudades.agregarCiudadPais(paisId, ciudadId);
  }

  @Roles(Role.ADMIN, Role.LECTOR)
  @Get(':paisId/ciudades/:ciudadId')
  async obtenerRecetaCulturaGastronomica(
    @Param('paisId') paisId: string,
    @Param('ciudadId') ciudadId: string,
  ) {
    return await this.servicioPaisCiudades.obtenerCiudadPais(paisId, ciudadId);
  }

  @Roles(Role.ADMIN, Role.LECTOR)
  @Get(':paisId/ciudades')
  async obtenerTodosRecetaesDeCulturaGastronomica(
    @Param('paisId') paisId: string,
  ) {
    return await this.servicioPaisCiudades.obtenerTodasCiudadesPais(paisId);
  }

  @Roles(Role.ADMIN, Role.ESCRITURA)
  @Put(':paisId/ciudades')
  async associateArtworksMuseum(
    @Body() ciudadesIds: string[],
    @Param('paisId') paisId: string,
  ) {
    const ciudades: CiudadEntity[] = [];
    for (let i = 0; i < ciudadesIds.length; i++) {
      const receta = await this.servicioCiudad.findOne(ciudadesIds[i]);
      ciudades.push(receta);
    }

    return await this.servicioPaisCiudades.asociarCiudadesPais(
      paisId,
      ciudades,
    );
  }

  @Roles(Role.ADMIN, Role.ELIMINACION)
  @Delete(':paisId/ciudades/:ciudadId')
  @HttpCode(204)
  async deleteArtworkMuseum(
    @Param('paisId') paisId: string,
    @Param('ciudadId') ciudadId: string,
  ) {
    return await this.servicioPaisCiudades.eliminarCiudadPais(paisId, ciudadId);
  }
}
