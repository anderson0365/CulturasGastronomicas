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
import { JwtAuthGuard } from '../autenticar/guards/jwt-auth.guard';
import { Roles } from '../compartido/seguridad/decoradores';
import { ErroresNegocioInterceptor } from '../compartido/interceptores/errores-negocio.interceptor';
import { CulturaGastronomicaDto } from './cultura-gastronomica.dto';
import { CulturaGastronomicaEntity } from './cultura-gastronomica.entity';
import { CulturaGastronomicaService } from './cultura-gastronomica.service';
import { Role } from '../usuario/usuario';
import { RolesGuard } from 'src/autenticar/guards/roles.guard';
import { Cache } from 'cache-manager';

@UseInterceptors(ErroresNegocioInterceptor)
@Controller('culturasGastronomicas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CulturaGastronomicaController {
  constructor(
    private readonly servicioCulturaGastronomica: CulturaGastronomicaService,
    @Inject(CACHE_MANAGER)
    private readonly administradorCache: Cache,
  ) {}

  @Roles(Role.ADMIN, Role.LECTOR, Role.LECTOR_UNICO_RECURSO)
  @Get()
  async obtenerTodos() { 
    const almacenado: CulturaGastronomicaEntity[] = await this.administradorCache.get<CulturaGastronomicaEntity[]>('culturas');

    if (!almacenado){
      const culturas: CulturaGastronomicaEntity[] = await this.servicioCulturaGastronomica.obtenerTodos();
      await this.administradorCache.set('culturas', culturas);
      return culturas
    }

    return almacenado
  }

  @Roles(Role.ADMIN, Role.LECTOR, Role.LECTOR_UNICO_RECURSO)
  @Get(':culturaId')
  async obtenerUno(@Param('culturaId') culturaId: string) {
    return await this.servicioCulturaGastronomica.obtenerUno(culturaId);
  }

  @Roles(Role.ADMIN, Role.ESCRITURA)
  @Post()
  async crear(@Body() culturaDto: CulturaGastronomicaDto) {
    const cultura: CulturaGastronomicaEntity = plainToInstance(
      CulturaGastronomicaEntity,
      culturaDto,
    );
    return await this.servicioCulturaGastronomica.crear(cultura);
  }

  @Roles(Role.ADMIN, Role.ESCRITURA)
  @Put(':culturaId')
  async actualizar(
    @Param('culturaId') culturaId: string,
    @Body() culturaDto: CulturaGastronomicaDto,
  ) {
    const cultura: CulturaGastronomicaEntity = plainToInstance(
      CulturaGastronomicaEntity,
      culturaDto,
    );
    return await this.servicioCulturaGastronomica.actualizar(
      culturaId,
      cultura,
    );
  }

  @Roles(Role.ADMIN, Role.ELIMINACION)
  @Delete(':culturaId')
  @HttpCode(204)
  async eliminar(@Param('culturaId') culturaId: string) {
    return await this.servicioCulturaGastronomica.eliminar(culturaId);
  }
}
