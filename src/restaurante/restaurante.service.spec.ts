import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmConfiguracionPruebas } from '../compartido/utilidades-pruebas/typeorm-configuracion-pruebas';
import { RestauranteEntity } from './restaurante.entity';
import { RestauranteService } from './restaurante.service';
import { faker } from '@faker-js/faker';

describe('RestauranteService', () => {
  let service: RestauranteService;
  let repository: Repository<RestauranteEntity>;
  let restaurantesList: RestauranteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmConfiguracionPruebas()],
      providers: [RestauranteService],
    }).compile();

    service = module.get<RestauranteService>(RestauranteService);
    repository = module.get<Repository<RestauranteEntity>>(
      getRepositoryToken(RestauranteEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    restaurantesList = [];
    for (let i = 0; i < 5; i++) {
      const restaurante: RestauranteEntity = await repository.save({
        id: faker.lorem.sentence(),
        nombre: faker.lorem.sentence(),
        img: faker.lorem.sentence(),
        estrellasMichelin: [],
        ciudad: null,
        recetas: [],
      });
      restaurantesList.push(restaurante);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all restaurantes', async () => {
    const restaurantes: RestauranteEntity[] = await service.findAll();
    expect(restaurantes).not.toBeNull();
    expect(restaurantes).toHaveLength(restaurantesList.length);
  });

  it('findOne should return a restaurante by id', async () => {
    const storedRestaurante: RestauranteEntity = restaurantesList[0];
    const restaurante: RestauranteEntity = await service.findOne(
      storedRestaurante.id,
    );
    expect(restaurante).not.toBeNull();
    expect(restaurante.nombre).toEqual(storedRestaurante.nombre);
    expect(restaurante.img).toEqual(storedRestaurante.img);
  });

  it('findOne should throw an exception for an invalid restaurante', async () => {
    const restaurante: RestauranteEntity = restaurantesList[0];
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'mensaje',
      'El restaurante con el id dado no fue encontrado',
    );
  });

  it('create should return a new restaurante', async () => {
    const restaurante: RestauranteEntity = {
      id: faker.lorem.sentence(),
      nombre: faker.lorem.sentence(),
      img: faker.lorem.sentence(),
      estrellasMichelin: [],
      ciudad: null,
      recetas: [],
    };

    const newRestaurante: RestauranteEntity = await service.create(restaurante);
    expect(newRestaurante).not.toBeNull();

    const storedRestaurante: RestauranteEntity = await repository.findOne({
      where: { id: newRestaurante.id },
    });
    expect(storedRestaurante).not.toBeNull();
    expect(storedRestaurante.nombre).toEqual(newRestaurante.nombre);
    expect(storedRestaurante.img).toEqual(newRestaurante.img);
  });

  it('update should modify a restaurante', async () => {
    const restaurante: RestauranteEntity = restaurantesList[0];
    restaurante.nombre = 'New name';
    restaurante.img = 'New address';

    const updatedRestaurante: RestauranteEntity = await service.update(
      restaurante.id,
      restaurante,
    );
    expect(updatedRestaurante).not.toBeNull();

    const storedRestaurante: RestauranteEntity = await repository.findOne({
      where: { id: restaurante.id },
    });
    expect(storedRestaurante).not.toBeNull();
    expect(storedRestaurante.nombre).toEqual(restaurante.nombre);
    expect(storedRestaurante.img).toEqual(restaurante.img);
  });

  it('update should throw an exception for an invalid restaurante', async () => {
    let restaurante: RestauranteEntity = restaurantesList[0];
    restaurante = {
      ...restaurante,
      nombre: 'New name',
      img: 'New address',
    };
    await expect(() => service.update('0', restaurante)).rejects.toHaveProperty(
      'mensaje',
      'El restaurante con el id dado no fue encontrado',
    );
  });

  it('delete should remove a restaurante', async () => {
    const restaurante: RestauranteEntity = restaurantesList[0];
    await service.delete(restaurante.id);

    const deletedRestaurante: RestauranteEntity = await repository.findOne({
      where: { id: restaurante.id },
    });
    expect(deletedRestaurante).toBeNull();
  });

  it('delete should throw an exception for an invalid restaurante', async () => {
    const restaurante: RestauranteEntity = restaurantesList[0];
    await service.delete(restaurante.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'mensaje',
      'El restaurante con el id dado no fue encontrado',
    );
  });
});
