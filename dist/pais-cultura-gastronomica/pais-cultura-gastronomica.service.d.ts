import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { PaisEntity } from '../pais/pais.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
export declare class PaisCulturaGastronomicaService {
    private readonly repositorioPais;
    private readonly respositorioCulturaGastronomica;
    private readonly cacheManager;
    cacheKey: string;
    constructor(repositorioPais: Repository<PaisEntity>, respositorioCulturaGastronomica: Repository<CulturaGastronomicaEntity>, cacheManager: Cache);
    agregarCulturaGastronomicaPais(paisId: string, culturaId: string): Promise<PaisEntity>;
    obtenerCulturaGastronomicaPais(paisId: string, culturaId: string): Promise<CulturaGastronomicaEntity>;
    obtenerTodasRecetasDeCulturaGastronomica(paisId: string): Promise<CulturaGastronomicaEntity[]>;
    asociarCulturaGastronomicaPais(paisId: string, culturasGastronomicas: CulturaGastronomicaEntity[]): Promise<PaisEntity>;
    eliminarCulturaGastronomicaPais(paisId: string, culturaId: string): Promise<void>;
    __obtenerCulturaGastronomicaPais(paisId: string, culturaId: string): Promise<(CulturaGastronomicaEntity | PaisEntity)[]>;
}
