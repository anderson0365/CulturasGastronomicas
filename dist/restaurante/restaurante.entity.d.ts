import { CiudadEntity } from '../ciudad/ciudad.entity';
import { EstrellaMichelinEntity } from '../estrella-michelin/estrella-michelin.entity';
import { RecetaEntity } from '../receta/receta.entity';
export declare class RestauranteEntity {
    id: string;
    nombre: string;
    img: string;
    estrellasMichelin: EstrellaMichelinEntity[];
    ciudad: CiudadEntity;
    recetas: RecetaEntity[];
}
