import { Repository } from 'typeorm';
import { PaisEntity } from './pais.entity';
import { Cache } from 'cache-manager';
export declare class PaisService {
    private readonly paisRepository;
    private readonly cacheManager;
    cacheKey: string;
    constructor(paisRepository: Repository<PaisEntity>, cacheManager: Cache);
    obtenerTodos(): Promise<PaisEntity[]>;
    obtenerUno(id: string): Promise<PaisEntity>;
    crear(pais: PaisEntity): Promise<PaisEntity>;
    actualizar(id: string, pais: PaisEntity): Promise<PaisEntity>;
    borrar(id: string): Promise<void>;
}
