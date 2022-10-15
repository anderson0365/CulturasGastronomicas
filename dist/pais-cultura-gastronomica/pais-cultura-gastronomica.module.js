"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaisCulturaGastronomicaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cultura_gastronomica_service_1 = require("../cultura-gastronomica/cultura-gastronomica.service");
const cultura_gastronomica_entity_1 = require("../cultura-gastronomica/cultura-gastronomica.entity");
const pais_entity_1 = require("../pais/pais.entity");
const pais_cultura_gastronomica_controller_1 = require("./pais-cultura-gastronomica.controller");
const pais_cultura_gastronomica_service_1 = require("./pais-cultura-gastronomica.service");
const jwt_1 = require("@nestjs/jwt");
const sqliteStore = require("cache-manager-sqlite");
let PaisCulturaGastronomicaModule = class PaisCulturaGastronomicaModule {
};
PaisCulturaGastronomicaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([pais_entity_1.PaisEntity, cultura_gastronomica_entity_1.CulturaGastronomicaEntity]),
            common_1.CacheModule.register({
                store: sqliteStore,
                path: ':memory:',
                options: {
                    ttl: 5
                },
            })],
        providers: [pais_cultura_gastronomica_service_1.PaisCulturaGastronomicaService, cultura_gastronomica_service_1.CulturaGastronomicaService, jwt_1.JwtService],
        controllers: [pais_cultura_gastronomica_controller_1.PaisCulturaGastronomicaController]
    })
], PaisCulturaGastronomicaModule);
exports.PaisCulturaGastronomicaModule = PaisCulturaGastronomicaModule;
//# sourceMappingURL=pais-cultura-gastronomica.module.js.map