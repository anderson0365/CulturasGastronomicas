import { CulturaGastronomicaDto } from './cultura-gastronomica.dto';
import { CulturaGastronomicaEntity } from './cultura-gastronomica.entity';
import { CulturaGastronomicaService } from './cultura-gastronomica.service';
export declare class CulturaGastronomicaResolver {
    private culturaGastronomicaService;
    constructor(culturaGastronomicaService: CulturaGastronomicaService);
    culturasGastronomicas(): Promise<CulturaGastronomicaEntity[]>;
    culturaGastronomica(id: string): Promise<CulturaGastronomicaEntity>;
    crearCulturaGastronomica(culturaDto: CulturaGastronomicaDto): Promise<CulturaGastronomicaEntity>;
    actualizarCulturaGastronomica(id: string, culturaDto: CulturaGastronomicaDto): Promise<CulturaGastronomicaEntity>;
    eliminarCulturaGastronomica(id: string): string;
}
