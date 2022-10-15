"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaisCiudadModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_service_1 = require("../usuario/usuario.service");
const ciudad_entity_1 = require("../ciudad/ciudad.entity");
const ciudad_service_1 = require("../ciudad/ciudad.service");
const pais_entity_1 = require("../pais/pais.entity");
const pais_ciudad_controller_1 = require("./pais-ciudad.controller");
const pais_ciudad_service_1 = require("./pais-ciudad.service");
const sqliteStore = require("cache-manager-sqlite");
let PaisCiudadModule = class PaisCiudadModule {
};
PaisCiudadModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([pais_entity_1.PaisEntity, ciudad_entity_1.CiudadEntity]),
            common_1.CacheModule.register({
                store: sqliteStore,
                path: ':memory:',
                options: {
                    ttl: 5
                },
            })
        ],
        providers: [pais_ciudad_service_1.PaisCiudadService, ciudad_service_1.CiudadService, jwt_1.JwtService, usuario_service_1.UsuarioService],
        controllers: [pais_ciudad_controller_1.PaisCiudadController],
    })
], PaisCiudadModule);
exports.PaisCiudadModule = PaisCiudadModule;
//# sourceMappingURL=pais-ciudad.module.js.map