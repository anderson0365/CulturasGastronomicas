import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ErrorNegocio,
  ExcepcionLogicaNegocio,
} from '../compartido/errores-negocio';
import { Repository } from 'typeorm';
import { CulturaGastronomicaEntity } from './cultura-gastronomica.entity';

@Injectable()
export class CulturaGastronomicaService {
  constructor(
    @InjectRepository(CulturaGastronomicaEntity)
    private readonly repositorioCultura: Repository<CulturaGastronomicaEntity>,
  ) {}

  async obtenerTodos(): Promise<CulturaGastronomicaEntity[]> {
    return await this.repositorioCultura.find({
      relations: ['recetas', 'paises', 'productos'],
    });
  }

  async obtenerUno(id: string): Promise<CulturaGastronomicaEntity> {
    const cultura: CulturaGastronomicaEntity =
      await this.repositorioCultura.findOne({
        where: { id },
        relations: ['recetas', 'paises', 'productos'],
      });
    if (!cultura)
      throw new ExcepcionLogicaNegocio(
        'CulturaGastronomica dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    return cultura;
  }

  async crear(
    cultura: CulturaGastronomicaEntity,
  ): Promise<CulturaGastronomicaEntity> {
    return await this.repositorioCultura.save(cultura);
  }

  async actualizar(
    id: string,
    cultura: CulturaGastronomicaEntity,
  ): Promise<CulturaGastronomicaEntity> {
    const culturaPersistent: CulturaGastronomicaEntity =
      await this.repositorioCultura.findOne({ where: { id } });
    if (!culturaPersistent)
      throw new ExcepcionLogicaNegocio(
        'CulturaGastronomica dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    return await this.repositorioCultura.save({
      ...culturaPersistent,
      ...cultura,
    });
  }

  async eliminar(id: string) {
    const cultura: CulturaGastronomicaEntity =
      await this.repositorioCultura.findOne({ where: { id } });
    if (!cultura)
      throw new ExcepcionLogicaNegocio(
        'CulturaGastronomica dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    await this.repositorioCultura.remove(cultura);
  }
}
