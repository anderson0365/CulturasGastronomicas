import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
export declare class ProductoEntity {
    id: string;
    nombre: string;
    descripcion: string;
    historia: string;
    categoria: string;
    culturasGastronomicas: CulturaGastronomicaEntity[];
}
