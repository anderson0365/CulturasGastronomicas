import { Repository } from 'typeorm';
import { CiudadEntity } from './ciudad.entity';
import { Cache } from 'cache-manager';
export declare class CiudadService {
    private readonly ciudadRepository;
    private readonly cacheManager;
    cacheKey: string;
    constructor(ciudadRepository: Repository<CiudadEntity>, cacheManager: Cache);
    create(ciudad: CiudadEntity): Promise<CiudadEntity>;
    findAll(): Promise<CiudadEntity[]>;
    findOne(id: string): Promise<CiudadEntity>;
    update(id: string, ciudad: CiudadEntity): Promise<CiudadEntity>;
    delete(id: string): Promise<void>;
}
