import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ErrorNegocio,
  ExcepcionLogicaNegocio,
} from '../compartido/errores-negocio';
import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { ProductoEntity } from '../producto/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CulturaGastronomicaProductoService {
  constructor(
    @InjectRepository(CulturaGastronomicaEntity)
    private readonly repositorioCulturaGastronomica: Repository<CulturaGastronomicaEntity>,

    @InjectRepository(ProductoEntity)
    private readonly repositorioProducto: Repository<ProductoEntity>,
  ) {}

  async agregarProductoCulturaGastronomica(
    culturaId: string,
    productoId: string,
  ): Promise<CulturaGastronomicaEntity> {
    const producto: ProductoEntity = await this.repositorioProducto.findOne({
      where: { id: productoId },
    });
    if (!producto)
      throw new ExcepcionLogicaNegocio(
        'producto dado no fue encontrado.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    const cultura: CulturaGastronomicaEntity =
      await this.repositorioCulturaGastronomica.findOne({
        where: { id: culturaId },
        relations: ['productos'],
      });
    if (!cultura)
      throw new ExcepcionLogicaNegocio(
        'CulturaGastronomica dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    cultura.productos = [...cultura.productos, producto];
    return await this.repositorioCulturaGastronomica.save(cultura);
  }

  async obtenerProductoporCulturaGastronomica(
    culturaId: string,
    productoId: string,
  ): Promise<ProductoEntity> {
    return <ProductoEntity>(
      (
        await this.__obtenerProductoporCulturaGastronomica(
          culturaId,
          productoId,
        )
      )[1]
    );
  }

  async obtenerTodosProductosporCultura(
    culturaId: string,
  ): Promise<ProductoEntity[]> {
    const cultura: CulturaGastronomicaEntity =
      await this.repositorioCulturaGastronomica.findOne({
        where: { id: culturaId },
        relations: ['productos'],
      });
    if (!cultura)
      throw new ExcepcionLogicaNegocio(
        'CulturaGastronomica dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    return cultura.productos;
  }

  async asociarProductoCultura(
    culturaId: string,
    productos: ProductoEntity[],
  ): Promise<CulturaGastronomicaEntity> {
    const cultura: CulturaGastronomicaEntity =
      await this.repositorioCulturaGastronomica.findOne({
        where: { id: culturaId },
        relations: ['productos'],
      });

    if (!cultura)
      throw new ExcepcionLogicaNegocio(
        'CulturaGastronomica dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    for (let i = 0; i < productos.length; i++) {
      const producto: ProductoEntity = await this.repositorioProducto.findOne({
        where: { id: productos[i].id },
      });
      if (!producto)
        throw new ExcepcionLogicaNegocio(
          'producto dado no fue encontrado.',
          ErrorNegocio.NO_ENCONTRADO,
        );
    }

    cultura.productos = productos;
    return await this.repositorioCulturaGastronomica.save(cultura);
  }

  async eliminarProductoCultura(culturaId: string, productoId: string) {
    const cultura = <CulturaGastronomicaEntity>(
      (
        await this.__obtenerProductoporCulturaGastronomica(
          culturaId,
          productoId,
        )
      )[0]
    );
    cultura.productos = cultura.productos.filter((e) => e.id !== productoId);
    await this.repositorioCulturaGastronomica.save(cultura);
  }

  async __obtenerProductoporCulturaGastronomica(
    culturaId: string,
    productoId: string,
  ) {
    const producto: ProductoEntity = await this.repositorioProducto.findOne({
      where: { id: productoId },
    });
    if (!producto)
      throw new ExcepcionLogicaNegocio(
        'producto dado no fue encontrado.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    const cultura: CulturaGastronomicaEntity =
      await this.repositorioCulturaGastronomica.findOne({
        where: { id: culturaId },
        relations: ['productos'],
      });
    if (!cultura)
      throw new ExcepcionLogicaNegocio(
        'CulturaGastronomica dada no fue encontrada.',
        ErrorNegocio.NO_ENCONTRADO,
      );

    const culturaProducto: ProductoEntity = cultura.productos.find(
      (e) => e.id === producto.id,
    );

    if (!culturaProducto)
      throw new ExcepcionLogicaNegocio(
        'Producto dado no esta asociado a CulturaGastronomica dada.',
        ErrorNegocio.PRECONDICION_FALLIDA,
      );

    return [cultura, culturaProducto];
  }
}
