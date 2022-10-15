import { PaisCulturaGastronomicaService } from './pais-cultura-gastronomica.service';
import { CulturaGastronomicaService } from '../cultura-gastronomica/cultura-gastronomica.service';
import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
export declare class PaisCulturaGastronomicaController {
    private readonly servicioPaisCulturaGastronomica;
    private readonly servicioCulturaGastronomica;
    constructor(servicioPaisCulturaGastronomica: PaisCulturaGastronomicaService, servicioCulturaGastronomica: CulturaGastronomicaService);
    agregarCulturaGastronomicaPais(paisId: string, culturaId: string): Promise<import("../pais/pais.entity").PaisEntity>;
    obtenerCulturaGastronomicaPais(paisId: string, culturaId: string): Promise<CulturaGastronomicaEntity>;
    obtenerTodasRecetasDeCulturaGastronomica(paisId: string): Promise<CulturaGastronomicaEntity[]>;
    asociarCulturaGastronomicaPais(culturasIds: string[], paisId: string): Promise<import("../pais/pais.entity").PaisEntity>;
    eliminarCulturaGastronomicaPais(paisId: string, culturaId: string): Promise<void>;
}
