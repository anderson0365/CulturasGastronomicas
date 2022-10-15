/* eslint-disable prettier/prettier */

export enum Role {
  ADMIN = 'admin',
  LECTOR = 'lector',
  LECTOR_UNICO_RECURSO = 'lector_unico_recurso',
  ESCRITURA = 'escritura',
  ELIMINACION = 'eliminacion'
}

export default class Usuario {
  constructor(
    public id: number,
    public nombre: string,
    public contrasena: string,
    public roles: Role[],
  ) {}
}
