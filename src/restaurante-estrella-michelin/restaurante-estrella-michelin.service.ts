/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { EstrellaMichelinEntity } from '../estrella-michelin/estrella-michelin.entity';
import { ErrorNegocio, ExcepcionLogicaNegocio } from '../compartido/errores-negocio';

@Injectable()
export class RestauranteEstrellaMichelinService {
    constructor(
        @InjectRepository(RestauranteEntity)
        private readonly restauranteRepository: Repository<RestauranteEntity>,
    
        @InjectRepository(EstrellaMichelinEntity)
        private readonly estrellaMichelinRepository: Repository<EstrellaMichelinEntity>
    ) {}

    async addEstrellaMichelinRestaurante(restauranteId: string, estrellaMichelinId: string): Promise<RestauranteEntity> {
        const estrellaMichelin: EstrellaMichelinEntity = await this.estrellaMichelinRepository.findOne({where: {id: estrellaMichelinId}});
        if (!estrellaMichelin)
          throw new ExcepcionLogicaNegocio("La estrella michelin con el id dado no fue encontrada", ErrorNegocio.NO_ENCONTRADO);
      
        const restaurante: RestauranteEntity = await this.restauranteRepository.findOne({where: {id: restauranteId}, relations: ["estrellasMichelin", "ciudad", "recetas"]})
        if (!restaurante)
          throw new ExcepcionLogicaNegocio("El restaurante con el id dado no fue encontrado", ErrorNegocio.NO_ENCONTRADO);
    
        restaurante.estrellasMichelin = [...restaurante.estrellasMichelin, estrellaMichelin];
        return await this.restauranteRepository.save(restaurante);
      }
    
    async findEstrellaMichelinByRestauranteIdEstrellaMichelinId(restauranteId: string, estrellaMichelinId: string): Promise<EstrellaMichelinEntity> {
        const estrellaMichelin: EstrellaMichelinEntity = await this.estrellaMichelinRepository.findOne({where: {id: estrellaMichelinId}});
        if (!estrellaMichelin)
          throw new ExcepcionLogicaNegocio("La estrella michelin con el id dado no fue encontrada", ErrorNegocio.NO_ENCONTRADO)
       
        const restaurante: RestauranteEntity = await this.restauranteRepository.findOne({where: {id: restauranteId}, relations: ["estrellasMichelin", "ciudad", "recetas"]});
        if (!restaurante)
          throw new ExcepcionLogicaNegocio("El restaurante con el id dado no fue encontrado", ErrorNegocio.NO_ENCONTRADO)
   
        const restauranteEstrellaMichelin: EstrellaMichelinEntity = restaurante.estrellasMichelin.find(e => e.id === estrellaMichelin.id);
   
        if (!restauranteEstrellaMichelin)
          throw new ExcepcionLogicaNegocio("La estrella michelin con el id dado no está asociada al restaurante", ErrorNegocio.PRECONDICION_FALLIDA)
   
        return restauranteEstrellaMichelin;
    }
    
    async findEstrellaMichelinsByRestauranteId(restauranteId: string): Promise<EstrellaMichelinEntity[]> {
        const restaurante: RestauranteEntity = await this.restauranteRepository.findOne({where: {id: restauranteId}, relations: ["estrellasMichelin", "ciudad", "recetas"]});
        if (!restaurante)
          throw new ExcepcionLogicaNegocio("El restaurante con el id dado no fue encontrado", ErrorNegocio.NO_ENCONTRADO)
       
        return restaurante.estrellasMichelin;
    }
    
    async associateEstrellaMichelinsRestaurante(restauranteId: string, estrellasMichelin: EstrellaMichelinEntity[]): Promise<RestauranteEntity> {
        const restaurante: RestauranteEntity = await this.restauranteRepository.findOne({where: {id: restauranteId}, relations: ["estrellasMichelin", "ciudad", "recetas"]});
    
        if (!restaurante)
          throw new ExcepcionLogicaNegocio("El restaurante con el id dado no fue encontrado", ErrorNegocio.NO_ENCONTRADO)
    
        for (let i = 0; i < estrellasMichelin.length; i++) {
          const estrellaMichelin: EstrellaMichelinEntity = await this.estrellaMichelinRepository.findOne({where: {id: estrellasMichelin[i].id}});
          if (!estrellaMichelin)
            throw new ExcepcionLogicaNegocio("La estrella michelin con el id dado no fue encontrada", ErrorNegocio.NO_ENCONTRADO)
        }
    
        restaurante.estrellasMichelin = estrellasMichelin;
        return await this.restauranteRepository.save(restaurante);
      }
    
    async deleteEstrellaMichelinRestaurante(restauranteId: string, estrellaMichelinId: string){
        const estrellaMichelin: EstrellaMichelinEntity = await this.estrellaMichelinRepository.findOne({where: {id: estrellaMichelinId}});
        if (!estrellaMichelin)
          throw new ExcepcionLogicaNegocio("La estrella michelin con el id dado no fue encontrada", ErrorNegocio.NO_ENCONTRADO)
    
        const restaurante: RestauranteEntity = await this.restauranteRepository.findOne({where: {id: restauranteId}, relations: ["estrellasMichelin", "ciudad", "recetas"]});
        if (!restaurante)
          throw new ExcepcionLogicaNegocio("El restaurante con el id dado no fue encontrado", ErrorNegocio.NO_ENCONTRADO)
    
        const restauranteEstrellaMichelin: EstrellaMichelinEntity = restaurante.estrellasMichelin.find(e => e.id === estrellaMichelin.id);
    
        if (!restauranteEstrellaMichelin)
            throw new ExcepcionLogicaNegocio("La estrella michelin con el id dado no está asociada al restaurante", ErrorNegocio.PRECONDICION_FALLIDA)
 
        restaurante.estrellasMichelin = restaurante.estrellasMichelin.filter(e => e.id !== estrellaMichelinId);
        await this.restauranteRepository.save(restaurante);
    } 
}
