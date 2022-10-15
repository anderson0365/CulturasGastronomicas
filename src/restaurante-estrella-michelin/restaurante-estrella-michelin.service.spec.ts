/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TypeOrmConfiguracionPruebas } from '../compartido/utilidades-pruebas/typeorm-configuracion-pruebas';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RestauranteEstrellaMichelinService } from './restaurante-estrella-michelin.service';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { EstrellaMichelinEntity } from '../estrella-michelin/estrella-michelin.entity';

describe('RestauranteEstrellaMichelinService', () => {
  let servicio: RestauranteEstrellaMichelinService;
  let repositorioRestaurante: Repository<RestauranteEntity>;
  let repositorioEstrellaMichelin: Repository<EstrellaMichelinEntity>;
  let listaEstrellaMichelins: EstrellaMichelinEntity[];
  let restaurante: RestauranteEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmConfiguracionPruebas()],
      providers: [RestauranteEstrellaMichelinService],
    }).compile();

    servicio = module.get<RestauranteEstrellaMichelinService>(
      RestauranteEstrellaMichelinService,
    );

    repositorioRestaurante = module.get<
      Repository<RestauranteEntity>
    >(getRepositoryToken(RestauranteEntity));

    repositorioEstrellaMichelin = module.get<Repository<EstrellaMichelinEntity>>(
      getRepositoryToken(EstrellaMichelinEntity),
    );

    await inicializarBaseDeDatos();
  });

  const inicializarBaseDeDatos = async () => {
    repositorioEstrellaMichelin.clear();
    repositorioRestaurante.clear();

    listaEstrellaMichelins = [];
    for (let i = 0; i < 3; i++) {
      const estrellaMichelin: EstrellaMichelinEntity = await repositorioEstrellaMichelin.save({
        fechaDeObtencion: faker.lorem.sentence()
      });
      listaEstrellaMichelins.push(estrellaMichelin);
    }

    restaurante = await repositorioRestaurante.save({
      nombre: faker.company.name(),
      img: faker.image.imageUrl(),
      estrellasMichelin: listaEstrellaMichelins,
      ciudad: null,
      recetas: [],
    });
  };

  it('debería estar definido', () => {
    expect(servicio).toBeDefined();
  });

  it('agregarEstrellaMichelinRestaurante debería agregar estrellaMichelin a restaurante.', async () => {
    const nuevaEstrellaMichelin: EstrellaMichelinEntity = await repositorioEstrellaMichelin.save({
      fechaDeObtencion: faker.lorem.sentence()
    });

    const nuevoRestaurante: RestauranteEntity =
      await repositorioRestaurante.save({
        nombre: faker.company.name(),
      img: faker.image.imageUrl(),
      estrellasMichelin: [],
      ciudad: null,
      recetas: [],
      });

    const result: RestauranteEntity =
      await servicio.addEstrellaMichelinRestaurante(
        nuevoRestaurante.id,
        nuevaEstrellaMichelin.id,
      );

    expect(result.estrellasMichelin.length).toBe(1);
    expect(result.estrellasMichelin[0]).not.toBeNull();
    expect(result.estrellasMichelin[0].fechaDeObtencion).toBe(nuevaEstrellaMichelin.fechaDeObtencion);
  });

  it('agregarEstrellaMichelinRestaurante debería arrojar excepcion de estrellaMichelin inválida.', async () => {
    const nuevoRestaurante: RestauranteEntity =
      await repositorioRestaurante.save({
        nombre: faker.company.name(),
        img: faker.image.imageUrl(),
        estrellasMichelin: [],
        ciudad: null,
        recetas: [],
      });

    await expect(() =>
      servicio.addEstrellaMichelinRestaurante(nuevoRestaurante.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'La estrella michelin con el id dado no fue encontrada');
  });

  it('agregarEstrellaMichelinRestaurante debería arrojar excepcion de restaurante inválido.', async () => {
    const nuevaEstrellaMichelin: EstrellaMichelinEntity = await repositorioEstrellaMichelin.save({
      fechaDeObtencion: faker.lorem.sentence()
    });

    await expect(() =>
      servicio.addEstrellaMichelinRestaurante('0', nuevaEstrellaMichelin.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'El restaurante con el id dado no fue encontrado',
    );
  });

  it('obtenerEstrellaMichelinRestaurante debería retornar una estrellaMichelin del restaurante.', async () => {
    const estrellaMichelin: EstrellaMichelinEntity = listaEstrellaMichelins[0];
    const estrellaMichelinAlmacenada: EstrellaMichelinEntity =
      await servicio.findEstrellaMichelinByRestauranteIdEstrellaMichelinId(restaurante.id, estrellaMichelin.id);
    expect(estrellaMichelinAlmacenada).not.toBeNull();
    expect(estrellaMichelinAlmacenada.fechaDeObtencion).toBe(estrellaMichelin.fechaDeObtencion);
  });

  it('obtenerEstrellaMichelinRestaurante debería arrojar excepcion de estrellaMichelin inválida.', async () => {
    await expect(() =>
      servicio.findEstrellaMichelinByRestauranteIdEstrellaMichelinId(restaurante.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'La estrella michelin con el id dado no fue encontrada');
  });

  it('obtenerEstrellaMichelinRestaurante debería arrojar excepcion de restaurante gastronómica inválida.', async () => {
    const estrellaMichelin: EstrellaMichelinEntity = listaEstrellaMichelins[0];
    await expect(() =>
      servicio.findEstrellaMichelinByRestauranteIdEstrellaMichelinId('0', estrellaMichelin.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'El restaurante con el id dado no fue encontrado',
    );
  });

  it('obtenerEstrellaMichelinRestaurante debería arrojar excepcion de estrellaMichelin no asociada a restaurante gastronómica.', async () => {
    const nuevaEstrellaMichelin: EstrellaMichelinEntity = await repositorioEstrellaMichelin.save({
      fechaDeObtencion: faker.lorem.sentence()
    });

    await expect(() =>
      servicio.findEstrellaMichelinByRestauranteIdEstrellaMichelinId(restaurante.id, nuevaEstrellaMichelin.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'La estrella michelin con el id dado no está asociada al restaurante',
    );
  });

  it('obtenerTodasEstrellaMichelinsDeRestaurante should return estrellasMichelin by restaurante', async () => {
    const estrellasMichelin: EstrellaMichelinEntity[] =
      await servicio.findEstrellaMichelinsByRestauranteId(restaurante.id);
    expect(estrellasMichelin.length).toBe(3);
  });

  it('obtenerTodasEstrellaMichelinsDeRestaurante debería arrojar excepcion de restaurante gastronómica inválida.', async () => {
    await expect(() =>
      servicio.findEstrellaMichelinsByRestauranteId('0'),
    ).rejects.toHaveProperty(
      'mensaje',
      'El restaurante con el id dado no fue encontrado',
    );
  });

  it('asociarEstrellaMichelinsRestaurante debería actualizar la lista de estrellasMichelin de una restaurante gastronómica.', async () => {
    const nuevaEstrellaMichelin: EstrellaMichelinEntity = await repositorioEstrellaMichelin.save({
      fechaDeObtencion: faker.lorem.sentence()
    });

    const restauranteActualizado: RestauranteEntity =
      await servicio.associateEstrellaMichelinsRestaurante(restaurante.id, [
        nuevaEstrellaMichelin,
      ]);
    expect(restauranteActualizado.estrellasMichelin.length).toBe(1);

    expect(restauranteActualizado.estrellasMichelin[0].fechaDeObtencion).toBe(nuevaEstrellaMichelin.fechaDeObtencion);
  });

  it('asociarEstrellaMichelinsRestaurante debería arrojar excepcion de restaurante gastronómica inválida.', async () => {
    const nuevaEstrellaMichelin: EstrellaMichelinEntity = await repositorioEstrellaMichelin.save({
      fechaDeObtencion: faker.lorem.sentence()
    });

    await expect(() =>
      servicio.associateEstrellaMichelinsRestaurante('0', [nuevaEstrellaMichelin]),
    ).rejects.toHaveProperty(
      'mensaje',
      'El restaurante con el id dado no fue encontrado',
    );
  });

  it('asociarEstrellaMichelinsRestaurante debería arrojar excepcion de restaurante gastronómica inválida.', async () => {
    const nuevaEstrellaMichelin: EstrellaMichelinEntity = listaEstrellaMichelins[0];
    nuevaEstrellaMichelin.id = '0';

    await expect(() =>
      servicio.associateEstrellaMichelinsRestaurante(restaurante.id, [nuevaEstrellaMichelin]),
    ).rejects.toHaveProperty('mensaje', 'La estrella michelin con el id dado no fue encontrada');
  });

  it('eliminarEstrellaMichelinRestaurante debería remover una estrellaMichelin de restaurante gastronómica.', async () => {
    const estrellaMichelin: EstrellaMichelinEntity = listaEstrellaMichelins[0];

    await servicio.deleteEstrellaMichelinRestaurante(restaurante.id, estrellaMichelin.id);

    const restauranteAlmacenada: RestauranteEntity =
      await repositorioRestaurante.findOne({
        where: { id: restaurante.id },
        relations: ["estrellasMichelin", "ciudad", "recetas"],
      });
    const estrellaMichelinEliminada: EstrellaMichelinEntity = restauranteAlmacenada.estrellasMichelin.find(
      (a) => a.id === estrellaMichelin.id,
    );

    expect(estrellaMichelinEliminada).toBeUndefined();
  });

  it('eliminarEstrellaMichelinRestaurante debería arrojar excepcion de estrellaMichelin inválida.', async () => {
    await expect(() =>
      servicio.deleteEstrellaMichelinRestaurante(restaurante.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'La estrella michelin con el id dado no fue encontrada');
  });

  it('eliminarEstrellaMichelinRestaurante  debería arrojar excepcion de restaurante gastronómica inválida.', async () => {
    const estrellaMichelin: EstrellaMichelinEntity = listaEstrellaMichelins[0];
    await expect(() =>
      servicio.deleteEstrellaMichelinRestaurante('0', estrellaMichelin.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'El restaurante con el id dado no fue encontrado',
    );
  });

  it('eliminarEstrellaMichelinRestaurante debería arrojar excepcion de estrellaMichelin no asociada a restaurante gastronómica.', async () => {
    const nuevaEstrellaMichelin: EstrellaMichelinEntity = await repositorioEstrellaMichelin.save({
      fechaDeObtencion: faker.lorem.sentence()
    });

    await expect(() =>
      servicio.deleteEstrellaMichelinRestaurante(restaurante.id, nuevaEstrellaMichelin.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'La estrella michelin con el id dado no está asociada al restaurante',
    );
  });
});
