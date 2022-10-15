/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import constantes from '../compartido/seguridad/constantes';
import Usuario from '../usuario/usuario';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AutenticarService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService
    ) {}

    async validarUsuario(username: string, password: string): Promise<any> {
        const usuario: Usuario = await this.usuarioService.obtenerUno(username);
        if (usuario && usuario.contrasena === password) {
            const { contrasena, ...resultado } = usuario;
            return resultado;
        }
        return null;
    }

    async iniciarSecion(req:any) {
        const payload = { roles: req.user.roles, sub: req.id };
        return {
            token: this.jwtService.sign(payload, { privateKey: constantes.JWT_SECRETO, expiresIn:constantes.JWT_EXPIRA_EN }),
        };
    }

}
