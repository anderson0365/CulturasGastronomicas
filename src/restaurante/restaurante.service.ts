import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestauranteEntity } from './restaurante.entity';
// eslint-disable-next-line prettier/prettier
import { ErrorNegocio, ExcepcionLogicaNegocio } from '../compartido/errores-negocio';

@Injectable()
export class RestauranteService {
  constructor(
    @InjectRepository(RestauranteEntity)
    private readonly restauranteRepository: Repository<RestauranteEntity>,
  ) {}

  async findAll(): Promise<RestauranteEntity[]> {
    return await this.restauranteRepository.find({
      relations: ['estrellasMichelin'],
    });
  }

  async findOne(id: string): Promise<RestauranteEntity> {
    const restaurante: RestauranteEntity =
      await this.restauranteRepository.findOne({
        where: { id },
        relations: ['estrellasMichelin'],
      });
    if (!restaurante)
      throw new ExcepcionLogicaNegocio(
        'El restaurante con el id dado no fue encontrado',
        ErrorNegocio.NO_ENCONTRADO,
      );
    return restaurante;
  }

  async create(restaurante: RestauranteEntity): Promise<RestauranteEntity> {
    return await this.restauranteRepository.save(restaurante);
  }

  async update(
    id: string,
    restaurante: RestauranteEntity,
  ): Promise<RestauranteEntity> {
    const persistedRestaurante: RestauranteEntity =
      await this.restauranteRepository.findOne({ where: { id } });
    if (!persistedRestaurante)
      throw new ExcepcionLogicaNegocio(
        'El restaurante con el id dado no fue encontrado',
        ErrorNegocio.NO_ENCONTRADO,
      );
    return await this.restauranteRepository.save({
      ...persistedRestaurante,
      ...restaurante,
    });
  }

  async delete(id: string) {
    const restaurante: RestauranteEntity =
      await this.restauranteRepository.findOne({ where: { id } });
    if (!restaurante)
      throw new ExcepcionLogicaNegocio(
        'El restaurante con el id dado no fue encontrado',
        ErrorNegocio.NO_ENCONTRADO,
      );
    await this.restauranteRepository.remove(restaurante);
  }
}
