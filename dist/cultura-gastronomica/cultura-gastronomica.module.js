"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CulturaGastronomicaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cultura_gastronomica_entity_1 = require("./cultura-gastronomica.entity");
const cultura_gastronomica_service_1 = require("./cultura-gastronomica.service");
const cultura_gastronomica_controller_1 = require("./cultura-gastronomica.controller");
const jwt_1 = require("@nestjs/jwt");
const usuario_service_1 = require("../usuario/usuario.service");
const cultura_gastronomica_resolver_1 = require("./cultura-gastronomica.resolver");
const sqliteStore = require("cache-manager-sqlite");
let CulturaGastronomicaModule = class CulturaGastronomicaModule {
};
CulturaGastronomicaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([cultura_gastronomica_entity_1.CulturaGastronomicaEntity]),
            common_1.CacheModule.register({
                store: sqliteStore,
                path: ':memory:',
                options: {
                    ttl: 15,
                },
            }),
        ],
        providers: [cultura_gastronomica_service_1.CulturaGastronomicaService, jwt_1.JwtService, usuario_service_1.UsuarioService, cultura_gastronomica_resolver_1.CulturaGastronomicaResolver],
        controllers: [cultura_gastronomica_controller_1.CulturaGastronomicaController],
    })
], CulturaGastronomicaModule);
exports.CulturaGastronomicaModule = CulturaGastronomicaModule;
//# sourceMappingURL=cultura-gastronomica.module.js.map