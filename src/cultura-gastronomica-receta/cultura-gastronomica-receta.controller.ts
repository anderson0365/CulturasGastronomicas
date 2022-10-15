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
import { RecetaEntity } from '../receta/receta.entity';
import { ErroresNegocioInterceptor } from '../compartido/interceptores/errores-negocio.interceptor';
import { RecetaService } from '../receta/receta.service';
import { CulturaGastronomicaRecetaService } from './cultura-gastronomica-receta.service';
import { JwtAuthGuard } from '../autenticar/guards/jwt-auth.guard';
import { RolesGuard } from '../autenticar/guards/roles.guard';
import { Roles } from '../compartido/seguridad/decoradores';
import { Role } from '../usuario/usuario';
import { Cache } from 'cache-manager';

@UseInterceptors(ErroresNegocioInterceptor)
@Controller('culturasGastronomicas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CulturaGastronomicaRecetaController {
  constructor(
    private readonly servicioCulturaGastronomicaReceta: CulturaGastronomicaRecetaService,
    private readonly servicioReceta: RecetaService,

    @Inject(CACHE_MANAGER)
    private readonly administradorCache: Cache,
  ) {}

  @Post(':culturaId/recetas/:recetaId')
  async agregarRecetaCulturaGastronomica(
    @Param('culturaId') culturaId: string,
    @Param('recetaId') recetaId: string,
  ) {
    return await this.servicioCulturaGastronomicaReceta.agregarRecetaCulturaGastronomica(
      culturaId,
      recetaId,
    );
  }

  @Get(':culturaId/recetas/:recetaId')
  async obtenerRecetaCulturaGastronomica(
    @Param('culturaId') culturaId: string,
    @Param('recetaId') recetaId: string,
  ) {
    return await this.servicioCulturaGastronomicaReceta.obtenerRecetaCulturaGastronomica(
      culturaId,
      recetaId,
    );
  }

  @Get(':culturaId/recetas')
  async obtenerTodosRecetaesDeCulturaGastronomica(
    @Param('culturaId') culturaId: string,
  ) {
    const almacenado: RecetaEntity[] = await this.administradorCache.get<RecetaEntity[]>(culturaId);

    if (!almacenado){
      const recetas: RecetaEntity[] = await this.servicioCulturaGastronomicaReceta.obtenerTodasRecetasDeCulturaGastronomica(
        culturaId,
      );
      await this.administradorCache.set(culturaId, recetas);
      return recetas
    }

    return almacenado
  }

  @Put(':culturaId/recetas')
  async asociarRecetasACulturaGastronomica(
    @Body() recetasIds: string[],
    @Param('culturaId') culturaId: string,
  ) {
    const recetas: RecetaEntity[] = [];
    for (let i = 0; i < recetasIds.length; i++) {
      const receta = await this.servicioReceta.findOne(recetasIds[i]);
      recetas.push(receta);
    }

    return await this.servicioCulturaGastronomicaReceta.asociarRecetasCulturaGastronomica(
      culturaId,
      recetas,
    );
  }

  @Roles(Role.ADMIN, Role.ELIMINACION)
  @Delete(':culturaId/recetas/:recetaId')
  @HttpCode(204)
  async eliminarRecetaDeCulturaGastronomica(
    @Param('culturaId') culturaId: string,
    @Param('recetaId') recetaId: string,
  ) {
    return await this.servicioCulturaGastronomicaReceta.eliminarRecetaCulturaGastronomica(
      culturaId,
      recetaId,
    );
  }
}
