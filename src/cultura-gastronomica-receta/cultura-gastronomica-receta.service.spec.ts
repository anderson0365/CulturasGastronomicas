import { Test, TestingModule } from '@nestjs/testing';
import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { Repository } from 'typeorm';
import { TypeOrmConfiguracionPruebas } from '../compartido/utilidades-pruebas/typeorm-configuracion-pruebas';
import { CulturaGastronomicaRecetaService } from './cultura-gastronomica-receta.service';
import { RecetaEntity } from '../receta/receta.entity';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CulturaGastronomicaRecetaService', () => {
  let servicio: CulturaGastronomicaRecetaService;
  let repositorioCulturaGastronomica: Repository<CulturaGastronomicaEntity>;
  let repositorioReceta: Repository<RecetaEntity>;
  let listaRecetas: RecetaEntity[];
  let cultura: CulturaGastronomicaEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmConfiguracionPruebas()],
      providers: [CulturaGastronomicaRecetaService],
    }).compile();

    servicio = module.get<CulturaGastronomicaRecetaService>(
      CulturaGastronomicaRecetaService,
    );

    repositorioCulturaGastronomica = module.get<
      Repository<CulturaGastronomicaEntity>
    >(getRepositoryToken(CulturaGastronomicaEntity));

    repositorioReceta = module.get<Repository<RecetaEntity>>(
      getRepositoryToken(RecetaEntity),
    );

    await inicializarBaseDeDatos();
  });

  const inicializarBaseDeDatos = async () => {
    repositorioReceta.clear();
    repositorioCulturaGastronomica.clear();

    listaRecetas = [];
    for (let i = 0; i < 5; i++) {
      const receta: RecetaEntity = await repositorioReceta.save({
        nombre: faker.company.name(),
        descripcion: faker.lorem.sentence(),
        imagen: faker.image.imageUrl(),
        video: faker.image.imageUrl(),
        proceso: faker.lorem.sentence(),
        culturaGastronomica: null,
        restaurantes: [],
      });
      listaRecetas.push(receta);
    }

    cultura = await repositorioCulturaGastronomica.save({
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      img: faker.image.imageUrl(),
      recetas: listaRecetas,
      paises: [],
      productos: [],
    });
  };

  it('deber??a estar definido', () => {
    expect(servicio).toBeDefined();
  });

  it('agregarRecetaCulturaGastronomica deber??a agregar receta a cultura gastron??mica.', async () => {
    const nuevaReceta: RecetaEntity = await repositorioReceta.save({
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      imagen: faker.image.imageUrl(),
      video: faker.image.imageUrl(),
      proceso: faker.lorem.sentence(),
      culturaGastronomica: null,
      restaurantes: [],
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
      await servicio.agregarRecetaCulturaGastronomica(
        nuevaCultura.id,
        nuevaReceta.id,
      );

    expect(result.recetas.length).toBe(1);
    expect(result.recetas[0]).not.toBeNull();
    expect(result.recetas[0].nombre).toBe(nuevaReceta.nombre);
    expect(result.recetas[0].descripcion).toBe(nuevaReceta.descripcion);
    expect(result.recetas[0].imagen).toBe(nuevaReceta.imagen);
    expect(result.recetas[0].video).toBe(nuevaReceta.video);
    expect(result.recetas[0].proceso).toBe(nuevaReceta.proceso);
  });

  it('agregarRecetaCulturaGastronomica deber??a arrojar excepcion de receta inv??lida.', async () => {
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
      servicio.agregarRecetaCulturaGastronomica(nuevaCultura.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'Receta dada no fue encontrada.');
  });

  it('agregarRecetaCulturaGastronomica deber??a arrojar excepcion de cultura gastron??mica inv??lida.', async () => {
    const nuevaReceta: RecetaEntity = await repositorioReceta.save({
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      imagen: faker.image.imageUrl(),
      video: faker.image.imageUrl(),
      proceso: faker.lorem.sentence(),
      culturaGastronomica: null,
      restaurantes: [],
    });

    await expect(() =>
      servicio.agregarRecetaCulturaGastronomica('0', nuevaReceta.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'CulturaGastronomica dada no fue encontrada.',
    );
  });

  it('obtenerRecetaCulturaGastronomica deber??a retornar una receta de la cultura gastron??mica.', async () => {
    const receta: RecetaEntity = listaRecetas[0];
    const recetaAlmacenada: RecetaEntity =
      await servicio.obtenerRecetaCulturaGastronomica(cultura.id, receta.id);
    expect(recetaAlmacenada).not.toBeNull();
    expect(recetaAlmacenada.nombre).toBe(receta.nombre);
    expect(recetaAlmacenada.descripcion).toBe(receta.descripcion);
    expect(recetaAlmacenada.imagen).toBe(receta.imagen);
    expect(recetaAlmacenada.video).toBe(receta.video);
    expect(recetaAlmacenada.proceso).toBe(receta.proceso);
  });

  it('obtenerRecetaCulturaGastronomica deber??a arrojar excepcion de receta inv??lida.', async () => {
    await expect(() =>
      servicio.obtenerRecetaCulturaGastronomica(cultura.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'Receta dada no fue encontrada.');
  });

  it('obtenerRecetaCulturaGastronomica deber??a arrojar excepcion de cultura gastron??mica inv??lida.', async () => {
    const receta: RecetaEntity = listaRecetas[0];
    await expect(() =>
      servicio.obtenerRecetaCulturaGastronomica('0', receta.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'CulturaGastronomica dada no fue encontrada.',
    );
  });

  it('obtenerRecetaCulturaGastronomica deber??a arrojar excepcion de receta no asociada a cultura gastron??mica.', async () => {
    const nuevaReceta: RecetaEntity = await repositorioReceta.save({
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      imagen: faker.image.imageUrl(),
      video: faker.image.imageUrl(),
      proceso: faker.lorem.sentence(),
      culturaGastronomica: null,
      restaurantes: [],
    });

    await expect(() =>
      servicio.obtenerRecetaCulturaGastronomica(cultura.id, nuevaReceta.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'Receta dada no se encuentra asociada a CulturaGastronomica dada.',
    );
  });

  it('obtenerTodasRecetasDeCulturaGastronomica deber??a retornar todas las recetas de una cultura gastronomica.', async () => {
    const recetas: RecetaEntity[] =
      await servicio.obtenerTodasRecetasDeCulturaGastronomica(cultura.id);
    expect(recetas.length).toBe(5);
  });

  it('obtenerTodasRecetasDeCulturaGastronomica deber??a arrojar excepcion de cultura gastron??mica inv??lida.', async () => {
    await expect(() =>
      servicio.obtenerTodasRecetasDeCulturaGastronomica('0'),
    ).rejects.toHaveProperty(
      'mensaje',
      'CulturaGastronomica dada no fue encontrada.',
    );
  });

  it('asociarRecetasCulturaGastronomica deber??a actualizar la lista de recetas de una cultura gastron??mica.', async () => {
    const nuevaReceta: RecetaEntity = await repositorioReceta.save({
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      imagen: faker.image.imageUrl(),
      video: faker.image.imageUrl(),
      proceso: faker.lorem.sentence(),
      culturaGastronomica: null,
      restaurantes: [],
    });

    const culturaActualizada: CulturaGastronomicaEntity =
      await servicio.asociarRecetasCulturaGastronomica(cultura.id, [
        nuevaReceta,
      ]);
    expect(culturaActualizada.recetas.length).toBe(1);

    expect(culturaActualizada.recetas[0].nombre).toBe(nuevaReceta.nombre);
    expect(culturaActualizada.recetas[0].descripcion).toBe(nuevaReceta.descripcion);
    expect(culturaActualizada.recetas[0].imagen).toBe(nuevaReceta.imagen);
    expect(culturaActualizada.recetas[0].video).toBe(nuevaReceta.video);
    expect(culturaActualizada.recetas[0].proceso).toBe(nuevaReceta.proceso);
  });

  it('asociarRecetasCulturaGastronomica deber??a arrojar excepcion de cultura gastron??mica inv??lida.', async () => {
    const nuevaReceta: RecetaEntity = await repositorioReceta.save({
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      imagen: faker.image.imageUrl(),
      video: faker.image.imageUrl(),
      proceso: faker.lorem.sentence(),
      culturaGastronomica: null,
      restaurantes: [],
    });

    await expect(() =>
      servicio.asociarRecetasCulturaGastronomica('0', [nuevaReceta]),
    ).rejects.toHaveProperty(
      'mensaje',
      'CulturaGastronomica dada no fue encontrada.',
    );
  });

  it('asociarRecetasCulturaGastronomica deber??a arrojar excepcion de receta inv??lida.', async () => {
    const nuevaReceta: RecetaEntity = listaRecetas[0];
    nuevaReceta.id = '0';

    await expect(() =>
      servicio.asociarRecetasCulturaGastronomica(cultura.id, [nuevaReceta]),
    ).rejects.toHaveProperty('mensaje', 'Receta dada no fue encontrada.');
  });

  it('eliminarRecetaCulturaGastronomica deber??a remover una receta de cultura gastron??mica.', async () => {
    const receta: RecetaEntity = listaRecetas[0];

    await servicio.eliminarRecetaCulturaGastronomica(cultura.id, receta.id);

    const culturaAlmacenada: CulturaGastronomicaEntity =
      await repositorioCulturaGastronomica.findOne({
        where: { id: cultura.id },
        relations: ['recetas'],
      });
    const recetaEliminada: RecetaEntity = culturaAlmacenada.recetas.find(
      (a) => a.id === receta.id,
    );

    expect(recetaEliminada).toBeUndefined();
  });

  it('eliminarRecetaCulturaGastronomica deber??a arrojar excepcion de receta inv??lida.', async () => {
    await expect(() =>
      servicio.eliminarRecetaCulturaGastronomica(cultura.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'Receta dada no fue encontrada.');
  });

  it('eliminarRecetaCulturaGastronomica  deber??a arrojar excepcion de cultura gastron??mica inv??lida.', async () => {
    const receta: RecetaEntity = listaRecetas[0];
    await expect(() =>
      servicio.eliminarRecetaCulturaGastronomica('0', receta.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'CulturaGastronomica dada no fue encontrada.',
    );
  });

  it('eliminarRecetaCulturaGastronomica deber??a arrojar excepcion de receta no asociada a cultura gastron??mica.', async () => {
    const nuevaReceta: RecetaEntity = await repositorioReceta.save({
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      imagen: faker.image.imageUrl(),
      video: faker.image.imageUrl(),
      proceso: faker.lorem.sentence(),
      culturaGastronomica: null,
      restaurantes: [],
    });

    await expect(() =>
      servicio.eliminarRecetaCulturaGastronomica(cultura.id, nuevaReceta.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'Receta dada no se encuentra asociada a CulturaGastronomica dada.',
    );
  });
});
