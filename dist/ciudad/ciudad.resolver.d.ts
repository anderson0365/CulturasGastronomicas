import { CiudadDto } from './ciudad.dto';
import { CiudadEntity } from './ciudad.entity';
import { CiudadService } from './ciudad.service';
export declare class CiudadResolver {
    private ciudadService;
    constructor(ciudadService: CiudadService);
    ciudades(): Promise<CiudadEntity[]>;
    ciudad(id: string): Promise<CiudadEntity>;
    createCiudad(ciudadDto: CiudadDto): Promise<CiudadEntity>;
    updateCiudad(id: string, ciudadDto: CiudadDto): Promise<CiudadEntity>;
    deleteCiudad(id: string): string;
}
