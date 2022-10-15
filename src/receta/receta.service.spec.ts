import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmConfiguracionPruebas } from '../compartido/utilidades-pruebas/typeorm-configuracion-pruebas';
import { faker } from '@faker-js/faker';
import { RecetaService } from './receta.service';
import { RecetaEntity } from './receta.entity';

describe('RecetaService', () => {
  let service: RecetaService;
  let recetasList: RecetaEntity[];
  let repository: Repository<RecetaEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmConfiguracionPruebas()],
      providers: [RecetaService],
    }).compile();

    service = module.get<RecetaService>(RecetaService);
    repository = module.get<Repository<RecetaEntity>>(
      getRepositoryToken(RecetaEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    recetasList = [];
    for (let i = 0; i < 5; i++) {
      const receta: RecetaEntity = await repository.save({
        nombre: faker.lorem.sentence(),
        descripcion: faker.lorem.sentence(),
        imagen: faker.image.imageUrl(),
        video: faker.image.imageUrl(),
        proceso: faker.lorem.sentence(),
        restaurantes: [],
      });
      recetasList.push(receta);
    }
  };

  it('Crear debería retornar una nueva receta', async () => {
    const receta: RecetaEntity = {
      id: '',
      nombre: faker.lorem.sentence(),
      descripcion: faker.lorem.sentence(),
      imagen: faker.image.imageUrl(),
      video: faker.image.imageUrl(),
      proceso: faker.lorem.sentence(),
      culturaGastronomica: null,
      restaurantes: [],
    };

    const newReceta: RecetaEntity = await service.create(receta);
    expect(newReceta).not.toBeNull();

    const storedReceta: RecetaEntity = await repository.findOne({
      where: { id: newReceta.id },
    });
    expect(storedReceta).not.toBeNull();
    expect(storedReceta.nombre).toEqual(newReceta.nombre);
    expect(storedReceta.descripcion).toEqual(newReceta.descripcion);
    expect(storedReceta.imagen).toEqual(newReceta.imagen);
    expect(storedReceta.video).toEqual(newReceta.video);
    expect(storedReceta.proceso).toEqual(newReceta.proceso);
  });

  it('Obtener todos debería retornar todas las recetas', async () => {
    const recetas: RecetaEntity[] = await service.findAll();
    expect(recetas).not.toBeNull();
    expect(recetas).toHaveLength(recetasList.length);
  });

  it('Obtener una debería retornar una receta por id', async () => {
    const storedReceta: RecetaEntity = recetasList[0];
    const receta: RecetaEntity = await service.findOne(storedReceta.id);
    expect(receta).not.toBeNull();
    expect(receta.nombre).toEqual(storedReceta.nombre);
    expect(receta.descripcion).toEqual(storedReceta.descripcion);
    expect(receta.imagen).toEqual(storedReceta.imagen);
    expect(receta.video).toEqual(storedReceta.video);
    expect(receta.proceso).toEqual(storedReceta.proceso);
  });


  it('actualizar debería modificar una receta', async () => {
    const receta: RecetaEntity = recetasList[0];
    receta.nombre = 'Nuevo nombre';
    receta.proceso = 'Cambio en proceso';

    const updatedReceta: RecetaEntity = await service.update(receta.id, receta);
    expect(updatedReceta).not.toBeNull();

    const storedReceta: RecetaEntity = await repository.findOne({
      where: { id: receta.id },
    });
    expect(storedReceta).not.toBeNull();
    expect(storedReceta.nombre).toEqual(receta.nombre);
    expect(storedReceta.proceso).toEqual(receta.proceso);
  });

  it('eliminar debería eliminar una receta', async () => {
    const receta: RecetaEntity = recetasList[0];
    await service.delete(receta.id);

    const deletedReceta: RecetaEntity = await repository.findOne({
      where: { id: receta.id },
    });
    expect(deletedReceta).toBeNull();
  });
});
