import { CiudadEntity } from '../ciudad/ciudad.entity';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
export declare class CiudadRestauranteService {
    private readonly repositorioCiudad;
    private readonly repositorioRestaurante;
    private readonly cacheManager;
    cacheKey: string;
    constructor(repositorioCiudad: Repository<CiudadEntity>, repositorioRestaurante: Repository<RestauranteEntity>, cacheManager: Cache);
    agregarRestauranteCiudad(ciudadId: string, restauranteId: string): Promise<CiudadEntity>;
    obtenerRestauranteCiudad(ciudadId: string, restauranteId: string): Promise<RestauranteEntity>;
    obtenerTodosRestaurantesDeCiudad(ciudadId: string): Promise<RestauranteEntity[]>;
    asociarRestaurantesCiudad(ciudadId: string, restaurante: RestauranteEntity[]): Promise<CiudadEntity>;
    eliminarRestauranteCiudad(ciudadId: string, restauranteId: string): Promise<void>;
    __obtenerRestauranteCiudad(ciudadId: string, restauranteId: string): Promise<(CiudadEntity | RestauranteEntity)[]>;
}
