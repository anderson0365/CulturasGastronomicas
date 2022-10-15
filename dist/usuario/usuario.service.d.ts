import Usuario from './usuario';
export declare class UsuarioService {
    private usuarios;
    obtenerUno(nombre: string): Promise<Usuario | undefined>;
}
