import { PaisDto } from './pais.dto';
import { PaisEntity } from './pais.entity';
import { PaisService } from './pais.service';
export declare class PaisController {
    private readonly servicioPais;
    constructor(servicioPais: PaisService);
    obtenerTodos(): Promise<PaisEntity[]>;
    obtenerUno(paisId: string): Promise<PaisEntity>;
    create(paisDto: PaisDto): Promise<PaisEntity>;
    update(paisId: string, paisDto: PaisDto): Promise<PaisEntity>;
    eliminar(paisId: string): Promise<void>;
}
