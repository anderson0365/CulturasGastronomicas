import { Repository } from 'typeorm';
import { RecetaEntity } from './receta.entity';
import { Cache } from 'cache-manager';
export declare class RecetaService {
    private readonly recetaRepository;
    private readonly cacheManager;
    cacheKey: string;
    constructor(recetaRepository: Repository<RecetaEntity>, cacheManager: Cache);
    create(receta: RecetaEntity): Promise<RecetaEntity>;
    findAll(): Promise<RecetaEntity[]>;
    findOne(id: string): Promise<RecetaEntity>;
    update(id: string, receta: RecetaEntity): Promise<RecetaEntity>;
    delete(id: string): Promise<void>;
}
