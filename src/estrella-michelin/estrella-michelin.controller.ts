/* eslint-disable prettier/prettier */
import { Body, CACHE_MANAGER, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Role } from '../usuario/usuario'
import { JwtAuthGuard } from '../autenticar/guards/jwt-auth.guard';
import { RolesGuard } from '../autenticar/guards/roles.guard';
import { ErroresNegocioInterceptor } from '../compartido/interceptores/errores-negocio.interceptor';
import { EstrellaMichelinDto } from './estrella-michelin.dto';
import { EstrellaMichelinEntity } from './estrella-michelin.entity';
import { EstrellaMichelinService } from './estrella-michelin.service';
import { Roles } from '../compartido/seguridad/decoradores';
import { Cache } from 'cache-manager';

@UseInterceptors(ErroresNegocioInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('estrellas-michelin')
export class EstrellaMichelinController {
    constructor(private readonly estrellaMichelinService: EstrellaMichelinService,
        @Inject(CACHE_MANAGER)
        private readonly administradorCache: Cache,) {}

    @Roles(Role.ADMIN, Role.LECTOR, Role.LECTOR_UNICO_RECURSO)
    @Get()
    async findAll() {
        const almacenado: EstrellaMichelinEntity[] = await this.administradorCache.get<EstrellaMichelinEntity[]>('estrellas-michelin');

        if (!almacenado){
        const estrellas: EstrellaMichelinEntity[] = await this.estrellaMichelinService.findAll();
        await this.administradorCache.set('estrellas-michelin', estrellas);
        return estrellas
        }

        return almacenado
    }

    @Roles(Role.ADMIN, Role.LECTOR, Role.LECTOR_UNICO_RECURSO)
    @Get(':estrellaMichelinId')
    async findOne(@Param('estrellaMichelinId') estrellaMichelinId: string) {
        return await this.estrellaMichelinService.findOne(estrellaMichelinId);
    }

    @Roles(Role.ADMIN, Role.ESCRITURA)
    @Post()
    async create(@Body() estrellaMichelinDto: EstrellaMichelinDto) {
        const estrella: EstrellaMichelinEntity = plainToInstance(EstrellaMichelinEntity, estrellaMichelinDto);
        return await this.estrellaMichelinService.create(estrella);
    }

    @Roles(Role.ADMIN, Role.ESCRITURA)
    @Put(':estrellaMichelinId')
    async update(@Param('estrellaMichelinId')  estrellaMichelinId: string, @Body() estrellaMichelinDto: EstrellaMichelinDto) {
        const estrella: EstrellaMichelinEntity = plainToInstance(EstrellaMichelinEntity, estrellaMichelinDto);
        return await this.estrellaMichelinService.update(estrellaMichelinId, estrella);
    }

    @Roles(Role.ADMIN, Role.ELIMINACION)
    @Delete(':estrellaMichelinId')
    @HttpCode(204)
    async delete(@Param('estrellaMichelinId') estrellaMichelinId: string) {
        return await this.estrellaMichelinService.delete(estrellaMichelinId); 
    }
}
