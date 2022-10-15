export declare enum Role {
    ADMIN = "admin",
    LECTOR = "lector",
    LECTOR_UNICO_RECURSO = "lector_unico_recurso",
    ESCRITURA = "escritura",
    ELIMINACION = "eliminacion"
}
export default class Usuario {
    id: number;
    nombre: string;
    contrasena: string;
    roles: Role[];
    constructor(id: number, nombre: string, contrasena: string, roles: Role[]);
}
