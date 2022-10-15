import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorNegocio, ExcepcionLogicaNegocio } from '../compartido/errores-negocio';
import { Repository } from 'typeorm';
import { RecetaEntity } from './receta.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class RecetaService {

    cacheKey: string = "cacheRecetas";

    constructor(
        @InjectRepository(RecetaEntity)
        private readonly recetaRepository: Repository<RecetaEntity>,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ){}

    async create(receta: RecetaEntity): Promise<RecetaEntity> {
        return await this.recetaRepository.save(receta);
    }

    async findAll(): Promise<RecetaEntity[]> {
        const cached: RecetaEntity[] = await this.cacheManager.get<RecetaEntity[]>(this.cacheKey);
      
       if(!cached){
           const recetas: RecetaEntity[] = await this.recetaRepository.find({relations: ["culturaGastronomica"]});
           await this.cacheManager.set(this.cacheKey, recetas);
           return recetas;
       }

       return cached;


    }

    async findOne(id: string): Promise<RecetaEntity> {
        const receta: RecetaEntity = await this.recetaRepository.findOne({where:{id}, relations: ["culturaGastronomica"]});
        if (!receta)
          throw new ExcepcionLogicaNegocio("La receta con el solicitado id no existe", ErrorNegocio.NO_ENCONTRADO);
    
        return receta;
    }


    async update(id: string, receta: RecetaEntity): Promise<RecetaEntity> {
        const persistedReceta: RecetaEntity = await this.recetaRepository.findOne({where:{id}});
        if (!persistedReceta)
          throw new ExcepcionLogicaNegocio("La receta con el id solicitado no existe", ErrorNegocio.NO_ENCONTRADO);
        
        return await this.recetaRepository.save({...persistedReceta, ...receta});
    }

    async delete(id: string) {
        const receta: RecetaEntity = await this.recetaRepository.findOne({where:{id}});
        if (!receta)
          throw new ExcepcionLogicaNegocio("La receta con el id solicitado no existe", ErrorNegocio.NO_ENCONTRADO);
      
        await this.recetaRepository.remove(receta);
    }

}
