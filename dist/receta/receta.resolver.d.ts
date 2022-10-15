import { RecetaDto } from './receta.dto';
import { RecetaEntity } from './receta.entity';
import { RecetaService } from './receta.service';
export declare class RecetaResolver {
    private recetaService;
    constructor(recetaService: RecetaService);
    recetas(): Promise<RecetaEntity[]>;
    receta(id: string): Promise<RecetaEntity>;
    createReceta(recetaDto: RecetaDto): Promise<RecetaEntity>;
    updateReceta(id: string, recetaDto: RecetaDto): Promise<RecetaEntity>;
    deleteReeta(id: string): string;
}
