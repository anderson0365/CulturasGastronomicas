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
import { RolesGuard } from '../autenticar/guards/roles.guard';
import { PaisEntity } from '../pais/pais.entity';
import { PaisService } from '../pais/pais.service';
import { ErroresNegocioInterceptor } from '../compartido/interceptores/errores-negocio.interceptor';
import { CulturaGastronomicaPaisService } from './cultura-gastronomica-pais.service';
import { JwtAuthGuard } from '../autenticar/guards/jwt-auth.guard';
import { Roles } from '../compartido/seguridad/decoradores';
import { Role } from '../usuario/usuario';
import { Cache } from 'cache-manager';

@UseInterceptors(ErroresNegocioInterceptor)
@Controller('culturasGastronomicas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CulturaGastronomicaPaisController {
  constructor(
    private readonly servicioCulturaGastronomicaPais: CulturaGastronomicaPaisService,
    private readonly servicioPais: PaisService,

    @Inject(CACHE_MANAGER)
    private readonly administradorCache: Cache,
  ) {}

  @Roles(Role.ADMIN, Role.ESCRITURA)
  @Post(':culturaId/paises/:paisId')
  async agregarPaisCulturaGastronomica(
    @Param('culturaId') culturaId: string,
    @Param('paisId') paisId: string,
  ) {
    return await this.servicioCulturaGastronomicaPais.agregarPaisCulturaGastronomica(
      culturaId,
      paisId,
    );
  }

  @Roles(Role.ADMIN, Role.LECTOR)
  @Get(':culturaId/paises/:paisId')
  async obtenerPaisCulturaGastronomica(
    @Param('culturaId') culturaId: string,
    @Param('paisId') paisId: string,
  ) {
    return await this.servicioCulturaGastronomicaPais.obtenerPaisCulturaGastronomica(
      culturaId,
      paisId,
    );
  }

  @Roles(Role.ADMIN, Role.LECTOR)
  @Get(':culturaId/paises')
  async obtenerTodosPaisesDeCulturaGastronomica(
    @Param('culturaId') culturaId: string,
  ) {
    const almacenado: PaisEntity[] = await this.administradorCache.get<PaisEntity[]>(culturaId);

    if (!almacenado){
      const paises: PaisEntity[] = await this.servicioCulturaGastronomicaPais.obtenerTodosPaisesDeCulturaGastronomica(
        culturaId,
      );
      await this.administradorCache.set(culturaId, paises);
      return paises
    }

    return almacenado
  }

  @Roles(Role.ADMIN, Role.ESCRITURA)
  @Put(':culturaId/paises')
  async asociarPaisesACulturaGastronomica(
    @Body() paisesIds: string[],
    @Param('culturaId') culturaId: string,
  ) {
    const paises: PaisEntity[] = [];
    for (let i = 0; i < paisesIds.length; i++) {
      const pais = await this.servicioPais.obtenerUno(paisesIds[i]);
      paises.push(pais);
    }

    return await this.servicioCulturaGastronomicaPais.asociarPaisesCulturaGastronomica(
      culturaId,
      paises,
    );
  }

  @Roles(Role.ADMIN, Role.ELIMINACION)
  @Delete(':culturaId/paises/:paisId')
  @HttpCode(204)
  async eliminarPaisCulturaGatronomica (
    @Param('culturaId') culturaId: string,
    @Param('paisId') paisId: string,
  ) {
    return await this.servicioCulturaGastronomicaPais.eliminarPaisCulturaGastronomica(
      culturaId,
      paisId,
    );
  }
}
