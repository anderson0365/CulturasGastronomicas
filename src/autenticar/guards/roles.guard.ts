import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import constantesJwt from '../../compartido/seguridad/constantes';
import { Role } from '../../usuario/usuario';



@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesRequeridos = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!rolesRequeridos) {
      return true;
    }
    
    const peticion = context.switchToHttp().getRequest();
    const encabezado = peticion.headers;
    const token = encabezado.authorization.replace('Bearer ', '');
    const datos_usuario = this.jwtService.verify(token, {complete: true, secret: constantesJwt.JWT_SECRETO }).payload;

    return rolesRequeridos.some((role) => datos_usuario.roles.includes(role));
  }
}