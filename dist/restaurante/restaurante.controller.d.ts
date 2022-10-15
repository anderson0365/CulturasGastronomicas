import { RestauranteDto } from './restaurante.dto';
import { RestauranteEntity } from './restaurante.entity';
import { RestauranteService } from './restaurante.service';
import { Cache } from 'cache-manager';
export declare class RestauranteController {
    private readonly restauranteService;
    private readonly administradorCache;
    constructor(restauranteService: RestauranteService, administradorCache: Cache);
    findAll(): Promise<RestauranteEntity[]>;
    findOne(restauranteId: string): Promise<RestauranteEntity>;
    create(restauranteDto: RestauranteDto): Promise<RestauranteEntity>;
    update(restauranteId: string, restauranteDto: RestauranteDto): Promise<RestauranteEntity>;
    delete(restauranteId: string): Promise<void>;
}
