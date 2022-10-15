import { CiudadEntity } from '../ciudad/ciudad.entity';
import { CiudadService } from '../ciudad/ciudad.service';
import { PaisCiudadService } from './pais-ciudad.service';
export declare class PaisCiudadController {
    private readonly servicioPaisCiudades;
    private readonly servicioCiudad;
    constructor(servicioPaisCiudades: PaisCiudadService, servicioCiudad: CiudadService);
    agregarRecetaCulturaGastronomica(paisId: string, ciudadId: string): Promise<import("../pais/pais.entity").PaisEntity>;
    obtenerRecetaCulturaGastronomica(paisId: string, ciudadId: string): Promise<CiudadEntity>;
    obtenerTodosRecetaesDeCulturaGastronomica(paisId: string): Promise<CiudadEntity[]>;
    associateArtworksMuseum(ciudadesIds: string[], paisId: string): Promise<import("../pais/pais.entity").PaisEntity>;
    deleteArtworkMuseum(paisId: string, ciudadId: string): Promise<void>;
}
