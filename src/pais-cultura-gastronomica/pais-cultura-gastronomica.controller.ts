import { Controller, UseInterceptors, UseGuards, Post, Param, Get, Put, Body, Delete, HttpCode } from '@nestjs/common';
import { ErroresNegocioInterceptor } from '../compartido/interceptores/errores-negocio.interceptor';
import { PaisCulturaGastronomicaService } from './pais-cultura-gastronomica.service';
import { CulturaGastronomicaService } from '../cultura-gastronomica/cultura-gastronomica.service';
import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { JwtAuthGuard } from '../autenticar/guards/jwt-auth.guard';
import { RolesGuard } from '../autenticar/guards/roles.guard';
import { Roles } from '../compartido/seguridad/decoradores';
import { Role } from '../usuario/usuario';

@Controller('paises')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ErroresNegocioInterceptor) 
export class PaisCulturaGastronomicaController {
    constructor(
        private readonly servicioPaisCulturaGastronomica: PaisCulturaGastronomicaService,
        private readonly servicioCulturaGastronomica: CulturaGastronomicaService,
    ){}

    @Roles(Role.ADMIN, Role.ESCRITURA)
    @Post(':paisId/culturasGastronomicas/:culturaId')
   async agregarCulturaGastronomicaPais(
        @Param('paisId') paisId: string, 
        @Param('culturaId') culturaId: string
    ){
       return await this.servicioPaisCulturaGastronomica.agregarCulturaGastronomicaPais(paisId, culturaId);
   }

   @Roles(Role.ADMIN, Role.LECTOR)
   @Get(':paisId/culturasGastronomicas/:culturaId')
   async obtenerCulturaGastronomicaPais(
        @Param('paisId') paisId: string, 
        @Param('culturaId') culturaId: string
    ){
       return await this.servicioPaisCulturaGastronomica.obtenerCulturaGastronomicaPais(paisId, culturaId);
   }

   @Roles(Role.ADMIN, Role.LECTOR)
   @Get(':paisId/culturasGastronomicas')
   async obtenerTodasRecetasDeCulturaGastronomica(
        @Param('paisId') paisId: string,
    ){
       return await this.servicioPaisCulturaGastronomica.obtenerTodasRecetasDeCulturaGastronomica(paisId);
   }

   @Roles(Role.ADMIN, Role.ESCRITURA)
   @Put(':paisId/culturasGastronomicas')
   async asociarCulturaGastronomicaPais(
        @Body() culturasIds: string[],
        @Param('paisId') paisId: string,
    ){
        const culturas: CulturaGastronomicaEntity[] = [];
        for (let i = 0; i < culturasIds.length; i++) {
            const cultura = await this.servicioCulturaGastronomica.obtenerUno(culturasIds[i]);
            culturas.push(cultura);
        }
       return await this.servicioPaisCulturaGastronomica.asociarCulturaGastronomicaPais(paisId, culturas);
   }

   @Roles(Role.ADMIN, Role.ELIMINACION)
   @Delete(':paisId/culturasGastronomicas/:culturaId')
   @HttpCode(204)
   async eliminarCulturaGastronomicaPais(
        @Param('paisId') paisId: string, 
        @Param('culturaId') culturaId: string
    ){
       return await this.servicioPaisCulturaGastronomica.eliminarCulturaGastronomicaPais(paisId, culturaId);
   }

}
