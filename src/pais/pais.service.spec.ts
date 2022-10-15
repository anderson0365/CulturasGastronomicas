import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaisService } from './pais.service';
import { TypeOrmConfiguracionPruebas } from '../compartido/utilidades-pruebas/typeorm-configuracion-pruebas';
import { PaisEntity } from './pais.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

describe('PaisService', () => {
  let service: PaisService;
  let repository: Repository<PaisEntity>;
  let listaPaises: PaisEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmConfiguracionPruebas()],
      providers: [PaisService],
    }).compile();

    service = module.get<PaisService>(PaisService);
    repository = module.get<Repository<PaisEntity>>(getRepositoryToken(PaisEntity));

    await alimentarBasedeDatos();
  });

  const alimentarBasedeDatos = async () => {
    repository.clear();
    listaPaises = [];
    for(let i = 0; i < 5; i++){
        const pais: PaisEntity = await repository.save({
          nombre: faker.address.country(),
          ciudades: [],
          culturasGastronomicas: []
        })
        listaPaises.push(pais);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('obtenerTodos deberia retornar todos los paises', async () => {
    const paises: PaisEntity[] = await service.obtenerTodos();
    expect(paises).not.toBeNull();
    expect(paises).toHaveLength(listaPaises.length);
  });

  it('obtenerUno deberia retornar un pais por id', async () => {
    const paisAlmacenado: PaisEntity = listaPaises[0];
    const pais: PaisEntity = await service.obtenerUno(paisAlmacenado.id);
    expect(pais).not.toBeNull();
    expect(pais.nombre).toEqual(paisAlmacenado.nombre)
  });

  it('obtenerUno deberia lanzar una Excepcion por un pais invalido', async () => {
    await expect(() => service.obtenerUno("0")).rejects.toHaveProperty(
      'mensaje', 'El pais no fue encontrado',)
  });

  it('crear deberia retornar un nuevo pais', async () => {
    const pais: PaisEntity = {
      id: "",
      nombre: faker.address.country(),
      ciudades: [],
      culturasGastronomicas: []
    }
 
    const nuevoPais: PaisEntity = await service.crear(pais);
    expect(nuevoPais).not.toBeNull();
 
    const paisAlmacenado: PaisEntity = await repository.findOne({where: {id: nuevoPais.id}})
    expect(paisAlmacenado).not.toBeNull();
    expect(paisAlmacenado.nombre).toEqual(nuevoPais.nombre)
  });

  it('actualizar deberia modificar un pais', async () => {
    const pais: PaisEntity = listaPaises[0];
    pais.nombre = "New nombre";
    
    const paisActualizado: PaisEntity = await service.actualizar(pais.id, pais);
    expect(paisActualizado).not.toBeNull();

    const paisAlmacenado: PaisEntity = await repository.findOne({ where: { id: pais.id } })
    expect(paisAlmacenado).not.toBeNull();
    expect(paisAlmacenado.nombre).toEqual(pais.nombre)
  });

  it('actualizar deberia lanzar una excepcion por un producto invalido', async () => {
    let pais: PaisEntity = listaPaises[0];
    pais.nombre = "nuevo nombre"
    
    await expect(() => service.actualizar("0", pais)).rejects.toHaveProperty("mensaje", "El pais no fue encontrado")
  });
  
  it('borrar deberia remover un pais', async () => {
    const pais: PaisEntity = listaPaises[0];
    await service.borrar(pais.id);
     const paisBorrado: PaisEntity = await repository.findOne({ where: { id: pais.id } })
    expect(paisBorrado).toBeNull();
  });

  it('borrar deberia lanzar una excepcion para un producto invalido', async () => {
    const pais: PaisEntity = listaPaises[0];
    await service.borrar(pais.id);
    await expect(() => service.borrar("0")).rejects.toHaveProperty("mensaje", "El pais no fue encontrado")
  });
});
