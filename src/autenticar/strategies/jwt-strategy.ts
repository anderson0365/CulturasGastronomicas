/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import constantesJwt from '../../compartido/seguridad/constantes';

 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constantesJwt.JWT_SECRETO,
        });
    }
   
    async validate(payload: any) {
        return { id: payload.sub, username: payload.username };
    }
}
