import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmConfiguracionPruebas } from '../compartido/utilidades-pruebas/typeorm-configuracion-pruebas';
import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { PaisEntity } from '../pais/pais.entity';
import { Repository } from 'typeorm';
import { PaisCulturaGastronomicaService } from './pais-cultura-gastronomica.service';

describe('PaisCulturaGastronomicaService', () => {
  let servicio: PaisCulturaGastronomicaService;
  let repositorioPais: Repository<PaisEntity>;
  let repositorioCulturaGastronomica: Repository<CulturaGastronomicaEntity>;
  let listaCulturasGastronomicas: CulturaGastronomicaEntity[];
  let pais: PaisEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmConfiguracionPruebas()],
      providers: [PaisCulturaGastronomicaService],
    }).compile();

    servicio = module.get<PaisCulturaGastronomicaService>(
      PaisCulturaGastronomicaService,
    );

    repositorioPais = module.get<Repository<PaisEntity>>(
      getRepositoryToken(PaisEntity),
    );

    repositorioCulturaGastronomica = module.get<
      Repository<CulturaGastronomicaEntity>
    >(getRepositoryToken(CulturaGastronomicaEntity));

    await inicializarBaseDeDatos();
  });

  const inicializarBaseDeDatos = async () => {
    repositorioCulturaGastronomica.clear();
    repositorioPais.clear();

    listaCulturasGastronomicas = [];
    for (let i = 0; i < 5; i++) {
      const cultura: CulturaGastronomicaEntity =
        await repositorioCulturaGastronomica.save({
          nombre: faker.company.name(),
          descripcion: faker.lorem.sentence(),
          img: faker.image.imageUrl(),
          recetas: [],
          paises: [],
          productos: [],
        });
      listaCulturasGastronomicas.push(cultura);
    }

    pais = await repositorioPais.save({
      nombre: faker.company.name(),
      ciudades: [],
      culturasGastronomicas: listaCulturasGastronomicas,
    });
  };

  it('debería estar definido', () => {
    expect(servicio).toBeDefined();
  });

  it('agregarCulturaGastronomicaPais debería agregar cultura gastronómica a pais.', async () => {
    const nuevaCultura: CulturaGastronomicaEntity =
      await repositorioCulturaGastronomica.save({
        nombre: faker.company.name(),
        descripcion: faker.lorem.sentence(),
        img: faker.image.imageUrl(),
        recetas: [],
        paises: [],
        productos: [],
      });

    const nuevoPais: PaisEntity = await repositorioPais.save({
      nombre: faker.company.name(),
      ciudades: [],
      culturasGastronomicas: [],
    });

    const result: PaisEntity = await servicio.agregarCulturaGastronomicaPais(
      nuevoPais.id,
      nuevaCultura.id,
    );

    expect(result.culturasGastronomicas.length).toBe(1);
    expect(result.culturasGastronomicas[0]).not.toBeNull();
    expect(result.culturasGastronomicas[0].descripcion).toBe(
      nuevaCultura.descripcion,
    );
    expect(result.culturasGastronomicas[0].nombre).toBe(nuevaCultura.nombre);
    expect(result.culturasGastronomicas[0].img).toBe(nuevaCultura.img);
  });

  it('agregarCulturaGastronomicaPais debería arrojar excepcion de cultura gastronómica inválida.', async () => {
    const nuevoPais: PaisEntity = await repositorioPais.save({
      nombre: faker.company.name(),
      ciudades: [],
      culturasGastronomicas: [],
    });

    await expect(() =>
      servicio.agregarCulturaGastronomicaPais(nuevoPais.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'CulturaGastronomica dada no fue encontrada.');
  });

  it('agregarCulturaGastronomicaPais debería arrojar excepcion de pais inválido.', async () => {
    const nuevaCultura: CulturaGastronomicaEntity =
      await repositorioCulturaGastronomica.save({
        nombre: faker.company.name(),
        descripcion: faker.lorem.sentence(),
        img: faker.image.imageUrl(),
        recetas: [],
        paises: [],
        productos: [],
      });

    await expect(() =>
      servicio.agregarCulturaGastronomicaPais('0', nuevaCultura.id),
    ).rejects.toHaveProperty('mensaje', 'Pais dado no fue encontrado.');
  });

  it('obtenerCulturaGastronomicaPais debería arrojar excepcion de cultura gastronómica inválida.', async () => {
    await expect(() =>
      servicio.obtenerCulturaGastronomicaPais(pais.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'CulturaGastronomica dada no fue encontrada.');
  });

  it('asociarCulturaGastronomicaPais debería actualizar la lista de culturas gastronómicas de una pais.', async () => {
    const nuevaCultura: CulturaGastronomicaEntity =
      await repositorioCulturaGastronomica.save({
        nombre: faker.company.name(),
        descripcion: faker.lorem.sentence(),
        img: faker.image.imageUrl(),
        recetas: [],
        paises: [],
        productos: [],
      });

    const paisActualizado: PaisEntity =
      await servicio.asociarCulturaGastronomicaPais(pais.id, [nuevaCultura]);
    expect(paisActualizado.culturasGastronomicas.length).toBe(1);
    expect(paisActualizado.culturasGastronomicas[0].nombre).toBe(
      nuevaCultura.nombre,
    );
    expect(paisActualizado.culturasGastronomicas[0].descripcion).toBe(
      nuevaCultura.descripcion,
    );
    expect(paisActualizado.culturasGastronomicas[0].img).toBe(nuevaCultura.img);
  });

  it('eliminarCulturaGastronomicaPais debería arrojar excepcion de cultura gastronómica inválido.', async () => {
    await expect(() =>
      servicio.eliminarCulturaGastronomicaPais(pais.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'CulturaGastronomica dada no fue encontrada.');
  });

  it('eliminarCulturaGastronomicaPais debería arrojar excepcion de cultura gastronómica no asociado a pais.', async () => {
    const nuevaCultura: CulturaGastronomicaEntity =
      await repositorioCulturaGastronomica.save({
        nombre: faker.company.name(),
        descripcion: faker.lorem.sentence(),
        img: faker.image.imageUrl(),
        recetas: [],
        paises: [],
        productos: [],
      });

    await expect(() =>
      servicio.eliminarCulturaGastronomicaPais(pais.id, nuevaCultura.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'CulturaGastronomica dada no se encuentra asociada a Pais dado.',
    );
  });
});
