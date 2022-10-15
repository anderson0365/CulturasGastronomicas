import { ProductoEntity } from '../producto/producto.entity';
import { ProductoService } from '../producto/producto.service';
import { CulturaGastronomicaProductoService } from './cultura-gastronomica-producto.service';
import { Cache } from 'cache-manager';
export declare class CulturaGastronomicaProductoController {
    private readonly servicioCulturaGastronomicaProducto;
    private readonly servicioProducto;
    private readonly administradorCache;
    constructor(servicioCulturaGastronomicaProducto: CulturaGastronomicaProductoService, servicioProducto: ProductoService, administradorCache: Cache);
    agregarProductoCulturaGastronomica(culturaId: string, productoId: string): Promise<import("../cultura-gastronomica/cultura-gastronomica.entity").CulturaGastronomicaEntity>;
    obtenerProductoCulturaGastronomica(culturaId: string, productoId: string): Promise<ProductoEntity>;
    obtenerTodosProductosDeCulturaGastronomica(culturaId: string): Promise<ProductoEntity[]>;
    asociarProductosACulturaGastronomica(productosIds: string[], culturaId: string): Promise<import("../cultura-gastronomica/cultura-gastronomica.entity").CulturaGastronomicaEntity>;
    eliminarProductoDeCulturaGastronomica(culturaId: string, productoId: string): Promise<void>;
}
