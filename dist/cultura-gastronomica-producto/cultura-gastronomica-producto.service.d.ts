import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { ProductoEntity } from '../producto/producto.entity';
import { Repository } from 'typeorm';
export declare class CulturaGastronomicaProductoService {
    private readonly repositorioCulturaGastronomica;
    private readonly repositorioProducto;
    constructor(repositorioCulturaGastronomica: Repository<CulturaGastronomicaEntity>, repositorioProducto: Repository<ProductoEntity>);
    agregarProductoCulturaGastronomica(culturaId: string, productoId: string): Promise<CulturaGastronomicaEntity>;
    obtenerProductoporCulturaGastronomica(culturaId: string, productoId: string): Promise<ProductoEntity>;
    obtenerTodosProductosporCultura(culturaId: string): Promise<ProductoEntity[]>;
    asociarProductoCultura(culturaId: string, productos: ProductoEntity[]): Promise<CulturaGastronomicaEntity>;
    eliminarProductoCultura(culturaId: string, productoId: string): Promise<void>;
    __obtenerProductoporCulturaGastronomica(culturaId: string, productoId: string): Promise<(CulturaGastronomicaEntity | ProductoEntity)[]>;
}
