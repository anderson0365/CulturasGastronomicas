import { PaisEntity } from '../pais/pais.entity';
import { PaisService } from '../pais/pais.service';
import { CulturaGastronomicaPaisService } from './cultura-gastronomica-pais.service';
import { Cache } from 'cache-manager';
export declare class CulturaGastronomicaPaisController {
    private readonly servicioCulturaGastronomicaPais;
    private readonly servicioPais;
    private readonly administradorCache;
    constructor(servicioCulturaGastronomicaPais: CulturaGastronomicaPaisService, servicioPais: PaisService, administradorCache: Cache);
    agregarPaisCulturaGastronomica(culturaId: string, paisId: string): Promise<import("../cultura-gastronomica/cultura-gastronomica.entity").CulturaGastronomicaEntity>;
    obtenerPaisCulturaGastronomica(culturaId: string, paisId: string): Promise<PaisEntity>;
    obtenerTodosPaisesDeCulturaGastronomica(culturaId: string): Promise<PaisEntity[]>;
    asociarPaisesACulturaGastronomica(paisesIds: string[], culturaId: string): Promise<import("../cultura-gastronomica/cultura-gastronomica.entity").CulturaGastronomicaEntity>;
    eliminarPaisCulturaGatronomica(culturaId: string, paisId: string): Promise<void>;
}
