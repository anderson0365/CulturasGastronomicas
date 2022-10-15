import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorNegocio, ExcepcionLogicaNegocio } from '../compartido/errores-negocio';
import { CiudadEntity } from './ciudad.entity';
import { Cache } from 'cache-manager';



@Injectable()
export class CiudadService {

    cacheKey: string = "cacheCiudades";

    constructor(
        @InjectRepository(CiudadEntity)
        private readonly ciudadRepository: Repository<CiudadEntity>,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ){}

    async create(ciudad: CiudadEntity): Promise<CiudadEntity> {
        return await this.ciudadRepository.save(ciudad);
    }

    async findAll(): Promise<CiudadEntity[]> {
        const cached: CiudadEntity[] = await this.cacheManager.get<CiudadEntity[]>(this.cacheKey);
      
        if(!cached){
            const ciudades: CiudadEntity[] = await this.ciudadRepository.find();
            await this.cacheManager.set(this.cacheKey, ciudades);
            return ciudades;
        }
 
        return cached;
 
    }

    async findOne(id: string): Promise<CiudadEntity> {
        const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where:{id}});
        if (!ciudad)
          throw new ExcepcionLogicaNegocio("La ciudad con el solicitado id no existe", ErrorNegocio.NO_ENCONTRADO);
    
        return ciudad;
    }


    async update(id: string, ciudad: CiudadEntity): Promise<CiudadEntity> {
        const persistedCiudad: CiudadEntity = await this.ciudadRepository.findOne({where:{id}});
        if (!persistedCiudad)
          throw new ExcepcionLogicaNegocio("La ciudad con el id solicitado no existe", ErrorNegocio.NO_ENCONTRADO);
        
        return await this.ciudadRepository.save({...persistedCiudad, ...ciudad});
    }

    async delete(id: string) {
        const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where:{id}});
        if (!ciudad)
          throw new ExcepcionLogicaNegocio("La ciudad con el id solicitado no existe", ErrorNegocio.NO_ENCONTRADO);
      
        await this.ciudadRepository.remove(ciudad);
    }


}