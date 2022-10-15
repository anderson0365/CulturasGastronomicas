import { Test, TestingModule } from '@nestjs/testing';
import { PaisCiudadService } from './pais-ciudad.service';
import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { PaisEntity } from '../pais/pais.entity';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { TypeOrmConfiguracionPruebas } from '../compartido/utilidades-pruebas/typeorm-configuracion-pruebas';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PaisCiudadService', () => {
  let servicio: PaisCiudadService;
  let repositorioPais: Repository<PaisEntity>;
  let repositorioCiudad: Repository<CiudadEntity>;
  let listaCiudades: CiudadEntity[];
  let pais: PaisEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmConfiguracionPruebas()],
      providers: [PaisCiudadService],
    }).compile();

    servicio = module.get<PaisCiudadService>(PaisCiudadService);

    repositorioPais = module.get<Repository<PaisEntity>>(
      getRepositoryToken(PaisEntity),
    );

    repositorioCiudad = module.get<Repository<CiudadEntity>>(
      getRepositoryToken(CiudadEntity),
    );

    await inicializarBaseDeDatos();
  });

  const inicializarBaseDeDatos = async () => {
    repositorioCiudad.clear();
    repositorioPais.clear();

    listaCiudades = [];
    for (let i = 0; i < 5; i++) {
      const ciudad: CiudadEntity = await repositorioCiudad.save({
        nombre: faker.company.name(),
        pais: null,
        restaurantes: [],
      });
      listaCiudades.push(ciudad);
    }

    pais = await repositorioPais.save({
      nombre: faker.company.name(),
      ciudades: listaCiudades,
      culturasGastronomicas: [],
    });
  };

  it('debería estar definido', () => {
    expect(servicio).toBeDefined();
  });

  it('agregarCiudadPais debería agregar ciudad a pais.', async () => {
    const nuevaCiudad: CiudadEntity = await repositorioCiudad.save({
      nombre: faker.company.name(),
      pais: null,
      restaurantes: [],
    });

    const nuevoPais: PaisEntity = await repositorioPais.save({
      nombre: faker.company.name(),
      ciudades: [],
      culturasGastronomicas: [],
    });

    const result: PaisEntity = await servicio.agregarCiudadPais(
      nuevoPais.id,
      nuevaCiudad.id,
    );

    expect(result.ciudades.length).toBe(1);
    expect(result.ciudades[0]).not.toBeNull();
    expect(result.ciudades[0].nombre).toBe(nuevaCiudad.nombre);
  });

  it('agregarCiudadPais debería arrojar excepcion de ciudad inválida.', async () => {
    const nuevoPais: PaisEntity = await repositorioPais.save({
      nombre: faker.company.name(),
      ciudades: [],
      culturasGastronomicas: [],
    });

    await expect(() =>
      servicio.agregarCiudadPais(nuevoPais.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'Ciudad dada no fue encontrada.');
  });

  it('agregarCiudadPais debería arrojar excepcion de pais inválido.', async () => {
    const nuevaCiudad: CiudadEntity = await repositorioCiudad.save({
      nombre: faker.company.name(),
      pais: null,
      restaurantes: [],
    });

    await expect(() =>
      servicio.agregarCiudadPais('0', nuevaCiudad.id),
    ).rejects.toHaveProperty('mensaje', 'Pais dado no fue encontrado.');
  });

  it('obtenerCiudadPais debería retornar una ciudad del pais.', async () => {
    const ciudad: CiudadEntity = listaCiudades[0];
    const recetaAlmacenada: CiudadEntity = await servicio.obtenerCiudadPais(
      pais.id,
      ciudad.id,
    );
    expect(recetaAlmacenada).not.toBeNull();
    expect(recetaAlmacenada.nombre).toBe(ciudad.nombre);
  });

  it('obtenerCiudadPais debería arrojar excepcion de ciudad inválida.', async () => {
    await expect(() =>
      servicio.obtenerCiudadPais(pais.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'Ciudad dada no fue encontrada.');
  });

  it('obtenerCiudadPais debería arrojar excepcion de pais inválido.', async () => {
    const ciudad: CiudadEntity = listaCiudades[0];
    await expect(() =>
      servicio.obtenerCiudadPais('0', ciudad.id),
    ).rejects.toHaveProperty('mensaje', 'Pais dado no fue encontrado.');
  });

  it('obtenerCiudadPais debería arrojar excepcion de ciudad no asociada a pais.', async () => {
    const nuevaCiudad: CiudadEntity = await repositorioCiudad.save({
      nombre: faker.company.name(),
      pais: null,
      restaurantes: [],
    });

    await expect(() =>
      servicio.obtenerCiudadPais(pais.id, nuevaCiudad.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'Ciudad dada no se encuentra asociada a Pais dado.',
    );
  });

  it('obtenerTodasCiudadesPais debería retornar todas las ciudades de un pais', async () => {
    const ciudades: CiudadEntity[] = await servicio.obtenerTodasCiudadesPais(
      pais.id,
    );
    expect(ciudades.length).toBe(5);
  });

  it('obtenerTodasCiudadesPais debería arrojar excepcion de pais inválido.', async () => {
    await expect(() =>
      servicio.obtenerTodasCiudadesPais('0'),
    ).rejects.toHaveProperty('mensaje', 'Pais dado no fue encontrado.');
  });

  it('asociarCiudadesPais debería actualizar la lista de ciudades de un pais.', async () => {
    const nuevaCiudad: CiudadEntity = await repositorioCiudad.save({
      nombre: faker.company.name(),
      pais: null,
      restaurantes: [],
    });

    const paisActualizado: PaisEntity = await servicio.asociarCiudadesPais(
      pais.id,
      [nuevaCiudad],
    );
    expect(paisActualizado.ciudades.length).toBe(1);

    expect(paisActualizado.ciudades[0].nombre).toBe(nuevaCiudad.nombre);
  });

  it('asociarCiudadesPais debería arrojar excepcion de pais inválido.', async () => {
    const nuevaCiudad: CiudadEntity = await repositorioCiudad.save({
      nombre: faker.company.name(),
      pais: null,
      restaurantes: [],
    });

    await expect(() =>
      servicio.asociarCiudadesPais('0', [nuevaCiudad]),
    ).rejects.toHaveProperty('mensaje', 'Pais dado no fue encontrado.');
  });

  it('asociarCiudadesPais debería arrojar excepcion de ciudad inválida.', async () => {
    const nuevaCiudad: CiudadEntity = listaCiudades[0];
    nuevaCiudad.id = '0';

    await expect(() =>
      servicio.asociarCiudadesPais(pais.id, [nuevaCiudad]),
    ).rejects.toHaveProperty('mensaje', 'Ciudad dada no fue encontrada.');
  });

  it('eliminarCiudadPais debería remover una ciudad de un pais.', async () => {
    const ciudad: CiudadEntity = listaCiudades[0];

    await servicio.eliminarCiudadPais(pais.id, ciudad.id);

    const paisAlmacenado: PaisEntity = await repositorioPais.findOne({
      where: { id: pais.id },
      relations: ['ciudades'],
    });
    const ciudadEliminada: CiudadEntity = paisAlmacenado.ciudades.find(
      (a) => a.id === ciudad.id,
    );

    expect(ciudadEliminada).toBeUndefined();
  });

  it('eliminarCiudadPais debería arrojar excepcion de ciudad inválida.', async () => {
    await expect(() =>
      servicio.eliminarCiudadPais(pais.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'Ciudad dada no fue encontrada.');
  });

  it('eliminarCiudadPais debería arrojar excepcion de pais inválido.', async () => {
    const ciudad: CiudadEntity = listaCiudades[0];
    await expect(() =>
      servicio.eliminarCiudadPais('0', ciudad.id),
    ).rejects.toHaveProperty('mensaje', 'Pais dado no fue encontrado.');
  });

  it('eliminarCiudadPais debería arrojar excepcion de ciudad no asociada a pais.', async () => {
    const nuevaCiudad: CiudadEntity = await repositorioCiudad.save({
      nombre: faker.company.name(),
      pais: null,
      restaurantes: [],
    });

    await expect(() =>
      servicio.eliminarCiudadPais(pais.id, nuevaCiudad.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'Ciudad dada no se encuentra asociada a Pais dado.',
    );
  });
});
