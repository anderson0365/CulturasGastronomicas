import { CiudadDto } from './ciudad.dto';
import { CiudadEntity } from './ciudad.entity';
import { CiudadService } from './ciudad.service';
export declare class CiudadController {
    private readonly ciudadService;
    constructor(ciudadService: CiudadService);
    findAll(): Promise<CiudadEntity[]>;
    findOne(ciudadId: string): Promise<CiudadEntity>;
    create(ciudadDto: CiudadDto): Promise<CiudadEntity>;
    update(ciudadId: string, ciudadDto: CiudadDto): Promise<CiudadEntity>;
    delete(ciudadId: string): Promise<void>;
}
