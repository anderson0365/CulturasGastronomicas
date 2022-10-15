import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { CiudadEntity } from '../ciudad/ciudad.entity';
export declare class PaisEntity {
    id: string;
    nombre: string;
    ciudades: CiudadEntity[];
    culturasGastronomicas: CulturaGastronomicaEntity[];
}
