import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { PaisDto } from './pais.dto';
import { PaisEntity } from './pais.entity';
import { PaisService } from './pais.service';

@Resolver()
export class PaisResolver {
    constructor(private paisService: PaisService){}

    @Query(() => [PaisEntity])
    paises(): Promise<PaisEntity[]> {
        return this.paisService.obtenerTodos();
    }

    @Query(() => PaisEntity)
    pais(@Args('id') id: string): Promise<PaisEntity> {
        return this.paisService.obtenerUno(id);
    }

    @Mutation(() => PaisEntity)
   crearPais(@Args('pais') paisDto: PaisDto): Promise<PaisEntity> {
       const pais = plainToInstance(PaisEntity, paisDto);
       return this.paisService.crear(pais);
   }

   @Mutation(() => PaisEntity)
    actualizarPais(@Args('id') id: string, @Args('pais') paisDto: PaisDto): Promise<PaisEntity> {
        const receta = plainToInstance(PaisEntity, paisDto);
        return this.paisService.actualizar(id, receta);
    }

    @Mutation(() => String)
    borrarPais(@Args('id') id: string) {
        this.paisService.borrar(id);
        return id;
    } 
}
