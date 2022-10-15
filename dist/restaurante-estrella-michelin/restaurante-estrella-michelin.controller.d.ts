import { EstrellaMichelinEntity } from '../estrella-michelin/estrella-michelin.entity';
import { EstrellaMichelinService } from '../estrella-michelin/estrella-michelin.service';
import { RestauranteEstrellaMichelinService } from './restaurante-estrella-michelin.service';
import { Cache } from 'cache-manager';
export declare class RestauranteEstrellaMichelinController {
    private readonly restauranteEstrellaMichelinService;
    private readonly servicioEstrellaMichelin;
    private readonly administradorCache;
    constructor(restauranteEstrellaMichelinService: RestauranteEstrellaMichelinService, servicioEstrellaMichelin: EstrellaMichelinService, administradorCache: Cache);
    addEstrellaMichelinRestaurante(restauranteId: string, estrellaMichelinId: string): Promise<import("../restaurante/restaurante.entity").RestauranteEntity>;
    findEstrellaMichelinByRestauranteIdEstrellaMichelinId(restauranteId: string, estrellaMichelinId: string): Promise<EstrellaMichelinEntity>;
    findEstrellaMichelinsByRestauranteId(restauranteId: string): Promise<EstrellaMichelinEntity[]>;
    associateArtworksMuseum(estrellasMichelinIds: string[], restauranteId: string): Promise<import("../restaurante/restaurante.entity").RestauranteEntity>;
    deleteEstrellaMichelinRestaurante(restauranteId: string, estrellaMichelinId: string): Promise<void>;
}
