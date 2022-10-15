/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import Usuario, { Role } from './usuario';

@Injectable()
export class UsuarioService {
    private usuarios: Usuario[] = [
        new Usuario(1, "admin", "admin", [Role.ADMIN]),
        new Usuario(2, "lector", "lector", [Role.LECTOR]),
        new Usuario(3, "lector_unico_recurso", "lector_unico_recurso", [Role.LECTOR_UNICO_RECURSO]),
        new Usuario(4, "escritura", "escritura", [Role.ESCRITURA]),
        new Usuario(5, "eliminacion", "eliminacion", [Role.ELIMINACION]),
    ];

    async obtenerUno(nombre: string): Promise<Usuario | undefined> {
        return this.usuarios.find(usuario => usuario.nombre == nombre);
    }
}
