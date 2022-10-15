import { CiudadEntity } from '../ciudad/ciudad.entity';
import { PaisEntity } from '../pais/pais.entity';
import { Repository } from 'typeorm';
export declare class PaisCiudadService {
    private readonly repositorioPais;
    private readonly repositorioCiudad;
    constructor(repositorioPais: Repository<PaisEntity>, repositorioCiudad: Repository<CiudadEntity>);
    agregarCiudadPais(paisId: string, ciudadId: string): Promise<PaisEntity>;
    obtenerCiudadPais(paisId: string, ciudadId: string): Promise<CiudadEntity>;
    obtenerTodasCiudadesPais(paisId: string): Promise<CiudadEntity[]>;
    asociarCiudadesPais(paisId: string, ciudades: CiudadEntity[]): Promise<PaisEntity>;
    eliminarCiudadPais(paisId: string, ciudadId: string): Promise<void>;
    __obtenerCiudadPais(paisId: string, ciudadId: string): Promise<(CiudadEntity | PaisEntity)[]>;
}
