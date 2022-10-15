import { RecetaEntity } from '../receta/receta.entity';
import { RecetaService } from '../receta/receta.service';
import { RestauranteRecetaService } from './restaurante-receta.service';
import { Cache } from 'cache-manager';
export declare class RestauranteRecetaController {
    private readonly restauranteRecetaService;
    private readonly servicioReceta;
    private readonly administradorCache;
    constructor(restauranteRecetaService: RestauranteRecetaService, servicioReceta: RecetaService, administradorCache: Cache);
    addRecetaRestaurante(restauranteId: string, recetaId: string): Promise<import("../restaurante/restaurante.entity").RestauranteEntity>;
    findRecetaByRestauranteIdRecetaId(restauranteId: string, recetaId: string): Promise<RecetaEntity>;
    findRecetasByRestauranteId(restauranteId: string): Promise<RecetaEntity[]>;
    associateArtworksMuseum(recetasIds: string[], restauranteId: string): Promise<import("../restaurante/restaurante.entity").RestauranteEntity>;
    deleteRecetaRestaurante(restauranteId: string, recetaId: string): Promise<void>;
}
