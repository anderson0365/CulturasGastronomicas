import { CulturaGastronomicaDto } from './cultura-gastronomica.dto';
import { CulturaGastronomicaEntity } from './cultura-gastronomica.entity';
import { CulturaGastronomicaService } from './cultura-gastronomica.service';
import { Cache } from 'cache-manager';
export declare class CulturaGastronomicaController {
    private readonly servicioCulturaGastronomica;
    private readonly administradorCache;
    constructor(servicioCulturaGastronomica: CulturaGastronomicaService, administradorCache: Cache);
    obtenerTodos(): Promise<CulturaGastronomicaEntity[]>;
    obtenerUno(culturaId: string): Promise<CulturaGastronomicaEntity>;
    crear(culturaDto: CulturaGastronomicaDto): Promise<CulturaGastronomicaEntity>;
    actualizar(culturaId: string, culturaDto: CulturaGastronomicaDto): Promise<CulturaGastronomicaEntity>;
    eliminar(culturaId: string): Promise<void>;
}
