import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { PaisEntity } from '../pais/pais.entity';
import { Repository } from 'typeorm';
export declare class CulturaGastronomicaPaisService {
    private readonly repositorioCulturaGastronomica;
    private readonly repositorioPais;
    constructor(repositorioCulturaGastronomica: Repository<CulturaGastronomicaEntity>, repositorioPais: Repository<PaisEntity>);
    agregarPaisCulturaGastronomica(culturaId: string, paisId: string): Promise<CulturaGastronomicaEntity>;
    obtenerPaisCulturaGastronomica(culturaId: string, paisId: string): Promise<PaisEntity>;
    obtenerTodosPaisesDeCulturaGastronomica(culturaId: string): Promise<PaisEntity[]>;
    asociarPaisesCulturaGastronomica(culturaId: string, paises: PaisEntity[]): Promise<CulturaGastronomicaEntity>;
    eliminarPaisCulturaGastronomica(culturaId: string, paisId: string): Promise<void>;
    __obtenerPaisCulturaGastronomica(culturaId: string, paisId: string): Promise<(CulturaGastronomicaEntity | PaisEntity)[]>;
}
