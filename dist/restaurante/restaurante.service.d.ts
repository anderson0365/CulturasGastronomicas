import { Repository } from 'typeorm';
import { RestauranteEntity } from './restaurante.entity';
export declare class RestauranteService {
    private readonly restauranteRepository;
    constructor(restauranteRepository: Repository<RestauranteEntity>);
    findAll(): Promise<RestauranteEntity[]>;
    findOne(id: string): Promise<RestauranteEntity>;
    create(restaurante: RestauranteEntity): Promise<RestauranteEntity>;
    update(id: string, restaurante: RestauranteEntity): Promise<RestauranteEntity>;
    delete(id: string): Promise<void>;
}
