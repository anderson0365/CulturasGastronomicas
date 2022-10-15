import { RecetaEntity } from '../receta/receta.entity';
import { RecetaService } from '../receta/receta.service';
import { CulturaGastronomicaRecetaService } from './cultura-gastronomica-receta.service';
import { Cache } from 'cache-manager';
export declare class CulturaGastronomicaRecetaController {
    private readonly servicioCulturaGastronomicaReceta;
    private readonly servicioReceta;
    private readonly administradorCache;
    constructor(servicioCulturaGastronomicaReceta: CulturaGastronomicaRecetaService, servicioReceta: RecetaService, administradorCache: Cache);
    agregarRecetaCulturaGastronomica(culturaId: string, recetaId: string): Promise<import("../cultura-gastronomica/cultura-gastronomica.entity").CulturaGastronomicaEntity>;
    obtenerRecetaCulturaGastronomica(culturaId: string, recetaId: string): Promise<RecetaEntity>;
    obtenerTodosRecetaesDeCulturaGastronomica(culturaId: string): Promise<RecetaEntity[]>;
    asociarRecetasACulturaGastronomica(recetasIds: string[], culturaId: string): Promise<import("../cultura-gastronomica/cultura-gastronomica.entity").CulturaGastronomicaEntity>;
    eliminarRecetaDeCulturaGastronomica(culturaId: string, recetaId: string): Promise<void>;
}
