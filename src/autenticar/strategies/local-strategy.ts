import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AutenticarService } from '../autenticar.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private autenticarService: AutenticarService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const usuario = await this.autenticarService.validarUsuario(username, password);
    if (!usuario) {
      throw new UnauthorizedException();
    }
    return usuario;
  }
}
