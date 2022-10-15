import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ErrorNegocio,
  ExcepcionLogicaNegocio,
} from '../compartido/errores-negocio';
import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { RecetaEntity } from '../receta/receta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CulturaGastronomicaRecetaService {
  constructor(
    @InjectRepository(CulturaGastronomicaEntity)
    private readonly repositorioCulturaGastronomica: Repository<CulturaGastronomicaEntity>,

    @InjectRepository(RecetaEntity)
    private readonly repositorioReceta: Repository<RecetaEntity>,
  ) {}

  async agregarRecetaCulturaGastronomica(
    culturaId: string,
    recetaId: string,
  ): Promise<CulturaGastronomicaEntity> {
    const receta: RecetaEntity = await this.repositorioReceta.findOne({
      where: { id: recetaId },
    });
    if (!receta)
      throw new ExcepcionLogicaNegocio(
        'Receta dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    const cultura: CulturaGastronomicaEntity =
      await this.repositorioCulturaGastronomica.findOne({
        where: { id: culturaId },
        relations: ['recetas'],
      });
    if (!cultura)
      throw new ExcepcionLogicaNegocio(
        'CulturaGastronomica dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    cultura.recetas = [...cultura.recetas, receta];
    return await this.repositorioCulturaGastronomica.save(cultura);
  }

  async obtenerRecetaCulturaGastronomica(
    culturaId: string,
    recetaId: string,
  ): Promise<RecetaEntity> {
    return <RecetaEntity> (await this.__obtenerRecetaCulturaGastronomica(culturaId, recetaId))[1];
  }

  async obtenerTodasRecetasDeCulturaGastronomica(
    culturaId: string,
  ): Promise<RecetaEntity[]> {
    const cultura: CulturaGastronomicaEntity =
      await this.repositorioCulturaGastronomica.findOne({
        where: { id: culturaId },
        relations: ['recetas'],
      });
    if (!cultura)
      throw new ExcepcionLogicaNegocio(
        'CulturaGastronomica dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    return cultura.recetas;
  }

  async asociarRecetasCulturaGastronomica(
    culturaId: string,
    recetas: RecetaEntity[],
  ): Promise<CulturaGastronomicaEntity> {
    const cultura: CulturaGastronomicaEntity =
      await this.repositorioCulturaGastronomica.findOne({
        where: { id: culturaId },
        relations: ['recetas'],
      });

    if (!cultura)
      throw new ExcepcionLogicaNegocio(
        'CulturaGastronomica dada no fue encontrada.',
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

    cultura.recetas = recetas;
    return await this.repositorioCulturaGastronomica.save(cultura);
  }

  async eliminarRecetaCulturaGastronomica(culturaId: string, recetaId: string) {
    const cultura = <CulturaGastronomicaEntity> (await this.__obtenerRecetaCulturaGastronomica(culturaId, recetaId))[0];

    cultura.recetas = cultura.recetas.filter((e) => e.id !== recetaId);
    await this.repositorioCulturaGastronomica.save(cultura);
  }

  async __obtenerRecetaCulturaGastronomica(culturaId: string, recetaId: string) {
    const receta: RecetaEntity = await this.repositorioReceta.findOne({
      where: { id: recetaId },
    });
    if (!receta)
      throw new ExcepcionLogicaNegocio(
        'Receta dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    const cultura: CulturaGastronomicaEntity =
      await this.repositorioCulturaGastronomica.findOne({
        where: { id: culturaId },
        relations: ['recetas'],
      });
    if (!cultura)
      throw new ExcepcionLogicaNegocio(
        'CulturaGastronomica dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    const culturaReceta: RecetaEntity = cultura.recetas.find(
      (e) => e.id === receta.id,
    );

    if (!culturaReceta)
      throw new ExcepcionLogicaNegocio(
        'Receta dada no se encuentra asociada a CulturaGastronomica dada.',
        ErrorNegocio.PRECONDICION_FALLIDA,
      );
    return [cultura, culturaReceta];
  }
}
