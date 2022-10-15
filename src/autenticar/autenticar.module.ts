/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { AutenticarService } from './autenticar.service';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import constantesJwt from '../compartido/seguridad/constantes';

@Module({
    imports: [
        UsuarioModule,
        PassportModule,
        JwtModule.register({
          secret: constantesJwt.JWT_SECRETO,
          signOptions: { expiresIn: constantesJwt.JWT_EXPIRA_EN },
        })
      ],
    providers: [AutenticarService, UsuarioService, JwtService, LocalStrategy, JwtStrategy], 
    exports: [AutenticarService]
    
})
export class AutenticarModule {}
