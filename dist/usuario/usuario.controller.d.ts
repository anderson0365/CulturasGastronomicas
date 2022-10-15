import { AutenticarService } from '../autenticar/autenticar.service';
export declare class UsuarioController {
    private readonly autenticarService;
    constructor(autenticarService: AutenticarService);
    login(req: any): Promise<{
        token: string;
    }>;
}
