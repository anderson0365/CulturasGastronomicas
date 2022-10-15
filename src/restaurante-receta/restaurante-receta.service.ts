import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ErrorNegocio,
  ExcepcionLogicaNegocio,
} from '../compartido/errores-negocio';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { RecetaEntity } from '../receta/receta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RestauranteRecetaService {
  constructor(
    @InjectRepository(RestauranteEntity)
    private readonly repositorioRestaurante: Repository<RestauranteEntity>,

    @InjectRepository(RecetaEntity)
    private readonly repositorioReceta: Repository<RecetaEntity>,
  ) {}

  async agregarRecetaRestaurante(
    restauranteId: string,
    recetaId: string,
  ): Promise<RestauranteEntity> {
    const receta: RecetaEntity = await this.repositorioReceta.findOne({
      where: { id: recetaId },
    });
    if (!receta) {
      throw new ExcepcionLogicaNegocio(
        'Receta dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );
    }
    const restaurante: RestauranteEntity =
      await this.repositorioRestaurante.findOne({
        where: { id: restauranteId },
        relations: ['recetas'],
      });
    if (!restaurante) {
      throw new ExcepcionLogicaNegocio(
        'Restaurante dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );
    }
    restaurante.recetas = [...restaurante.recetas, receta];
    return await this.repositorioRestaurante.save(restaurante);
  }

  async obtenerRecetaRestaurante(
    restauranteId: string,
    recetaId: string,
  ): Promise<RecetaEntity> {
    return <RecetaEntity>(
      (await this.__obtenerRecetaRestaurante(restauranteId, recetaId))[1]
    );
  }

  async obtenerTodasRecetasDeRestaurante(
    restauranteId: string,
  ): Promise<RecetaEntity[]> {
    const restaurante: RestauranteEntity =
      await this.repositorioRestaurante.findOne({
        where: { id: restauranteId },
        relations: ['recetas'],
      });
    if (!restaurante)
      throw new ExcepcionLogicaNegocio(
        'Restaurante dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    return restaurante.recetas;
  }

  async asociarRecetasRestaurante(
    restauranteId: string,
    recetas: RecetaEntity[],
  ): Promise<RestauranteEntity> {
    const restaurante: RestauranteEntity =
      await this.repositorioRestaurante.findOne({
        where: { id: restauranteId },
        relations: ['recetas'],
      });

    if (!restaurante)
      throw new ExcepcionLogicaNegocio(
        'Restaurante dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    for (let i = 0; i < recetas.length; i++) {
      const receta: RecetaEntity = await this.repositorioReceta.findOne({
        where: { id: recetas[i].id },
      });
      if (!receta)
        throw new ExcepcionLogicaNegocio(
          'Receta dada no fue encontrada.',
          ErrorNegocio.NO_ENCONTRADO,
        );
    }

    restaurante.recetas = recetas;
    return await this.repositorioRestaurante.save(restaurante);
  }

  async eliminarRecetaRestaurante(restauranteId: string, recetaId: string) {
    const restaurante = <RestauranteEntity>(
      (await this.__obtenerRecetaRestaurante(restauranteId, recetaId))[0]
    );
    restaurante.recetas = restaurante.recetas.filter((e) => e.id !== recetaId);
    await this.repositorioRestaurante.save(restaurante);
  }

  async __obtenerRecetaRestaurante(restauranteId: string, recetaId: string) {
    let receta: RecetaEntity = await this.repositorioReceta.findOne({
      where: { id: recetaId },
    });
    if (!receta)
      throw new ExcepcionLogicaNegocio(
        'Receta dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    const restaurante: RestauranteEntity =
      await this.repositorioRestaurante.findOne({
        where: { id: restauranteId },
        relations: ['recetas'],
      });
    if (!restaurante)
      throw new ExcepcionLogicaNegocio(
        'Restaurante dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    receta = restaurante.recetas.find((e) => e.id === receta.id);

    if (!receta)
      throw new ExcepcionLogicaNegocio(
        'Receta dada no se encuentra asociada a Restaurante dado.',
        ErrorNegocio.PRECONDICION_FALLIDA,
      );

    return [restaurante, receta];
  }
}
