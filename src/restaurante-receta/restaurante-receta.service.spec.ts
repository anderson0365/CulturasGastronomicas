/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { RecetaEntity } from '../receta/receta.entity';
import { Repository } from 'typeorm';
import { RestauranteRecetaService } from '../restaurante-receta/restaurante-receta.service';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { TypeOrmConfiguracionPruebas } from '../compartido/utilidades-pruebas/typeorm-configuracion-pruebas';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('RestauranteRecetaService', () => {
  let servicio: RestauranteRecetaService;
  let repositorioRestaurante: Repository<RestauranteEntity>;
  let repositorioReceta: Repository<RecetaEntity>;
  let listaRecetas: RecetaEntity[];
  let cultura: RestauranteEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmConfiguracionPruebas()],
      providers: [RestauranteRecetaService],
    }).compile();

    servicio = module.get<RestauranteRecetaService>(
      RestauranteRecetaService,
    );

    repositorioRestaurante = module.get<
      Repository<RestauranteEntity>
    >(getRepositoryToken(RestauranteEntity));

    repositorioReceta = module.get<Repository<RecetaEntity>>(
      getRepositoryToken(RecetaEntity),
    );

    await inicializarBaseDeDatos();
  });

  const inicializarBaseDeDatos = async () => {
    repositorioReceta.clear();
    repositorioRestaurante.clear();

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

    cultura = await repositorioRestaurante.save({
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      img: faker.image.imageUrl(),
      recetas: listaRecetas,
      paises: [],
      productos: [],
    });
  };

  it('debería estar definido', () => {
    expect(servicio).toBeDefined();
  });

  it('agregarRecetaRestaurante debería agregar receta a cultura gastronómica.', async () => {
    const nuevaReceta: RecetaEntity = await repositorioReceta.save({
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      imagen: faker.image.imageUrl(),
      video: faker.image.imageUrl(),
      proceso: faker.lorem.sentence(),
      culturaGastronomica: null,
      restaurantes: [],
    });

    const nuevaCultura: RestauranteEntity =
      await repositorioRestaurante.save({
        nombre: faker.company.name(),
        descripcion: faker.lorem.sentence(),
        img: faker.image.imageUrl(),
        recetas: [],
        paises: [],
        productos: [],
      });

    const result: RestauranteEntity =
      await servicio.agregarRecetaRestaurante(
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

  it('agregarRecetaRestaurante debería arrojar excepcion de receta inválida.', async () => {
    const nuevaCultura: RestauranteEntity =
      await repositorioRestaurante.save({
        nombre: faker.company.name(),
        descripcion: faker.lorem.sentence(),
        img: faker.image.imageUrl(),
        recetas: [],
        paises: [],
        productos: [],
      });

    await expect(() =>
      servicio.agregarRecetaRestaurante(nuevaCultura.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'Receta dada no fue encontrada.');
  });

  it('agregarRecetaRestaurante debería arrojar excepcion de cultura gastronómica inválida.', async () => {
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
      servicio.agregarRecetaRestaurante('0', nuevaReceta.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'Restaurante dada no fue encontrada.',
    );
  });

  it('obtenerRecetaRestaurante debería retornar una receta de la cultura gastronómica.', async () => {
    const receta: RecetaEntity = listaRecetas[0];
    const recetaAlmacenada: RecetaEntity =
      await servicio.obtenerRecetaRestaurante(cultura.id, receta.id);
    expect(recetaAlmacenada).not.toBeNull();
    expect(recetaAlmacenada.nombre).toBe(receta.nombre);
    expect(recetaAlmacenada.descripcion).toBe(receta.descripcion);
    expect(recetaAlmacenada.imagen).toBe(receta.imagen);
    expect(recetaAlmacenada.video).toBe(receta.video);
    expect(recetaAlmacenada.proceso).toBe(receta.proceso);
  });

  it('obtenerRecetaRestaurante debería arrojar excepcion de receta inválida.', async () => {
    await expect(() =>
      servicio.obtenerRecetaRestaurante(cultura.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'Receta dada no fue encontrada.');
  });

  it('obtenerRecetaRestaurante debería arrojar excepcion de cultura gastronómica inválida.', async () => {
    const receta: RecetaEntity = listaRecetas[0];
    await expect(() =>
      servicio.obtenerRecetaRestaurante('0', receta.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'Restaurante dada no fue encontrada.',
    );
  });

  it('obtenerRecetaRestaurante debería arrojar excepcion de receta no asociada a cultura gastronómica.', async () => {
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
      servicio.obtenerRecetaRestaurante(cultura.id, nuevaReceta.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'Receta dada no se encuentra asociada a Restaurante dado.',
    );
  });

  it('obtenerTodasRecetasDeRestaurante should return recetas by cultura', async () => {
    const recetas: RecetaEntity[] =
      await servicio.obtenerTodasRecetasDeRestaurante(cultura.id);
    expect(recetas.length).toBe(5);
  });

  it('obtenerTodasRecetasDeRestaurante debería arrojar excepcion de cultura gastronómica inválida.', async () => {
    await expect(() =>
      servicio.obtenerTodasRecetasDeRestaurante('0'),
    ).rejects.toHaveProperty(
      'mensaje',
      'Restaurante dada no fue encontrada.',
    );
  });

  it('asociarRecetasRestaurante debería actualizar la lista de recetas de una cultura gastronómica.', async () => {
    const nuevaReceta: RecetaEntity = await repositorioReceta.save({
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      imagen: faker.image.imageUrl(),
      video: faker.image.imageUrl(),
      proceso: faker.lorem.sentence(),
      culturaGastronomica: null,
      restaurantes: [],
    });

    const culturaActualizada: RestauranteEntity =
      await servicio.asociarRecetasRestaurante(cultura.id, [
        nuevaReceta,
      ]);
    expect(culturaActualizada.recetas.length).toBe(1);

    expect(culturaActualizada.recetas[0].nombre).toBe(nuevaReceta.nombre);
    expect(culturaActualizada.recetas[0].descripcion).toBe(nuevaReceta.descripcion);
    expect(culturaActualizada.recetas[0].imagen).toBe(nuevaReceta.imagen);
    expect(culturaActualizada.recetas[0].video).toBe(nuevaReceta.video);
    expect(culturaActualizada.recetas[0].proceso).toBe(nuevaReceta.proceso);
  });

  it('asociarRecetasRestaurante debería arrojar excepcion de cultura gastronómica inválida.', async () => {
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
      servicio.asociarRecetasRestaurante('0', [nuevaReceta]),
    ).rejects.toHaveProperty(
      'mensaje',
      'Restaurante dada no fue encontrada.',
    );
  });

  it('asociarRecetasRestaurante debería arrojar excepcion de cultura gastronómica inválida.', async () => {
    const nuevaReceta: RecetaEntity = listaRecetas[0];
    nuevaReceta.id = '0';

    await expect(() =>
      servicio.asociarRecetasRestaurante(cultura.id, [nuevaReceta]),
    ).rejects.toHaveProperty('mensaje', 'Receta dada no fue encontrada.');
  });

  it('eliminarRecetaRestaurante debería remover una receta del restaurante.', async () => {
    const receta: RecetaEntity = listaRecetas[0];

    await servicio.eliminarRecetaRestaurante(cultura.id, receta.id);

    const culturaAlmacenada: RestauranteEntity =
      await repositorioRestaurante.findOne({
        where: { id: cultura.id },
        relations: ['recetas'],
      });
    const recetaEliminada: RecetaEntity = culturaAlmacenada.recetas.find(
      (a) => a.id === receta.id,
    );

    expect(recetaEliminada).toBeUndefined();
  });

  it('eliminarRecetaRestaurante debería arrojar excepcion de receta inválida.', async () => {
    await expect(() =>
      servicio.eliminarRecetaRestaurante(cultura.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'Receta dada no fue encontrada.');
  });

  it('eliminarRecetaRestaurante  debería arrojar excepcion de receta inválida.', async () => {
    const receta: RecetaEntity = listaRecetas[0];
    await expect(() =>
      servicio.eliminarRecetaRestaurante('0', receta.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'Restaurante dada no fue encontrada.',
    );
  });

  it('eliminarRecetaRestaurante debería arrojar excepcion de receta no asociada a cultura gastronómica.', async () => {
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
      servicio.eliminarRecetaRestaurante(cultura.id, nuevaReceta.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'Receta dada no se encuentra asociada a Restaurante dado.',
    );
  });
});
