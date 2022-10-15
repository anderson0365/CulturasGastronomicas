import { Repository } from 'typeorm';
import { ProductoEntity } from './producto.entity';
import { Cache } from 'cache-manager';
export declare class ProductoService {
    private readonly productoRepository;
    private readonly cacheManager;
    cacheKey: string;
    constructor(productoRepository: Repository<ProductoEntity>, cacheManager: Cache);
    obtenerTodos(): Promise<ProductoEntity[]>;
    obtenerUno(id: string): Promise<ProductoEntity>;
    crear(producto: ProductoEntity): Promise<ProductoEntity>;
    actualizar(id: string, producto: ProductoEntity): Promise<ProductoEntity>;
    borrar(id: string): Promise<void>;
}
