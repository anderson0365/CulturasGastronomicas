import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from '../usuario/usuario.service';
import { AutenticarService } from './autenticar.service';

describe('AutenticarService', () => {
  let service: AutenticarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutenticarService, UsuarioService, JwtService],
    }).compile();

    service = module.get<AutenticarService>(AutenticarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
