import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductoService } from './producto.service';
import { TypeOrmConfiguracionPruebas } from '../compartido/utilidades-pruebas/typeorm-configuracion-pruebas';
import { ProductoEntity } from './producto.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

describe('ProductoService', () => {
  let service: ProductoService;
  let repository: Repository<ProductoEntity>;
  let listaProductos: ProductoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmConfiguracionPruebas()],
      providers: [ProductoService],
    }).compile();

    service = module.get<ProductoService>(ProductoService);
    repository = module.get<Repository<ProductoEntity>>(
      getRepositoryToken(ProductoEntity),
    );

    await alimentarBasedeDatos();
  });

  const alimentarBasedeDatos = async () => {
    repository.clear();
    listaProductos = [];
    for (let i = 0; i < 5; i++) {
      const producto: ProductoEntity = await repository.save({
        nombre: faker.lorem.sentence(),
        descripcion: faker.lorem.sentence(),
        historia: faker.lorem.sentence(),
        categoria: faker.lorem.sentence(),
        culturasGastronomicas: [],
      });
      listaProductos.push(producto);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('obtenerTodos deberia retornar todos los productos', async () => {
    const productos: ProductoEntity[] = await service.obtenerTodos();
    expect(productos).not.toBeNull();
    expect(productos).toHaveLength(listaProductos.length);
  });

  it('obtenerUno deberia retornar un productos por id', async () => {
    const productoAlmacenado: ProductoEntity = listaProductos[0];
    const museum: ProductoEntity = await service.obtenerUno(
      productoAlmacenado.id,
    );
    expect(museum).not.toBeNull();
    expect(museum.nombre).toEqual(productoAlmacenado.nombre);
    expect(museum.descripcion).toEqual(productoAlmacenado.descripcion);
    expect(museum.historia).toEqual(productoAlmacenado.historia);
    expect(museum.categoria).toEqual(productoAlmacenado.categoria);
  });

  it('obtenerUno deberia lanzar una Excepcion por un producto invalido', async () => {
    await expect(() => service.obtenerUno('0')).rejects.toHaveProperty(
      'mensaje',
      'El Producto con el Id no ha sido encontrado',
    );
  });

  it('crear deberia retornar un nuevo producto', async () => {
    const producto: ProductoEntity = {
      id: '',
      nombre: faker.lorem.sentence(),
      descripcion: faker.lorem.sentence(),
      historia: faker.lorem.sentence(),
      categoria: faker.lorem.sentence(),
      culturasGastronomicas: [],
    };

    const nuevoProducto: ProductoEntity = await service.crear(producto);
    expect(nuevoProducto).not.toBeNull();

    const productoAlmacenado: ProductoEntity = await repository.findOne({
      where: { id: nuevoProducto.id },
    });
    expect(productoAlmacenado).not.toBeNull();
    expect(productoAlmacenado.nombre).toEqual(nuevoProducto.nombre);
    expect(productoAlmacenado.descripcion).toEqual(nuevoProducto.descripcion);
    expect(productoAlmacenado.historia).toEqual(nuevoProducto.historia);
    expect(productoAlmacenado.categoria).toEqual(nuevoProducto.categoria);
  });

  it('actualizar deberia modificar un producto', async () => {
    const producto: ProductoEntity = listaProductos[0];
    producto.nombre = 'New nombre';
    producto.historia = 'New Historia';
    const productoActualizado: ProductoEntity = await service.actualizar(
      producto.id,
      producto,
    );
    expect(productoActualizado).not.toBeNull();

    const productoAlmacenado: ProductoEntity = await repository.findOne({
      where: { id: producto.id },
    });
    expect(productoAlmacenado).not.toBeNull();
    expect(productoAlmacenado.nombre).toEqual(producto.nombre);
    expect(productoAlmacenado.historia).toEqual(producto.historia);
  });

  it('actualizar deberia lanzar una excepcion por un producto invalido', async () => {
    let producto: ProductoEntity = listaProductos[0];
    producto.nombre = 'nuevo producto';

    await expect(() =>
      service.actualizar('0', producto),
    ).rejects.toHaveProperty('mensaje', 'El producto no fue encontrado');
  });

  it('borrar deberia remover un producto', async () => {
    const producto: ProductoEntity = listaProductos[0];
    await service.borrar(producto.id);
    const productoBorrado: ProductoEntity = await repository.findOne({
      where: { id: producto.id },
    });
    expect(productoBorrado).toBeNull();
  });

  it('borrar deberia lanzar una excepcion para un producto invalido', async () => {
    const producto: ProductoEntity = listaProductos[0];
    await service.borrar(producto.id);
    await expect(() => service.borrar('0')).rejects.toHaveProperty(
      'mensaje',
      'El producto no fue encontrado',
    );
  });
});
