import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmConfiguracionPruebas } from '../compartido/utilidades-pruebas/typeorm-configuracion-pruebas';
import { Repository } from 'typeorm';
import { CulturaGastronomicaEntity } from './cultura-gastronomica.entity';
import { CulturaGastronomicaService } from './cultura-gastronomica.service';
import { faker } from '@faker-js/faker';

describe('CulturaGastronomicaService', () => {
  let servicio: CulturaGastronomicaService;
  let repositorio: Repository<CulturaGastronomicaEntity>;
  let listaCulturas: CulturaGastronomicaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmConfiguracionPruebas()],
      providers: [CulturaGastronomicaService],
    }).compile();

    servicio = module.get<CulturaGastronomicaService>(
      CulturaGastronomicaService,
    );
    repositorio = module.get<Repository<CulturaGastronomicaEntity>>(
      getRepositoryToken(CulturaGastronomicaEntity),
    );
    await inicializarBaseDeDatos();
  });

  const inicializarBaseDeDatos = async () => {
    repositorio.clear();
    listaCulturas = [];
    for (let i = 0; i < 5; i++) {
      const cultura: CulturaGastronomicaEntity = await repositorio.save({
        nombre: faker.company.name(),
        descripcion: faker.lorem.sentence(),
        img: faker.image.imageUrl(),
        recetas: [],
        paises: [],
        productos: []
      });
      listaCulturas.push(cultura);
    }
  };

  it('debería estar definido', () => {
    expect(servicio).toBeDefined();
  });

  it('obtenerTodos debería retornar todos las culturas gastronomicas', async () => {
    const culturas: CulturaGastronomicaEntity[] = await servicio.obtenerTodos();
    expect(culturas).not.toBeNull();
    expect(culturas).toHaveLength(listaCulturas.length);
  });

  it('obtenerUno debería retornar una cultura gastronomica por id', async () => {
    const culturaAlmacenada: CulturaGastronomicaEntity = listaCulturas[0];
    const cultura: CulturaGastronomicaEntity = await servicio.obtenerUno(
      culturaAlmacenada.id,
    );
    expect(cultura).not.toBeNull();
    expect(cultura.nombre).toEqual(culturaAlmacenada.nombre);
    expect(cultura.descripcion).toEqual(culturaAlmacenada.descripcion);
    expect(cultura.img).toEqual(culturaAlmacenada.img);
  });

  it('obtenerUno debería arrojar un excepcion por clutura gastronomica inválida', async () => {
    await expect(() => servicio.obtenerUno('9999999')).rejects.toHaveProperty(
      'mensaje',
      'CulturaGastronomica dada no fue encontrada.',
    );
  });

  it('crear debería retornar una nueva cultura gastronomica', async () => {
    const cultura: CulturaGastronomicaEntity = {
      id: '0',
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      img: faker.image.imageUrl(),
      recetas: [],
      paises: [],
      productos: []
    };

    const nuevaCultura: CulturaGastronomicaEntity = await servicio.crear(
      cultura,
    );
    expect(nuevaCultura).not.toBeNull();

    const culturaAlmacenada: CulturaGastronomicaEntity =
      await repositorio.findOne({ where: { id: nuevaCultura.id } });
    expect(culturaAlmacenada).not.toBeNull();
    expect(culturaAlmacenada.nombre).toEqual(nuevaCultura.nombre);
    expect(culturaAlmacenada.descripcion).toEqual(nuevaCultura.descripcion);
    expect(culturaAlmacenada.img).toEqual(nuevaCultura.img);
  });

  it('actualizar debería modificar una cultura gastronomica', async () => {
    const cultura: CulturaGastronomicaEntity = listaCulturas[0];
    cultura.nombre = 'Nuevo nombre';
    cultura.descripcion = 'Nueva descripcion';

    const culturaActualizada: CulturaGastronomicaEntity =
      await servicio.actualizar(cultura.id, cultura);

    const culturaAlmacenada: CulturaGastronomicaEntity =
      await repositorio.findOne({ where: { id: cultura.id } });
    expect(culturaAlmacenada).not.toBeNull();
    expect(culturaAlmacenada.nombre).toEqual(cultura.nombre);
    expect(culturaAlmacenada.descripcion).toEqual(cultura.descripcion);
  });

  it('actualizar debería arrojar una excepcion por cultura gastronomica inválida', async () => {
    const cultura: CulturaGastronomicaEntity = listaCulturas[0];
    cultura.nombre = 'Nuevo nombre';
    cultura.descripcion = 'Nueva descripcion';

    await expect(() =>
      servicio.actualizar('0', cultura),
    ).rejects.toHaveProperty(
      'mensaje',
      'CulturaGastronomica dada no fue encontrada.',
    );
  });

  it('elimnar debería remover una cultura gastronomica', async () => {
    const cultura: CulturaGastronomicaEntity = listaCulturas[0];
    await servicio.eliminar(cultura.id);
    const deletedMuseum: CulturaGastronomicaEntity = await repositorio.findOne({
      where: { id: cultura.id },
    });
    expect(deletedMuseum).toBeNull();
  });

  it('elimnar debería arrojar una excepcion por cultura gastronomica inválida', async () => {
    const cultura: CulturaGastronomicaEntity = listaCulturas[0];
    await expect(() => servicio.eliminar('0')).rejects.toHaveProperty(
      'mensaje',
      'CulturaGastronomica dada no fue encontrada.',
    );
  });
});
