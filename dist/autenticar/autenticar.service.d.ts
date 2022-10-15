import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
export declare class AutenticarService {
    private usuarioService;
    private jwtService;
    constructor(usuarioService: UsuarioService, jwtService: JwtService);
    validarUsuario(username: string, password: string): Promise<any>;
    iniciarSecion(req: any): Promise<{
        token: string;
    }>;
}
