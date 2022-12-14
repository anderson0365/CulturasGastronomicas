import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmConfiguracionPruebas } from '../compartido/utilidades-pruebas/typeorm-configuracion-pruebas';
import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { PaisEntity } from '../pais/pais.entity';
import { Repository } from 'typeorm';
import { CulturaGastronomicaPaisService } from './cultura-gastronomica-pais.service';

describe('CulturaGastronomicaPaisService', () => {
  let servicio: CulturaGastronomicaPaisService;
  let repositorioCulturaGastronomica: Repository<CulturaGastronomicaEntity>;
  let repositorioPais: Repository<PaisEntity>;
  let listaPaises: PaisEntity[];
  let cultura: CulturaGastronomicaEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmConfiguracionPruebas()],
      providers: [CulturaGastronomicaPaisService],
    }).compile();

    servicio = module.get<CulturaGastronomicaPaisService>(
      CulturaGastronomicaPaisService,
    );

    repositorioCulturaGastronomica = module.get<
      Repository<CulturaGastronomicaEntity>
    >(getRepositoryToken(CulturaGastronomicaEntity));

    repositorioPais = module.get<Repository<PaisEntity>>(
      getRepositoryToken(PaisEntity),
    );

    await inicializarBaseDeDatos();
  });

  const inicializarBaseDeDatos = async () => {
    repositorioPais.clear();
    repositorioCulturaGastronomica.clear();

    listaPaises = [];
    for (let i = 0; i < 5; i++) {
      const pais: PaisEntity = await repositorioPais.save({
        nombre: faker.company.name(),
        ciudades: [],
        culturasGastronomicas: []
      });
      listaPaises.push(pais);
    }

    cultura = await repositorioCulturaGastronomica.save({
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      img: faker.image.imageUrl(),
      recetas: [],
      paises: listaPaises,
      productos: [],
    });
  };

  it('deber??a estar definido', () => {
    expect(servicio).toBeDefined();
  });

  it('agregarPaisCulturaGastronomica deber??a agregar pais a cultura gastron??mica.', async () => {
    const nuevoPais: PaisEntity = await repositorioPais.save({
      nombre: faker.company.name(),
      ciudades: [],
      culturasGastronomicas: []
    });

    const nuevaCultura: CulturaGastronomicaEntity =
      await repositorioCulturaGastronomica.save({
        nombre: faker.company.name(),
        descripcion: faker.lorem.sentence(),
        img: faker.image.imageUrl(),
        recetas: [],
        paises: [],
        productos: [],
      });

    const result: CulturaGastronomicaEntity =
      await servicio.agregarPaisCulturaGastronomica(
        nuevaCultura.id,
        nuevoPais.id,
      );

    expect(result.paises.length).toBe(1);
    expect(result.paises[0]).not.toBeNull();
    expect(result.paises[0].nombre).toBe(nuevoPais.nombre);
  });

  it('agregarPaisCulturaGastronomica deber??a arrojar excepcion de pais inv??lido.', async () => {
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
      servicio.agregarPaisCulturaGastronomica(nuevaCultura.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'Pais dado no fue encontrado.');
  });

  it('agregarPaisCulturaGastronomica deber??a arrojar excepcion de cultura gastron??mica inv??lida.', async () => {
    const nuevoPais: PaisEntity = await repositorioPais.save({
      nombre: faker.company.name(),
      ciudades: [],
      culturasGastronomicas: []
    });

    await expect(() =>
      servicio.agregarPaisCulturaGastronomica('0', nuevoPais.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'CulturaGastronomica dada no fue encontrada.',
    );
  });

  it('obtenerPaisCulturaGastronomica deber??a retornar una pais de la cultura gastron??mica', async () => {
    const pais: PaisEntity = listaPaises[0];
    const paisAlmacenado: PaisEntity =
      await servicio.obtenerPaisCulturaGastronomica(cultura.id, pais.id);
    expect(paisAlmacenado).not.toBeNull();
    expect(paisAlmacenado.nombre).toBe(pais.nombre);
  });

  it('obtenerPaisCulturaGastronomica deber??a arrojar excepcion de pais inv??lida.', async () => {
    await expect(() =>
      servicio.obtenerPaisCulturaGastronomica(cultura.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'Pais dado no fue encontrado.');
  });

  it('obtenerPaisCulturaGastronomica deber??a arrojar excepcion de cultura gastron??mica inv??lida.', async () => {
    const pais: PaisEntity = listaPaises[0];
    await expect(() =>
      servicio.obtenerPaisCulturaGastronomica('0', pais.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'CulturaGastronomica dada no fue encontrada.',
    );
  });

  it('obtenerPaisCulturaGastronomica deber??a arrojar excepcion de pais no asociado a cultura gastron??mica.', async () => {
    const nuevoPais: PaisEntity = await repositorioPais.save({
      nombre: faker.company.name(),
      ciudades: [],
      culturasGastronomicas: []
    });

    await expect(() =>
      servicio.obtenerPaisCulturaGastronomica(cultura.id, nuevoPais.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'Pais dado no se encuentra asociado a CulturaGastronomica dada.',
    );
  });

  it('obtenerTodasPaisesDeCulturaGastronomica should return paises by cultura', async () => {
    const paises: PaisEntity[] =
      await servicio.obtenerTodosPaisesDeCulturaGastronomica(cultura.id);
    expect(paises.length).toBe(5);
  });

  it('obtenerTodasPaisesDeCulturaGastronomica deber??a arrojar excepcion de cultura gastron??mica inv??lida.', async () => {
    await expect(() =>
      servicio.obtenerTodosPaisesDeCulturaGastronomica('0'),
    ).rejects.toHaveProperty(
      'mensaje',
      'CulturaGastronomica dada no fue encontrada.',
    );
  });

  it('asociarPaisesCulturaGastronomica deber??a actualizar la lista de paises de una cultura gastron??mica.', async () => {
    const nuevoPais: PaisEntity = await repositorioPais.save({
      nombre: faker.company.name(),
      ciudades: [],
      culturasGastronomicas: []
    });

    const culturaActualizada: CulturaGastronomicaEntity =
      await servicio.asociarPaisesCulturaGastronomica(cultura.id, [
        nuevoPais,
      ]);
    expect(culturaActualizada.paises.length).toBe(1);

    expect(culturaActualizada.paises[0].nombre).toBe(nuevoPais.nombre);
  });

  it('asociarPaisesCulturaGastronomica deber??a arrojar excepcion de cultura gastron??mica inv??lida.', async () => {
    const nuevoPais: PaisEntity = await repositorioPais.save({
      nombre: faker.company.name(),
      ciudades: [],
      culturasGastronomicas: []
    });

    await expect(() =>
      servicio.asociarPaisesCulturaGastronomica('0', [nuevoPais]),
    ).rejects.toHaveProperty(
      'mensaje',
      'CulturaGastronomica dada no fue encontrada.',
    );
  });

  it('asociarPaisesCulturaGastronomica deber??a arrojar excepcion de cultura gastron??mica inv??lida.', async () => {
    const nuevoPais: PaisEntity = listaPaises[0];
    nuevoPais.id = '0';

    await expect(() =>
      servicio.asociarPaisesCulturaGastronomica(cultura.id, [nuevoPais]),
    ).rejects.toHaveProperty('mensaje', 'Pais dado no fue encontrado.');
  });

  it('eliminarPaisCulturaGastronomica deber??a remover una pais de cultura gastron??mica.', async () => {
    const pais: PaisEntity = listaPaises[0];

    await servicio.eliminarPaisCulturaGastronomica(cultura.id, pais.id);

    const culturaAlmacenada: CulturaGastronomicaEntity =
      await repositorioCulturaGastronomica.findOne({
        where: { id: cultura.id },
        relations: ['paises'],
      });
    const paisEliminado: PaisEntity = culturaAlmacenada.paises.find(
      (a) => a.id === pais.id,
    );

    expect(paisEliminado).toBeUndefined();
  });

  it('eliminarPaisCulturaGastronomica deber??a arrojar excepcion de pais inv??lida.', async () => {
    await expect(() =>
      servicio.eliminarPaisCulturaGastronomica(cultura.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'Pais dado no fue encontrado.');
  });

  it('eliminarPaisCulturaGastronomica  deber??a arrojar excepcion de cultura gastron??mica inv??lida.', async () => {
    const pais: PaisEntity = listaPaises[0];
    await expect(() =>
      servicio.eliminarPaisCulturaGastronomica('0', pais.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'CulturaGastronomica dada no fue encontrada.',
    );
  });

  it('eliminarPaisCulturaGastronomica deber??a arrojar excepcion de pais no asociado a cultura gastron??mica.', async () => {
    const nuevoPais: PaisEntity = await repositorioPais.save({
      nombre: faker.company.name(),
      ciudades: [],
      culturasGastronomicas: []
    });

    await expect(() =>
      servicio.eliminarPaisCulturaGastronomica(cultura.id, nuevoPais.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'Pais dado no se encuentra asociado a CulturaGastronomica dada.',
    );
  });
});
