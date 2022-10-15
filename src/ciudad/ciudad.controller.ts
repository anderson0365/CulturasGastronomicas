import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RolesGuard } from '../autenticar/guards/roles.guard';
import { plainToInstance } from 'class-transformer';
import { ErroresNegocioInterceptor } from 'src/compartido/interceptores/errores-negocio.interceptor';
import { CiudadDto } from './ciudad.dto';
import { CiudadEntity } from './ciudad.entity';
import { CiudadService } from './ciudad.service';
import { JwtAuthGuard } from '../autenticar/guards/jwt-auth.guard';
import { Roles } from '../compartido/seguridad/decoradores';
import { Role } from '../usuario/usuario';

@Controller('ciudades')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ErroresNegocioInterceptor)
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Roles(Role.ADMIN, Role.LECTOR)
  @Get()
  async findAll() {
    return await this.ciudadService.findAll();
  }


  @Roles(Role.ADMIN, Role.LECTOR)
  @Get(':ciudadId')
  async findOne(@Param('ciudadId') ciudadId: string) {
    return await this.ciudadService.findOne(ciudadId);
  }


  @Roles(Role.ADMIN, Role.ESCRITURA)
  @Post()
  async create(@Body() ciudadDto: CiudadDto) {
    const ciudad: CiudadEntity = plainToInstance(CiudadEntity, ciudadDto);
    return await this.ciudadService.create(ciudad);
  }


  @Roles(Role.ADMIN, Role.ESCRITURA)
  @Put(':ciudadId')
  async update(
    @Param('ciudadId') ciudadId: string,
    @Body() ciudadDto: CiudadDto,
  ) {
    const ciudad: CiudadEntity = plainToInstance(CiudadEntity, ciudadDto);
    return await this.ciudadService.update(ciudadId, ciudad);
  }

  @Roles(Role.ADMIN, Role.ELIMINACION)
  @Delete(':ciudadId')
  @HttpCode(204)
  async delete(@Param('ciudadId') ciudadId: string) {
    return await this.ciudadService.delete(ciudadId);
  }
}
