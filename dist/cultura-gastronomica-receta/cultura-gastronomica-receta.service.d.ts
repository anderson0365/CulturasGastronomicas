import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { RecetaEntity } from '../receta/receta.entity';
import { Repository } from 'typeorm';
export declare class CulturaGastronomicaRecetaService {
    private readonly repositorioCulturaGastronomica;
    private readonly repositorioReceta;
    constructor(repositorioCulturaGastronomica: Repository<CulturaGastronomicaEntity>, repositorioReceta: Repository<RecetaEntity>);
    agregarRecetaCulturaGastronomica(culturaId: string, recetaId: string): Promise<CulturaGastronomicaEntity>;
    obtenerRecetaCulturaGastronomica(culturaId: string, recetaId: string): Promise<RecetaEntity>;
    obtenerTodasRecetasDeCulturaGastronomica(culturaId: string): Promise<RecetaEntity[]>;
    asociarRecetasCulturaGastronomica(culturaId: string, recetas: RecetaEntity[]): Promise<CulturaGastronomicaEntity>;
    eliminarRecetaCulturaGastronomica(culturaId: string, recetaId: string): Promise<void>;
    __obtenerRecetaCulturaGastronomica(culturaId: string, recetaId: string): Promise<(CulturaGastronomicaEntity | RecetaEntity)[]>;
}
