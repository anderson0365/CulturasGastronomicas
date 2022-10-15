import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import {
  ErrorNegocio,
  ExcepcionLogicaNegocio,
} from '../compartido/errores-negocio';
import { PaisEntity } from '../pais/pais.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaisCiudadService {
  constructor(
    @InjectRepository(PaisEntity)
    private readonly repositorioPais: Repository<PaisEntity>,

    @InjectRepository(CiudadEntity)
    private readonly repositorioCiudad: Repository<CiudadEntity>,
  ) {}

  async agregarCiudadPais(
    paisId: string,
    ciudadId: string,
  ): Promise<PaisEntity> {
    const ciudad: CiudadEntity = await this.repositorioCiudad.findOne({
      where: { id: ciudadId },
    });
    if (!ciudad)
      throw new ExcepcionLogicaNegocio(
        'Ciudad dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    const pais: PaisEntity = await this.repositorioPais.findOne({
      where: { id: paisId },
      relations: ['ciudades'],
    });
    if (!pais)
      throw new ExcepcionLogicaNegocio(
        'Pais dado no fue encontrado.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    pais.ciudades = [...pais.ciudades, ciudad];
    return await this.repositorioPais.save(pais);
  }

  async obtenerCiudadPais(
    paisId: string,
    ciudadId: string,
  ): Promise<CiudadEntity> {
    return <CiudadEntity>(await this.__obtenerCiudadPais(paisId, ciudadId))[1];
  }

  async obtenerTodasCiudadesPais(paisId: string): Promise<CiudadEntity[]> {
    const pais: PaisEntity = await this.repositorioPais.findOne({
      where: { id: paisId },
      relations: ['ciudades'],
    });
    if (!pais)
      throw new ExcepcionLogicaNegocio(
        'Pais dado no fue encontrado.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    return pais.ciudades;
  }

  async asociarCiudadesPais(
    paisId: string,
    ciudades: CiudadEntity[],
  ): Promise<PaisEntity> {
    const pais: PaisEntity = await this.repositorioPais.findOne({
      where: { id: paisId },
      relations: ['ciudades'],
    });

    if (!pais)
      throw new ExcepcionLogicaNegocio(
        'Pais dado no fue encontrado.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    for (let i = 0; i < ciudades.length; i++) {
      const ciudad: CiudadEntity = await this.repositorioCiudad.findOne({
        where: { id: ciudades[i].id },
      });
      if (!ciudad)
        throw new ExcepcionLogicaNegocio(
          'Ciudad dada no fue encontrada.',
          ErrorNegocio.NO_ENCONTRADO,
        );
    }

    pais.ciudades = ciudades;
    return await this.repositorioPais.save(pais);
  }

  async eliminarCiudadPais(paisId: string, ciudadId: string) {
    const pais = <PaisEntity>(
      (await this.__obtenerCiudadPais(paisId, ciudadId))[0]
    );

    pais.ciudades = pais.ciudades.filter((e) => e.id !== ciudadId);
    await this.repositorioPais.save(pais);
  }

  async __obtenerCiudadPais(paisId: string, ciudadId: string) {
    const ciudad: CiudadEntity = await this.repositorioCiudad.findOne({
      where: { id: ciudadId },
    });
    if (!ciudad)
      throw new ExcepcionLogicaNegocio(
        'Ciudad dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    const pais: PaisEntity = await this.repositorioPais.findOne({
      where: { id: paisId },
      relations: ['ciudades'],
    });
    if (!pais)
      throw new ExcepcionLogicaNegocio(
        'Pais dado no fue encontrado.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    const paisCiudad: CiudadEntity = pais.ciudades.find(
      (e) => e.id === ciudad.id,
    );

    if (!paisCiudad)
      throw new ExcepcionLogicaNegocio(
        'Ciudad dada no se encuentra asociada a Pais dado.',
        ErrorNegocio.PRECONDICION_FALLIDA,
      );
    return [pais, paisCiudad];
  }
}
