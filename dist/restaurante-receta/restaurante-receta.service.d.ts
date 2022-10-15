import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { RecetaEntity } from '../receta/receta.entity';
import { Repository } from 'typeorm';
export declare class RestauranteRecetaService {
    private readonly repositorioRestaurante;
    private readonly repositorioReceta;
    constructor(repositorioRestaurante: Repository<RestauranteEntity>, repositorioReceta: Repository<RecetaEntity>);
    agregarRecetaRestaurante(restauranteId: string, recetaId: string): Promise<RestauranteEntity>;
    obtenerRecetaRestaurante(restauranteId: string, recetaId: string): Promise<RecetaEntity>;
    obtenerTodasRecetasDeRestaurante(restauranteId: string): Promise<RecetaEntity[]>;
    asociarRecetasRestaurante(restauranteId: string, recetas: RecetaEntity[]): Promise<RestauranteEntity>;
    eliminarRecetaRestaurante(restauranteId: string, recetaId: string): Promise<void>;
    __obtenerRecetaRestaurante(restauranteId: string, recetaId: string): Promise<(RecetaEntity | RestauranteEntity)[]>;
}
