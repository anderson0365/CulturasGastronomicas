import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { ProductoEntity } from '../producto/producto.entity';
import { Repository } from 'typeorm';
import { CulturaGastronomicaProductoService } from './cultura-gastronomica-producto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmConfiguracionPruebas } from '../compartido/utilidades-pruebas/typeorm-configuracion-pruebas';

describe('CulturaGastronomicaProductoService', () => {
  let servicio: CulturaGastronomicaProductoService;
  let repositorioCulturaGastronomica: Repository<CulturaGastronomicaEntity>;
  let repositorioProducto: Repository<ProductoEntity>;
  let cultura: CulturaGastronomicaEntity;
  let listaProductos: ProductoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmConfiguracionPruebas()],
      providers: [CulturaGastronomicaProductoService],
    }).compile();

    servicio = module.get<CulturaGastronomicaProductoService>(CulturaGastronomicaProductoService);

    repositorioCulturaGastronomica = module.get<Repository<CulturaGastronomicaEntity>>(getRepositoryToken(CulturaGastronomicaEntity));

    repositorioProducto = module.get<Repository<ProductoEntity>>(getRepositoryToken(ProductoEntity),);

    await inicializarBaseDeDatos();
  });

  const inicializarBaseDeDatos = async () => {
    repositorioProducto.clear();
    repositorioCulturaGastronomica.clear();

    listaProductos = [];
    for (let i = 0; i < 5; i++) {
      const producto: ProductoEntity = await repositorioProducto.save({
        nombre: faker.lorem.sentence(),
        descripcion: faker.lorem.sentence(),
        historia: faker.lorem.sentence(),
        categoria: faker.lorem.sentence(),
        culturasGastronomicas: [],
      });
      listaProductos.push(producto);
    }

    cultura = await repositorioCulturaGastronomica.save({
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      img: faker.image.imageUrl(),
      productos: listaProductos,
      paises: [],
      recetas: []
    });
  };

  it('agregarProductoCulturaGastronomica debería agregar producto a cultura gastronómica.', async () => {
    const nuevoProducto: ProductoEntity = await repositorioProducto.save({
        nombre: faker.lorem.sentence(),
        descripcion: faker.lorem.sentence(),
        historia: faker.lorem.sentence(),
        categoria: faker.lorem.sentence(),
        culturasGastronomicas: [],
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
      await servicio.agregarProductoCulturaGastronomica(
        nuevaCultura.id,
        nuevoProducto.id,
      );

    expect(result.productos.length).toBe(1);
    expect(result.productos[0]).not.toBeNull();
    expect(result.productos[0].nombre).toBe(nuevoProducto.nombre);
    expect(result.productos[0].descripcion).toBe(nuevoProducto.descripcion);
    expect(result.productos[0].historia).toBe(nuevoProducto.historia);
    expect(result.productos[0].categoria).toBe(nuevoProducto.categoria);
  });

  it('should be defined', () => {
    expect(servicio).toBeDefined();
  });

  it('agregarProductoCulturaGastronomica debería arrojar excepcion de producto inválido.', async () => {
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
      servicio.agregarProductoCulturaGastronomica(nuevaCultura.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'producto dado no fue encontrado.');
  });

  it('agregarProductoCulturaGastronomica debería arrojar excepcion de cultura inválida.', async () => {
    const nuevoProducto: ProductoEntity = await repositorioProducto.save({
      nombre: faker.lorem.sentence(),
      descripcion: faker.lorem.sentence(),
      historia: faker.lorem.sentence(),
      categoria: faker.lorem.sentence(),
      culturasGastronomicas: [],
  });

    await expect(() =>
      servicio.agregarProductoCulturaGastronomica('0', nuevoProducto.id),
    ).rejects.toHaveProperty('mensaje', 'CulturaGastronomica dada no fue encontrada.');
  });

  it('obtenerProductoporCulturaGastronomica deberia retornar producto por cultura', async () => {
    const producto: ProductoEntity = listaProductos[0];
    const productoAlmacenado: ProductoEntity = await servicio.obtenerProductoporCulturaGastronomica(cultura.id, producto.id, )
    expect(productoAlmacenado).not.toBeNull();
    expect(productoAlmacenado.nombre).toBe(producto.nombre);
    expect(productoAlmacenado.descripcion).toBe(producto.descripcion);
    expect(productoAlmacenado.historia).toBe(producto.historia);
    expect(productoAlmacenado.categoria).toBe(producto.categoria);
  });

  it('obtenerProductoporCulturaGastronomica debería arrojar excepcion de producto inválido.', async () => {
    await expect(() =>
      servicio.obtenerProductoporCulturaGastronomica(cultura.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'producto dado no fue encontrado.');
  });

  it('obtenerProductoporCulturaGastronomica debería arrojar excepcion de cultura gastronómica inválida.', async () => {
    const producto: ProductoEntity = listaProductos[0];
    await expect(() =>
      servicio.obtenerProductoporCulturaGastronomica('0', producto.id),
    ).rejects.toHaveProperty('mensaje', 'CulturaGastronomica dada no fue encontrada.',);
  });

  it('obtenerProductoporCulturaGastronomica debería arrojar excepcion de producto no asociado a cultura gastronómica.', async () => {
    const nuevoProducto: ProductoEntity = await repositorioProducto.save({
      nombre: faker.lorem.sentence(),
      descripcion: faker.lorem.sentence(),
      historia: faker.lorem.sentence(),
      categoria: faker.lorem.sentence(),
      culturasGastronomicas: [],
  });

    await expect(() =>
      servicio.obtenerProductoporCulturaGastronomica(cultura.id, nuevoProducto.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'Producto dado no esta asociado a CulturaGastronomica dada.',
    );
  });

  it('obtenerTodosProductosporCultura deberia retornar productos por cultura', async () => {
    const productos: ProductoEntity[] =
      await servicio.obtenerTodosProductosporCultura(cultura.id);
    expect(productos.length).toBe(5);
  });

  it('obtenerTodosProductosporCultura debería arrojar excepcion de cultura gastronómica inválida.', async () => {
    await expect(() =>
      servicio.obtenerTodosProductosporCultura('0'),
    ).rejects.toHaveProperty(
      'mensaje',
      'CulturaGastronomica dada no fue encontrada.',
    );
  });

  it('asociarProductoCultura debería actualizar la lista de productos de una cultura gastronómica.', async () => {
    const nuevoProducto: ProductoEntity = await repositorioProducto.save({
        nombre: faker.lorem.sentence(),
        descripcion: faker.lorem.sentence(),
        historia: faker.lorem.sentence(),
        categoria: faker.lorem.sentence(),
        culturasGastronomicas: [],
    });

    const productoActualizado: CulturaGastronomicaEntity =
      await servicio.asociarProductoCultura(cultura.id, [
        nuevoProducto,
      ]);
    expect(productoActualizado.productos.length).toBe(1);

    expect(productoActualizado.productos[0].nombre).toBe(nuevoProducto.nombre);
    expect(productoActualizado.productos[0].descripcion).toBe(nuevoProducto.descripcion);
    expect(productoActualizado.productos[0].historia).toBe(nuevoProducto.historia);
    expect(productoActualizado.productos[0].categoria).toBe(nuevoProducto.categoria);
  });

  it('asociarProductoCultura debería arrojar excepcion de cultura gastronómica inválida.', async () => {
    const nuevoProducto: ProductoEntity = await repositorioProducto.save({
      nombre: faker.lorem.sentence(),
      descripcion: faker.lorem.sentence(),
      historia: faker.lorem.sentence(),
      categoria: faker.lorem.sentence(),
      culturasGastronomicas: [],
  });

    await expect(() =>
      servicio.asociarProductoCultura('0', [nuevoProducto]),
    ).rejects.toHaveProperty(
      'mensaje',
      'CulturaGastronomica dada no fue encontrada.',
    );
  });

  it('asociarProductoCultura debería arrojar excepcion de cultura gastronómica inválida.', async () => {
    const nuevoProducto: ProductoEntity = listaProductos[0];
    nuevoProducto.id = '0';

    await expect(() =>
      servicio.asociarProductoCultura(cultura.id, [nuevoProducto]),
    ).rejects.toHaveProperty('mensaje', 'producto dado no fue encontrado.');
  });

  it('eliminarProductoCultura debería remover un producto de cultura gastronómica.', async () => {
    const producto: ProductoEntity = listaProductos[0];

    await servicio.eliminarProductoCultura(cultura.id, producto.id);

    const culturaAlmacenada: CulturaGastronomicaEntity =
      await repositorioCulturaGastronomica.findOne({
        where: { id: cultura.id },
        relations: ['productos'],
      });
    const deletedArtwork: ProductoEntity = culturaAlmacenada.productos.find(
      (a) => a.id === producto.id,
    );

    expect(deletedArtwork).toBeUndefined();
  });

  it('eliminarProductoCultura debería arrojar excepcion de producto inválido.', async () => {
    await expect(() =>
      servicio.eliminarProductoCultura(cultura.id, '0'),
    ).rejects.toHaveProperty('mensaje', 'producto dado no fue encontrado.');
  });

  it('eliminarRecetaCulturaGastronomica  debería arrojar excepcion de cultura gastronómica inválida.', async () => {
    const producto: ProductoEntity = listaProductos[0];
    await expect(() =>
      servicio.eliminarProductoCultura('0', producto.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'CulturaGastronomica dada no fue encontrada.',
    );
  });

  it('eliminarRecetaCulturaGastronomica debería arrojar excepcion de receta no asociada a cultura gastronómica.', async () => {
    const nuevoProducto: ProductoEntity = await repositorioProducto.save({
      nombre: faker.lorem.sentence(),
      descripcion: faker.lorem.sentence(),
      historia: faker.lorem.sentence(),
      categoria: faker.lorem.sentence(),
      culturasGastronomicas: [],
  });

    await expect(() =>
      servicio.eliminarProductoCultura(cultura.id, nuevoProducto.id),
    ).rejects.toHaveProperty(
      'mensaje',
      'Producto dado no esta asociado a CulturaGastronomica dada.',
    );
  });
  
});
