import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RolesGuard } from '../autenticar/guards/roles.guard';
import { JwtAuthGuard } from '../autenticar/guards/jwt-auth.guard';
import { ErroresNegocioInterceptor } from '../compartido/interceptores/errores-negocio.interceptor';
import { PaisDto } from './pais.dto';
import { PaisEntity } from './pais.entity';
import { PaisService } from './pais.service';
import { Roles } from '../compartido/seguridad/decoradores';
import { Role } from '../usuario/usuario';

@UseInterceptors(ErroresNegocioInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('paises')
export class PaisController {
    constructor(private readonly servicioPais: PaisService) {}

    @Roles(Role.ADMIN, Role.LECTOR)
    @Get()
    async obtenerTodos() {
      return await this.servicioPais.obtenerTodos();
    }

    @Roles(Role.ADMIN, Role.LECTOR)
    @Get(':paisId')
    async obtenerUno(@Param('paisId') paisId: string) {
      return await this.servicioPais.obtenerUno(paisId);
    }

    @Roles(Role.ADMIN, Role.ESCRITURA)
    @Post()
    async create(@Body() paisDto: PaisDto) {
      const pais: PaisEntity = plainToInstance(PaisEntity, paisDto);
      return await this.servicioPais.crear(pais);
    }

    @Roles(Role.ADMIN, Role.ESCRITURA)
    @Put(':paisId')
    async update(@Param('paisId') paisId: string, @Body() paisDto: PaisDto) {
      const pais: PaisEntity = plainToInstance(PaisEntity, paisDto);
      return await this.servicioPais.actualizar(paisId, pais);
    }

    @Roles(Role.ADMIN, Role.ELIMINACION)
    @Delete(':paisId')
    @HttpCode(204)
    async eliminar(@Param('paisId') paisId: string) {
      return await this.servicioPais.borrar(paisId);
    }
}
