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
import { ErroresNegocioInterceptor } from '../compartido/interceptores/errores-negocio.interceptor';
import { RecetaDto } from './receta.dto';
import { RecetaEntity } from './receta.entity';
import { RecetaService } from './receta.service';
import { JwtAuthGuard } from '../autenticar/guards/jwt-auth.guard';
import { Roles } from '../compartido/seguridad/decoradores';
import { Role } from '../usuario/usuario';


@Controller('recetas')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ErroresNegocioInterceptor)
export class RecetaController {
  constructor(private readonly recetaService: RecetaService) {}

  @Roles(Role.ADMIN, Role.LECTOR)
  @Get()
  async findAll() {
    return await this.recetaService.findAll();
  }
 
  @Roles(Role.ADMIN, Role.LECTOR)  
  @Get(':recetaId')
  async findOne(@Param('recetaId') recetaId: string) {
    return await this.recetaService.findOne(recetaId);
  }

  @Roles(Role.ADMIN, Role.ESCRITURA)
  @Post()
  async create(@Body() recetaDto: RecetaDto) {
    const receta: RecetaEntity = plainToInstance(RecetaEntity, recetaDto);
    return await this.recetaService.create(receta);
  }


  @Roles(Role.ADMIN, Role.ESCRITURA)
  @Put(':recetaId')
  async update(
    @Param('recetaId') recetaId: string,
    @Body() recetaDto: RecetaDto,
  ) {
    const receta: RecetaEntity = plainToInstance(RecetaEntity, recetaDto);
    return await this.recetaService.update(recetaId, receta);
  }

  @Roles(Role.ADMIN, Role.ELIMINACION)
  @Delete(':recetaId')
  @HttpCode(204)
  async delete(@Param('recetaId') recetaId: string) {
    return await this.recetaService.delete(recetaId);
  }
}
