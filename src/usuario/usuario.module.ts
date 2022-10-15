import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { AutenticarService } from '../autenticar/autenticar.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UsuarioService, AutenticarService, JwtService],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
