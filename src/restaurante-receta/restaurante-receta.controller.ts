/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, CACHE_MANAGER, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RecetaDto } from '../receta/receta.dto';
import { RecetaEntity } from '../receta/receta.entity';
import { RecetaService } from '../receta/receta.service';
import { ErroresNegocioInterceptor } from '../compartido/interceptores/errores-negocio.interceptor';
import { RestauranteRecetaService } from './restaurante-receta.service';
import { JwtAuthGuard } from '../autenticar/guards/jwt-auth.guard';
import { RolesGuard } from '../autenticar/guards/roles.guard';
import { Role } from '../usuario/usuario';
import { Roles } from '../compartido/seguridad/decoradores';
import { Cache } from 'cache-manager';

@UseInterceptors(ErroresNegocioInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('restaurantes')
export class RestauranteRecetaController {
    constructor(private readonly restauranteRecetaService: RestauranteRecetaService,
        private readonly servicioReceta: RecetaService,
        @Inject(CACHE_MANAGER)
        private readonly administradorCache: Cache,){}

    @Roles(Role.ADMIN, Role.ESCRITURA)
    @Post(':restauranteId/recetas/:recetaId')
    async addRecetaRestaurante(@Param('restauranteId') restauranteId: string, @Param('recetaId') recetaId: string){
        return await this.restauranteRecetaService.agregarRecetaRestaurante(restauranteId, recetaId);
    }

    @Roles(Role.ADMIN, Role.LECTOR)
    @Get(':restauranteId/recetas/:recetaId')
    async findRecetaByRestauranteIdRecetaId(@Param('restauranteId') restauranteId: string, @Param('recetaId') recetaId: string){
        return await this.restauranteRecetaService.obtenerRecetaRestaurante(restauranteId, recetaId);
    }

    @Roles(Role.ADMIN, Role.LECTOR)
    @Get(':restauranteId/recetas')
    async findRecetasByRestauranteId(@Param('restauranteId') restauranteId: string){
        const almacenado: RecetaEntity[] = await this.administradorCache.get<RecetaEntity[]>(restauranteId);

        if (!almacenado){
            const recetas: RecetaEntity[] = await this.restauranteRecetaService.obtenerTodasRecetasDeRestaurante(restauranteId);
            await this.administradorCache.set(restauranteId, recetas);
            return recetas
        }

        return almacenado
    }

    @Roles(Role.ADMIN, Role.ESCRITURA)
    @Put(':restauranteId/recetas')
    async associateArtworksMuseum(@Body() recetasIds: string[], @Param('restauranteId') restauranteId: string,) {
        const recetas: RecetaEntity[] = [];
        for (let i = 0; i < recetasIds.length; i++) {
          const pais = await this.servicioReceta.findOne(recetasIds[i]);
          recetas.push(pais);
        }
    
        return await this.restauranteRecetaService.asociarRecetasRestaurante(
          restauranteId,
          recetas,
        );
    }

    @Roles(Role.ADMIN, Role.ELIMINACION)
    @Delete(':restauranteId/recetas/:recetaId')
    @HttpCode(204)
    async deleteRecetaRestaurante(@Param('restauranteId') restauranteId: string, @Param('recetaId') recetaId: string){
       return await this.restauranteRecetaService.eliminarRecetaRestaurante(restauranteId, recetaId);
    }
}
