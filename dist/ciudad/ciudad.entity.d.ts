import { PaisEntity } from '../pais/pais.entity';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
export declare class CiudadEntity {
    id: string;
    nombre: string;
    pais: PaisEntity;
    restaurantes: RestauranteEntity[];
}
