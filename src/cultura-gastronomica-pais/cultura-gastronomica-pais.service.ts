import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ErrorNegocio,
  ExcepcionLogicaNegocio,
} from '../compartido/errores-negocio';
import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { PaisEntity } from '../pais/pais.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CulturaGastronomicaPaisService {
  constructor(
    @InjectRepository(CulturaGastronomicaEntity)
    private readonly repositorioCulturaGastronomica: Repository<CulturaGastronomicaEntity>,

    @InjectRepository(PaisEntity)
    private readonly repositorioPais: Repository<PaisEntity>,
  ) {}

  async agregarPaisCulturaGastronomica(
    culturaId: string,
    paisId: string,
  ): Promise<CulturaGastronomicaEntity> {
    const pais: PaisEntity = await this.repositorioPais.findOne({
      where: { id: paisId },
    });
    if (!pais)
      throw new ExcepcionLogicaNegocio(
        'Pais dado no fue encontrado.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    const cultura: CulturaGastronomicaEntity =
      await this.repositorioCulturaGastronomica.findOne({
        where: { id: culturaId },
        relations: ['paises'],
      });
    if (!cultura)
      throw new ExcepcionLogicaNegocio(
        'CulturaGastronomica dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    cultura.paises = [...cultura.paises, pais];
    return await this.repositorioCulturaGastronomica.save(cultura);
  }

  async obtenerPaisCulturaGastronomica(
    culturaId: string,
    paisId: string,
  ): Promise<PaisEntity> {
    return <PaisEntity>(
      (await this.__obtenerPaisCulturaGastronomica(culturaId, paisId))[1]
    );
  }

  async obtenerTodosPaisesDeCulturaGastronomica(
    culturaId: string,
  ): Promise<PaisEntity[]> {
    const cultura: CulturaGastronomicaEntity =
      await this.repositorioCulturaGastronomica.findOne({
        where: { id: culturaId },
        relations: ['paises'],
      });
    if (!cultura)
      throw new ExcepcionLogicaNegocio(
        'CulturaGastronomica dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    return cultura.paises;
  }

  async asociarPaisesCulturaGastronomica(
    culturaId: string,
    paises: PaisEntity[],
  ): Promise<CulturaGastronomicaEntity> {
    const cultura: CulturaGastronomicaEntity =
      await this.repositorioCulturaGastronomica.findOne({
        where: { id: culturaId },
        relations: ['paises'],
      });

    if (!cultura)
      throw new ExcepcionLogicaNegocio(
        'CulturaGastronomica dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    for (let i = 0; i < paises.length; i++) {
      const pais: PaisEntity = await this.repositorioPais.findOne({
        where: { id: paises[i].id },
      });
      if (!pais)
        throw new ExcepcionLogicaNegocio(
          'Pais dado no fue encontrado.',
          ErrorNegocio.NO_ENCONTRADO,
        );
    }

    cultura.paises = paises;
    return await this.repositorioCulturaGastronomica.save(cultura);
  }

  async eliminarPaisCulturaGastronomica(culturaId: string, paisId: string) {
    const cultura = <CulturaGastronomicaEntity>(
      (await this.__obtenerPaisCulturaGastronomica(culturaId, paisId))[0]
    );

    cultura.paises = cultura.paises.filter((e) => e.id !== paisId);
    await this.repositorioCulturaGastronomica.save(cultura);
  }

  async __obtenerPaisCulturaGastronomica(culturaId: string, paisId: string) {
    const pais: PaisEntity = await this.repositorioPais.findOne({
      where: { id: paisId },
    });
    if (!pais)
      throw new ExcepcionLogicaNegocio(
        'Pais dado no fue encontrado.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    const cultura: CulturaGastronomicaEntity =
      await this.repositorioCulturaGastronomica.findOne({
        where: { id: culturaId },
        relations: ['paises'],
      });
    if (!cultura)
      throw new ExcepcionLogicaNegocio(
        'CulturaGastronomica dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    const culturaPais: PaisEntity = cultura.paises.find(
      (e) => e.id === pais.id,
    );

    if (!culturaPais)
      throw new ExcepcionLogicaNegocio(
        'Pais dado no se encuentra asociado a CulturaGastronomica dada.',
        ErrorNegocio.PRECONDICION_FALLIDA,
      );

    return [cultura, culturaPais];
  }
}
