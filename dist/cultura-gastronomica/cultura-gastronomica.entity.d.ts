import { PaisEntity } from '../pais/pais.entity';
import { ProductoEntity } from '../producto/producto.entity';
import { RecetaEntity } from '../receta/receta.entity';
export declare class CulturaGastronomicaEntity {
    id: string;
    nombre: string;
    descripcion: string;
    img: string;
    recetas: RecetaEntity[];
    paises: PaisEntity[];
    productos: ProductoEntity[];
}
