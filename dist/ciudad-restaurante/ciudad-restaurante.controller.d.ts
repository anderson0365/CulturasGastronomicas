import { RestauranteEntity } from 'src/restaurante/restaurante.entity';
import { RestauranteService } from 'src/restaurante/restaurante.service';
import { CiudadRestauranteService } from './ciudad-restaurante.service';
export declare class CiudadRestauranteController {
    private readonly servicioCiudadRestaurante;
    private readonly servicioRestaurante;
    constructor(servicioCiudadRestaurante: CiudadRestauranteService, servicioRestaurante: RestauranteService);
    agregarRestaurateCiudad(ciudadId: string, restauranteId: string): Promise<import("../ciudad/ciudad.entity").CiudadEntity>;
    obtenerRestauranteCiudad(ciudadId: string, restauranteId: string): Promise<RestauranteEntity>;
    obtenerTodosRestaurantesDeCiudad(ciudadId: string): Promise<RestauranteEntity[]>;
    associateArtworksMuseum(restaurantesIds: string[], ciudadId: string): Promise<import("../ciudad/ciudad.entity").CiudadEntity>;
    deleteArtworkMuseum(ciudadId: string, restauranteId: string): Promise<void>;
}
