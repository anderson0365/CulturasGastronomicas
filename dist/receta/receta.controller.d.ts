import { RecetaDto } from './receta.dto';
import { RecetaEntity } from './receta.entity';
import { RecetaService } from './receta.service';
export declare class RecetaController {
    private readonly recetaService;
    constructor(recetaService: RecetaService);
    findAll(): Promise<RecetaEntity[]>;
    findOne(recetaId: string): Promise<RecetaEntity>;
    create(recetaDto: RecetaDto): Promise<RecetaEntity>;
    update(recetaId: string, recetaDto: RecetaDto): Promise<RecetaEntity>;
    delete(recetaId: string): Promise<void>;
}
