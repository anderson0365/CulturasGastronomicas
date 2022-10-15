import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ErrorNegocio,
  ExcepcionLogicaNegocio,
} from '../compartido/errores-negocio';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class CiudadRestauranteService {
  cacheKey: string = 'cacheCiudadRestaurante';

  constructor(
    @InjectRepository(CiudadEntity)
    private readonly repositorioCiudad: Repository<CiudadEntity>,

    @InjectRepository(RestauranteEntity)
    private readonly repositorioRestaurante: Repository<RestauranteEntity>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async agregarRestauranteCiudad(
    ciudadId: string,
    restauranteId: string,
  ): Promise<CiudadEntity> {
    const restaurante: RestauranteEntity =
      await this.repositorioRestaurante.findOne({
        where: { id: restauranteId },
      });
    if (!restaurante) {
      throw new ExcepcionLogicaNegocio(
        'Restaurante dado no fue encontrado.',
        ErrorNegocio.NO_ENCONTRADO,
      );
    }

    const ciudad: CiudadEntity = await this.repositorioCiudad.findOne({
      where: { id: ciudadId },
      relations: ['restaurantes'],
    });
    if (!ciudad) {
      throw new ExcepcionLogicaNegocio(
        'Ciudad dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );
    }

    ciudad.restaurantes = [...ciudad.restaurantes, restaurante];
    return await this.repositorioCiudad.save(ciudad);
  }

  async obtenerRestauranteCiudad(
    ciudadId: string,
    restauranteId: string,
  ): Promise<RestauranteEntity> {
    return <RestauranteEntity>(
      (await this.__obtenerRestauranteCiudad(ciudadId, restauranteId))[1]
    );
  }

  async obtenerTodosRestaurantesDeCiudad(
    ciudadId: string,
  ): Promise<RestauranteEntity[]> {
    const cached: RestauranteEntity[] = await this.cacheManager.get<
      RestauranteEntity[]
    >(this.cacheKey);

    if (!cached) {
      const ciudad: CiudadEntity = await this.repositorioCiudad.findOne({
        where: { id: ciudadId },
        relations: ['restaurantes'],
      });
      if (!ciudad) {
        throw new ExcepcionLogicaNegocio(
          'Ciudad dada no fue encontrada.',
          ErrorNegocio.NO_ENCONTRADO,
        );
      }
      await this.cacheManager.set(this.cacheKey, ciudad);
      return ciudad.restaurantes;
    }

    return cached;
  }

  async asociarRestaurantesCiudad(
    ciudadId: string,
    restaurante: RestauranteEntity[],
  ): Promise<CiudadEntity> {
    const ciudad: CiudadEntity = await this.repositorioCiudad.findOne({
      where: { id: ciudadId },
      relations: ['restaurantes'],
    });

    if (!ciudad) {
      throw new ExcepcionLogicaNegocio(
        'Ciudad dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );
    }

    ciudad.restaurantes = restaurante;
    return await this.repositorioCiudad.save(ciudad);
  }

  async eliminarRestauranteCiudad(ciudadId: string, restauranteId: string) {
    const ciudad = <CiudadEntity>(
      (await this.__obtenerRestauranteCiudad(ciudadId, restauranteId))[0]
    );

    ciudad.restaurantes = ciudad.restaurantes.filter(
      (e) => e.id !== restauranteId,
    );
    await this.repositorioCiudad.save(ciudad);
  }

  async __obtenerRestauranteCiudad(ciudadId: string, restauranteId: string) {
    const restaurante: RestauranteEntity =
      await this.repositorioRestaurante.findOne({
        where: { id: restauranteId },
      });
    if (!restaurante) {
      throw new ExcepcionLogicaNegocio(
        'Restaurante dado no fue encontrado.',
        ErrorNegocio.NO_ENCONTRADO,
      );
    }

    const ciudad: CiudadEntity = await this.repositorioCiudad.findOne({
      where: { id: ciudadId },
      relations: ['restaurantes'],
    });
    if (!ciudad) {
      throw new ExcepcionLogicaNegocio(
        'Ciudad dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );
    }

    const ciudadRestaurante: RestauranteEntity = ciudad.restaurantes.find(
      (e) => e.id === restaurante.id,
    );

    if (!ciudadRestaurante) {
      throw new ExcepcionLogicaNegocio(
        'Restaurante dado no se encuentra asociado a Ciudad dada.',
        ErrorNegocio.PRECONDICION_FALLIDA,
      );
    }

    return [ciudad, ciudadRestaurante];
  }
}
