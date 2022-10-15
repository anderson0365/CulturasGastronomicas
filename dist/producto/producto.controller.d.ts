import { ProductoDto } from './producto.dto';
import { ProductoEntity } from './producto.entity';
import { ProductoService } from './producto.service';
export declare class ProductoController {
    private readonly servicioProductos;
    constructor(servicioProductos: ProductoService);
    obtenerTodos(): Promise<ProductoEntity[]>;
    obtenerUno(productoId: string): Promise<ProductoEntity>;
    crear(productoDto: ProductoDto): Promise<ProductoEntity>;
    actualizar(productoId: string, productoDto: ProductoDto): Promise<ProductoEntity>;
    eliminar(productoId: string): Promise<void>;
}
