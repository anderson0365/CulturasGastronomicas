/* eslint-disable prettier/prettier */
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../autenticar/guards/local-auth.guard';
import { AutenticarService } from '../autenticar/autenticar.service';

@Controller('users')
export class UsuarioController {

    constructor(private readonly autenticarService: AutenticarService){}
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req) {
        return this.autenticarService.iniciarSecion(req);
    }
}
