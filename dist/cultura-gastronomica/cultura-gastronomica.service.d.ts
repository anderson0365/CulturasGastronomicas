import { Repository } from 'typeorm';
import { CulturaGastronomicaEntity } from './cultura-gastronomica.entity';
export declare class CulturaGastronomicaService {
    private readonly repositorioCultura;
    constructor(repositorioCultura: Repository<CulturaGastronomicaEntity>);
    obtenerTodos(): Promise<CulturaGastronomicaEntity[]>;
    obtenerUno(id: string): Promise<CulturaGastronomicaEntity>;
    crear(cultura: CulturaGastronomicaEntity): Promise<CulturaGastronomicaEntity>;
    actualizar(id: string, cultura: CulturaGastronomicaEntity): Promise<CulturaGastronomicaEntity>;
    eliminar(id: string): Promise<void>;
}
