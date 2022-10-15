"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CulturaGastronomicaPaisModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pais_service_1 = require("../pais/pais.service");
const cultura_gastronomica_entity_1 = require("../cultura-gastronomica/cultura-gastronomica.entity");
const cultura_gastronomica_pais_controller_1 = require("./cultura-gastronomica-pais.controller");
const pais_entity_1 = require("../pais/pais.entity");
const cultura_gastronomica_pais_service_1 = require("./cultura-gastronomica-pais.service");
const usuario_service_1 = require("../usuario/usuario.service");
const jwt_1 = require("@nestjs/jwt");
const sqliteStore = require("cache-manager-sqlite");
let CulturaGastronomicaPaisModule = class CulturaGastronomicaPaisModule {
};
CulturaGastronomicaPaisModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([cultura_gastronomica_entity_1.CulturaGastronomicaEntity, pais_entity_1.PaisEntity]),
            common_1.CacheModule.register({
                store: sqliteStore,
                path: ':memory:',
                options: {
                    ttl: 15,
                },
            }),
        ],
        providers: [
            cultura_gastronomica_pais_service_1.CulturaGastronomicaPaisService,
            pais_service_1.PaisService,
            jwt_1.JwtService,
            usuario_service_1.UsuarioService,
        ],
        controllers: [cultura_gastronomica_pais_controller_1.CulturaGastronomicaPaisController],
    })
], CulturaGastronomicaPaisModule);
exports.CulturaGastronomicaPaisModule = CulturaGastronomicaPaisModule;
//# sourceMappingURL=cultura-gastronomica-pais.module.js.map