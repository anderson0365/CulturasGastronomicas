import { Test, TestingModule } from '@nestjs/testing';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { Repository } from 'typeorm';
import { TypeOrmConfiguracionPruebas } from '../compartido/utilidades-pruebas/typeorm-configuracion-pruebas';
import { CiudadRestauranteService } from './ciudad-restaurante.service';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CiudadRestauranteService', () => {
  let servicio: CiudadRestauranteService;
  let repositorioCiudad: Repository<CiudadEntity>;
  let repositorioRestaurante: Repository<RestauranteEntity>;
  let listaRestaurantes: RestauranteEntity[];
  let ciudad: CiudadEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmConfiguracionPruebas()],
      providers: [CiudadRestauranteService],
    }).compile();

    servicio = module.get<CiudadRestauranteService>(
      CiudadRestauranteService,
    );

    repositorioCiudad = module.get<
      Repository<CiudadEntity>
    >(getRepositoryToken(CiudadEntity));

    repositorioRestaurante = module.get<Repository<RestauranteEntity>>(
      getRepositoryToken(RestauranteEntity),
    );

    await inicializarBaseDeDatos();
  });

  const inicializarBaseDeDatos = async () => {
    repositorioRestaurante.clear();
    repositorioCiudad.clear();

    listaRestaurantes = [];
    for (let i = 0; i < 5; i++) {
      const restaurante: RestauranteEntity = await repositorioRestaurante.save({
        nombre: faker.company.name(),
        img: faker.image.imageUrl(),
        ciudad: null,
        restaurantes: [],
      });
    }

    ciudad = await repositorioCiudad.save({
      nombre: faker.company.name(),
      restaurantes: listaRestaurantes,
    });
  };

  it('debería estar definido', () => {
    expect(servicio).toBeDefined();
  });

  it('agregarRestauranteCiudad debería agregar restaurante a ciudad.', async () => {
    const nuevoRestaurante: RestauranteEntity = await repositorioRestaurante.save({
      nombre: faker.company.name(),
      img: faker.image.imageUrl(),
      ciudad: null,
    });

    const nuevaCiudad: CiudadEntity =
      await repositorioCiudad.save({
        nombre: faker.company.name(),
        paises: [],
      });

    const result: CiudadEntity =
      await servicio.agregarRestauranteCiudad(
        nuevaCiudad.id,
        nuevoRestaurante.id,
      );

    expect(result.restaurantes.length).toBe(1);
    expect(result.restaurantes[0]).not.toBeNull();
    expect(result.restaurantes[0].nombre).toBe(nuevoRestaurante.nombre);
    expect(result.restaurantes[0].img).toBe(nuevoRestaurante.img);
  });

  it('agregarRestauranteCiudad debería arrojar excepcion de restaurante inválido.', async () => {
    const nuevaCiudad: CiudadEntity =
      await repositorioCiudad.save({
        nombre: faker.company.name(),
        restaurantes: [],
      });

    await expect(() =>
      servicio.agregarRestauranteCiudad(nuevaCiudad.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'Restaurante dado no fue encontrado.');
  });

  it('agregarRestauranteCiudad debería arrojar excepcion de ciudad inválida.', async () => {
    const nuevoRestaurante: RestauranteEntity = await repositorioRestaurante.save({
      nombre: faker.company.name(),
      img: faker.image.imageUrl(),
      ciudad: null,
    });

    await expect(() =>
      servicio.agregarRestauranteCiudad('0', nuevoRestaurante.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'Ciudad dada no fue encontrada.',
    );
  });


  it('obtenerRestauranteCiudad debería arrojar excepcion de restaurante inválida.', async () => {
    await expect(() =>
      servicio.obtenerRestauranteCiudad(ciudad.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'Restaurante dado no fue encontrado.');
  });

  
  
  it('asociarRestaurantesCiudad debería actualizar la lista de restaurantes de una ciudad.', async () => {
    const nuevoRestaurante: RestauranteEntity = await repositorioRestaurante.save({
      nombre: faker.company.name(),
      img: faker.image.imageUrl(),
      ciudad: null,
    });

    const updatedMuseum: CiudadEntity =
      await servicio.asociarRestaurantesCiudad(ciudad.id, [
        nuevoRestaurante,
      ]);
    expect(updatedMuseum.restaurantes.length).toBe(1);

    expect(updatedMuseum.restaurantes[0].nombre).toBe(nuevoRestaurante.nombre);
    expect(updatedMuseum.restaurantes[0].img).toBe(nuevoRestaurante.img);
  });



  it('eliminarRestauranteCiudad debería arrojar excepcion de restaurante inválido.', async () => {
    await expect(() =>
      servicio.eliminarRestauranteCiudad(ciudad.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'Restaurante dado no fue encontrado.');
  });


  it('eliminarRestauranteCiudad debería arrojar excepcion de restaurante no asociado a ciudad.', async () => {
    const nuevoRestaurante: RestauranteEntity = await repositorioRestaurante.save({
      nombre: faker.company.name(),
      img: faker.image.imageUrl(),
      ciudad: null,
    });

    await expect(() =>
      servicio.eliminarRestauranteCiudad(ciudad.id, nuevoRestaurante.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'Restaurante dado no se encuentra asociado a Ciudad dada.',
    );
  });
});
