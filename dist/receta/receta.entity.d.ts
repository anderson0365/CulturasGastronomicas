import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
export declare class RecetaEntity {
    id: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    video: string;
    proceso: string;
    culturaGastronomica: CulturaGastronomicaEntity;
    restaurantes: RestauranteEntity[];
}
