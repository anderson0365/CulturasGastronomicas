import { CACHE_MANAGER, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorNegocio, ExcepcionLogicaNegocio } from '../compartido/errores-negocio';
import { Repository } from 'typeorm';
import { PaisEntity } from './pais.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class PaisService {

    cacheKey: string = "cachePaises";

    constructor(
        @InjectRepository(PaisEntity)
        private readonly paisRepository: Repository<PaisEntity>,
        
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache){}

    async obtenerTodos(): Promise<PaisEntity[]> {
        const cached: PaisEntity[] = await this.cacheManager.get<PaisEntity[]>(this.cacheKey);
      
       if(!cached){
           const paises: PaisEntity[] = await this.paisRepository.find({ });
           await this.cacheManager.set(this.cacheKey, paises);
           return paises;
       }

       return cached;
    }
    
    async obtenerUno(id: string): Promise<PaisEntity> {
        const pais: PaisEntity = await this.paisRepository.findOne({where: {id}, /*relations: ["pais"]*/ } );
        if (!pais)
         throw new ExcepcionLogicaNegocio("El pais no fue encontrado", ErrorNegocio.NO_ENCONTRADO);
  
       return pais;
    }

    async crear(pais: PaisEntity): Promise<PaisEntity> {
        return await this.paisRepository.save(pais);
    }

    async actualizar(id: string, pais: PaisEntity): Promise<PaisEntity> {
        const paisPersistido: PaisEntity = await this.paisRepository.findOne({where:{id}});
        if (!paisPersistido)
          throw new ExcepcionLogicaNegocio("El pais no fue encontrado", ErrorNegocio.NO_ENCONTRADO);
        
        return await this.paisRepository.save({...paisPersistido, ...pais});
    }

    async borrar(id: string) {
        const pais: PaisEntity = await this.paisRepository.findOne({where:{id}});
        if (!pais)
          throw new ExcepcionLogicaNegocio("El pais no fue encontrado", ErrorNegocio.NO_ENCONTRADO);
     
        await this.paisRepository.remove(pais);
    }
}
