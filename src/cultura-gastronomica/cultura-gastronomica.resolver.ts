import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { CulturaGastronomicaDto } from './cultura-gastronomica.dto';
import { CulturaGastronomicaEntity } from './cultura-gastronomica.entity';
import { CulturaGastronomicaService } from './cultura-gastronomica.service';

@Resolver()
export class CulturaGastronomicaResolver {
    constructor(private culturaGastronomicaService: CulturaGastronomicaService) {}

    @Query(() => [CulturaGastronomicaEntity])
    culturasGastronomicas(): Promise<CulturaGastronomicaEntity[]> {
        return this.culturaGastronomicaService.obtenerTodos();
    }

    @Query(() => CulturaGastronomicaEntity)
    culturaGastronomica(@Args('id') id: string): Promise<CulturaGastronomicaEntity> {
        return this.culturaGastronomicaService.obtenerUno(id);
    }

    @Mutation(() => CulturaGastronomicaEntity)
    crearCulturaGastronomica(@Args('cultura') culturaDto: CulturaGastronomicaDto): Promise<CulturaGastronomicaEntity> {
        const culturaGastronomica = plainToInstance(CulturaGastronomicaEntity, culturaDto);
        return this.culturaGastronomicaService.crear(culturaGastronomica);
    }
 
    @Mutation(() => CulturaGastronomicaEntity)
    actualizarCulturaGastronomica(@Args('id') id: string, @Args('cultura') culturaDto: CulturaGastronomicaDto): Promise<CulturaGastronomicaEntity> {
        const culturaGastronomica = plainToInstance(CulturaGastronomicaEntity, culturaDto);
        return this.culturaGastronomicaService.actualizar(id, culturaGastronomica);
    }
 
    @Mutation(() => String)
    eliminarCulturaGastronomica(@Args('id') id: string) {
        this.culturaGastronomicaService.eliminar(id);
        return id;
    }
}
