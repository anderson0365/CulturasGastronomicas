import { Test, TestingModule } from '@nestjs/testing';
import { EstrellaMichelinService } from './estrella-michelin.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmConfiguracionPruebas } from '../compartido/utilidades-pruebas/typeorm-configuracion-pruebas';
import { EstrellaMichelinEntity } from './estrella-michelin.entity';
import { faker } from '@faker-js/faker';

describe('EstrellaMichelinService', () => {
  let service: EstrellaMichelinService;
  let repository: Repository<EstrellaMichelinEntity>;
  let estrellasMichelinList: EstrellaMichelinEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmConfiguracionPruebas()],
      providers: [EstrellaMichelinService],
    }).compile();

    service = module.get<EstrellaMichelinService>(EstrellaMichelinService);
    repository = module.get<Repository<EstrellaMichelinEntity>>(
      getRepositoryToken(EstrellaMichelinEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    estrellasMichelinList = [];
    for (let i = 0; i < 5; i++) {
      const estrellaMichelin: EstrellaMichelinEntity = await repository.save({
        id: faker.lorem.sentence(),
        fechaDeObtencion: faker.lorem.sentence(),
        restaurante: null,
      });
      estrellasMichelinList.push(estrellaMichelin);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all estrellasMichelin', async () => {
    const estrellasMichelin: EstrellaMichelinEntity[] = await service.findAll();
    expect(estrellasMichelin).not.toBeNull();
    expect(estrellasMichelin).toHaveLength(estrellasMichelinList.length);
  });

  it('findOne should return a estrellaMichelin by id', async () => {
    const storedEstrellaMichelin: EstrellaMichelinEntity =
      estrellasMichelinList[0];
    const estrellaMichelin: EstrellaMichelinEntity = await service.findOne(
      storedEstrellaMichelin.id,
    );
    expect(estrellaMichelin).not.toBeNull();
    expect(estrellaMichelin.fechaDeObtencion).toEqual(
      storedEstrellaMichelin.fechaDeObtencion,
    );
  });

  it('findOne should throw an exception for an invalid estrellaMichelin', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'mensaje',
      'La estrella michelin con el id dado no fue encontrada',
    );
  });

  it('create should return a new estrellaMichelin', async () => {
    const estrellaMichelin: EstrellaMichelinEntity = {
      id: faker.lorem.sentence(),
      fechaDeObtencion: faker.lorem.sentence(),
      restaurante: null,
    };

    const newEstrellaMichelin: EstrellaMichelinEntity = await service.create(
      estrellaMichelin,
    );
    expect(newEstrellaMichelin).not.toBeNull();

    const storedEstrellaMichelin: EstrellaMichelinEntity =
      await repository.findOne({
        where: { id: newEstrellaMichelin.id },
      });
    expect(storedEstrellaMichelin).not.toBeNull();
    expect(estrellaMichelin.fechaDeObtencion).toEqual(
      storedEstrellaMichelin.fechaDeObtencion,
    );
  });

  it('update should modify a estrellaMichelin', async () => {
    const estrellaMichelin: EstrellaMichelinEntity = estrellasMichelinList[0];
    estrellaMichelin.fechaDeObtencion = 'New date';

    const updatedEstrellaMichelin: EstrellaMichelinEntity =
      await service.update(estrellaMichelin.id, estrellaMichelin);
    expect(updatedEstrellaMichelin).not.toBeNull();

    const storedEstrellaMichelin: EstrellaMichelinEntity =
      await repository.findOne({
        where: { id: estrellaMichelin.id },
      });
    expect(storedEstrellaMichelin).not.toBeNull();
    expect(storedEstrellaMichelin.fechaDeObtencion).toEqual(
      estrellaMichelin.fechaDeObtencion,
    );
  });

  it('update should throw an exception for an invalid estrellaMichelin', async () => {
    let estrellaMichelin: EstrellaMichelinEntity = estrellasMichelinList[0];
    estrellaMichelin = {
      ...estrellaMichelin,
      fechaDeObtencion: 'New fecha',
    };
    await expect(() =>
      service.update('0', estrellaMichelin),
    ).rejects.toHaveProperty(
      'mensaje',
      'La estrella michelin con el id dado no fue encontrada',
    );
  });

  it('delete should remove a estrellaMichelin', async () => {
    const estrellaMichelin: EstrellaMichelinEntity = estrellasMichelinList[0];
    await service.delete(estrellaMichelin.id);

    const deletedEstrellaMichelin: EstrellaMichelinEntity =
      await repository.findOne({
        where: { id: estrellaMichelin.id },
      });
    expect(deletedEstrellaMichelin).toBeNull();
  });

  it('delete should throw an exception for an invalid estrellaMichelin', async () => {
    const estrellaMichelin: EstrellaMichelinEntity = estrellasMichelinList[0];
    await service.delete(estrellaMichelin.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'mensaje',
      'La estrella michelin con el id dado no fue encontrada',
    );
  });
});
