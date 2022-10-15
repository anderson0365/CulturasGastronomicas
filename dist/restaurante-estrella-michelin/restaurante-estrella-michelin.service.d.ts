import { Repository } from 'typeorm';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { EstrellaMichelinEntity } from '../estrella-michelin/estrella-michelin.entity';
export declare class RestauranteEstrellaMichelinService {
    private readonly restauranteRepository;
    private readonly estrellaMichelinRepository;
    constructor(restauranteRepository: Repository<RestauranteEntity>, estrellaMichelinRepository: Repository<EstrellaMichelinEntity>);
    addEstrellaMichelinRestaurante(restauranteId: string, estrellaMichelinId: string): Promise<RestauranteEntity>;
    findEstrellaMichelinByRestauranteIdEstrellaMichelinId(restauranteId: string, estrellaMichelinId: string): Promise<EstrellaMichelinEntity>;
    findEstrellaMichelinsByRestauranteId(restauranteId: string): Promise<EstrellaMichelinEntity[]>;
    associateEstrellaMichelinsRestaurante(restauranteId: string, estrellasMichelin: EstrellaMichelinEntity[]): Promise<RestauranteEntity>;
    deleteEstrellaMichelinRestaurante(restauranteId: string, estrellaMichelinId: string): Promise<void>;
}
