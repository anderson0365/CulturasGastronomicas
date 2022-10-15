import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// eslint-disable-next-line prettier/prettier
import {ErrorNegocio, ExcepcionLogicaNegocio} from '../compartido/errores-negocio';
import { Repository } from 'typeorm';
import { EstrellaMichelinEntity } from './estrella-michelin.entity';

@Injectable()
export class EstrellaMichelinService {
  constructor(
    @InjectRepository(EstrellaMichelinEntity)
    private readonly estrellaMichelinRepository: Repository<EstrellaMichelinEntity>,
  ) {}

  async findAll(): Promise<EstrellaMichelinEntity[]> {
    return await this.estrellaMichelinRepository.find({
      relations: ['restaurante'],
    });
  }

  async findOne(id: string): Promise<EstrellaMichelinEntity> {
    const estrellaMichelin: EstrellaMichelinEntity =
      await this.estrellaMichelinRepository.findOne({
        where: { id },
        relations: ['restaurante'],
      });
    if (!estrellaMichelin)
      throw new ExcepcionLogicaNegocio(
        'La estrella michelin con el id dado no fue encontrada',
        ErrorNegocio.NO_ENCONTRADO,
      );
    return estrellaMichelin;
  }

  async create(
    estrellaMichelin: EstrellaMichelinEntity,
  ): Promise<EstrellaMichelinEntity> {
    return await this.estrellaMichelinRepository.save(estrellaMichelin);
  }

  async update(
    id: string,
    estrellaMichelin: EstrellaMichelinEntity,
  ): Promise<EstrellaMichelinEntity> {
    const persistedEstrellaMichelin: EstrellaMichelinEntity =
      await this.estrellaMichelinRepository.findOne({ where: { id } });
    if (!persistedEstrellaMichelin)
      throw new ExcepcionLogicaNegocio(
        'La estrella michelin con el id dado no fue encontrada',
        ErrorNegocio.NO_ENCONTRADO,
      );
    return await this.estrellaMichelinRepository.save({
      ...persistedEstrellaMichelin,
      ...estrellaMichelin,
    });
  }
  async delete(id: string) {
    const estrellaMichelin: EstrellaMichelinEntity =
      await this.estrellaMichelinRepository.findOne({ where: { id } });
    if (!estrellaMichelin)
      throw new ExcepcionLogicaNegocio(
        'La estrella michelin con el id dado no fue encontrada',
        ErrorNegocio.NO_ENCONTRADO,
      );
    await this.estrellaMichelinRepository.remove(estrellaMichelin);
  }
}
