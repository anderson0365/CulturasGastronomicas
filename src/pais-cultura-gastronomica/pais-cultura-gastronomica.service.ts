import { CACHE_MANAGER, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ErrorNegocio,
  ExcepcionLogicaNegocio,
} from '../compartido/errores-negocio';
import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { PaisEntity } from '../pais/pais.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class PaisCulturaGastronomicaService {
  cacheKey: string = 'cachePaises';

  constructor(
    @InjectRepository(PaisEntity)
    private readonly repositorioPais: Repository<PaisEntity>,

    @InjectRepository(CulturaGastronomicaEntity)
    private readonly respositorioCulturaGastronomica: Repository<CulturaGastronomicaEntity>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async agregarCulturaGastronomicaPais(
    paisId: string,
    culturaId: string,
  ): Promise<PaisEntity> {
    const cultura: CulturaGastronomicaEntity =
      await this.respositorioCulturaGastronomica.findOne({
        where: { id: culturaId },
      });
    if (!cultura) {
      throw new ExcepcionLogicaNegocio(
        'CulturaGastronomica dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );
    }

    const pais: PaisEntity = await this.repositorioPais.findOne({
      where: { id: paisId },
      relations: ['culturasGastronomicas'],
    });
    if (!pais) {
      throw new ExcepcionLogicaNegocio(
        'Pais dado no fue encontrado.',
        ErrorNegocio.NO_ENCONTRADO,
      );
    }

    pais.culturasGastronomicas = [...pais.culturasGastronomicas, cultura];
    return await this.repositorioPais.save(pais);
  }

  async obtenerCulturaGastronomicaPais(
    paisId: string,
    culturaId: string,
  ): Promise<CulturaGastronomicaEntity> {
    return <CulturaGastronomicaEntity>(
      (await this.__obtenerCulturaGastronomicaPais(paisId, culturaId))[1]
    );
  }

  async obtenerTodasRecetasDeCulturaGastronomica(
    paisId: string,
  ): Promise<CulturaGastronomicaEntity[]> {
    const cached: CulturaGastronomicaEntity[] = await this.cacheManager.get<
      CulturaGastronomicaEntity[]
    >(this.cacheKey);

    if (!cached) {
      const pais: PaisEntity = await this.repositorioPais.findOne({
        where: { id: paisId },
        relations: ['culturasGastronomicas'],
      });
      if (!pais) {
        throw new ExcepcionLogicaNegocio(
          'Pais dado no fue encontrado.',
          ErrorNegocio.NO_ENCONTRADO,
        );
      }
      await this.cacheManager.set(this.cacheKey, pais);
      return pais.culturasGastronomicas;
    }

    return cached;
  }

  async asociarCulturaGastronomicaPais(
    paisId: string,
    culturasGastronomicas: CulturaGastronomicaEntity[],
  ): Promise<PaisEntity> {
    const pais: PaisEntity = await this.repositorioPais.findOne({
      where: { id: paisId },
      relations: ['culturasGastronomicas'],
    });

    if (!pais) {
      throw new ExcepcionLogicaNegocio(
        'Pais dado no fue encontrado.',
        ErrorNegocio.NO_ENCONTRADO,
      );
    }

    for (let i = 0; i < culturasGastronomicas.length; i++) {
      const cultura: CulturaGastronomicaEntity =
        await this.respositorioCulturaGastronomica.findOne({
          where: { id: culturasGastronomicas[i].id },
        });
      if (!cultura) {
        throw new ExcepcionLogicaNegocio(
          'CulturaGastronomica dada no fue encontrada.',
          ErrorNegocio.NO_ENCONTRADO,
        );
      }
    }

    pais.culturasGastronomicas = culturasGastronomicas;
    return await this.repositorioPais.save(pais);
  }

  async eliminarCulturaGastronomicaPais(paisId: string, culturaId: string) {
    const pais = <PaisEntity>(
      (await this.__obtenerCulturaGastronomicaPais(paisId, culturaId))[0]
    );

    pais.culturasGastronomicas = pais.culturasGastronomicas.filter(
      (e) => e.id !== culturaId,
    );
    await this.repositorioPais.save(pais);
  }

  async __obtenerCulturaGastronomicaPais(paisId: string, culturaId: string) {
    const cultura: CulturaGastronomicaEntity =
      await this.respositorioCulturaGastronomica.findOne({
        where: { id: culturaId },
      });
    if (!cultura) {
      throw new ExcepcionLogicaNegocio(
        'CulturaGastronomica dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );
    }

    const pais: PaisEntity = await this.repositorioPais.findOne({
      where: { id: paisId },
      relations: ['culturasGastronomicas'],
    });
    if (!pais) {
      throw new ExcepcionLogicaNegocio(
        'Pais dado no fue encontrado.',
        ErrorNegocio.NO_ENCONTRADO,
      );
    }

    const paisCultura: CulturaGastronomicaEntity =
      pais.culturasGastronomicas.find((e) => e.id === cultura.id);

    if (!paisCultura) {
      throw new ExcepcionLogicaNegocio(
        'CulturaGastronomica dada no se encuentra asociada a Pais dado.',
        ErrorNegocio.PRECONDICION_FALLIDA,
      );
    }
    return [pais, paisCultura];
  }
}
