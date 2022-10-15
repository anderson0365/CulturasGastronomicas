/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, CACHE_MANAGER, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../autenticar/guards/jwt-auth.guard';
import { RolesGuard } from '../autenticar/guards/roles.guard';
import { EstrellaMichelinEntity } from '../estrella-michelin/estrella-michelin.entity';
import { EstrellaMichelinService } from '../estrella-michelin/estrella-michelin.service';

import { ErroresNegocioInterceptor } from '../compartido/interceptores/errores-negocio.interceptor';
import { RestauranteEstrellaMichelinService } from './restaurante-estrella-michelin.service';
import { Role } from '../usuario/usuario';
import { Roles } from '../compartido/seguridad/decoradores';
import { Cache } from 'cache-manager';


@UseInterceptors(ErroresNegocioInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('restaurantes')
export class RestauranteEstrellaMichelinController {
    constructor(private readonly restauranteEstrellaMichelinService: RestauranteEstrellaMichelinService,
        private readonly servicioEstrellaMichelin: EstrellaMichelinService,
        @Inject(CACHE_MANAGER)
        private readonly administradorCache: Cache,){}

    @Roles(Role.ADMIN, Role.ESCRITURA)
    @Post(':restauranteId/estrellas-michelin/:estrellaMichelinId')
    async addEstrellaMichelinRestaurante(@Param('restauranteId') restauranteId: string, @Param('estrellaMichelinId') estrellaMichelinId: string){
        return await this.restauranteEstrellaMichelinService.addEstrellaMichelinRestaurante(restauranteId, estrellaMichelinId);
    }

    @Roles(Role.ADMIN, Role.LECTOR)
    @Get(':restauranteId/estrellas-michelin/:estrellaMichelinId')
    async findEstrellaMichelinByRestauranteIdEstrellaMichelinId(@Param('restauranteId') restauranteId: string, @Param('estrellaMichelinId') estrellaMichelinId: string){
        return await this.restauranteEstrellaMichelinService.findEstrellaMichelinByRestauranteIdEstrellaMichelinId(restauranteId, estrellaMichelinId);
    }

    @Roles(Role.ADMIN, Role.LECTOR)
    @Get(':restauranteId/estrellas-michelin')
    async findEstrellaMichelinsByRestauranteId(@Param('restauranteId') restauranteId: string){
        const almacenado: EstrellaMichelinEntity[] = await this.administradorCache.get<EstrellaMichelinEntity[]>(restauranteId);

        if (!almacenado){
            const estrellas: EstrellaMichelinEntity[] = await this.restauranteEstrellaMichelinService.findEstrellaMichelinsByRestauranteId(restauranteId);
            await this.administradorCache.set(restauranteId, estrellas);
            return estrellas
        }

        return almacenado
    }

    @Roles(Role.ADMIN, Role.ESCRITURA)
    @Put(':restauranteId/estrellas-michelin')
    async associateArtworksMuseum(@Body() estrellasMichelinIds: string[], @Param('restauranteId') restauranteId: string,) {
        const estrellasMichelin: EstrellaMichelinEntity[] = [];
        for (let i = 0; i < estrellasMichelinIds.length; i++) {
          const estrella = await this.servicioEstrellaMichelin.findOne(estrellasMichelinIds[i]);
          estrellasMichelin.push(estrella);
        }
    
        return await this.restauranteEstrellaMichelinService.associateEstrellaMichelinsRestaurante(
          restauranteId,
          estrellasMichelin,
        );
    }

    @Roles(Role.ADMIN, Role.ELIMINACION)
    @Delete(':restauranteId/estrellas-michelin/:estrellaMichelinId')
    @HttpCode(204)
    async deleteEstrellaMichelinRestaurante(@Param('restauranteId') restauranteId: string, @Param('estrellaMichelinId') estrellaMichelinId: string){
       return await this.restauranteEstrellaMichelinService.deleteEstrellaMichelinRestaurante(restauranteId, estrellaMichelinId);
    }
}
