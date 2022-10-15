"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CiudadRestauranteModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ciudad_entity_1 = require("../ciudad/ciudad.entity");
const restaurante_service_1 = require("../restaurante/restaurante.service");
const ciudad_restaurante_controller_1 = require("./ciudad-restaurante.controller");
const ciudad_restaurante_service_1 = require("./ciudad-restaurante.service");
const restaurante_entity_1 = require("../restaurante/restaurante.entity");
const usuario_service_1 = require("../usuario/usuario.service");
const jwt_1 = require("@nestjs/jwt");
const sqliteStore = require("cache-manager-sqlite");
let CiudadRestauranteModule = class CiudadRestauranteModule {
};
CiudadRestauranteModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([restaurante_entity_1.RestauranteEntity, ciudad_entity_1.CiudadEntity]),
            common_1.CacheModule.register({
                store: sqliteStore,
                path: ':memory:',
                options: {
                    ttl: 5
                },
            })
        ],
        providers: [ciudad_restaurante_service_1.CiudadRestauranteService, restaurante_service_1.RestauranteService, jwt_1.JwtService, usuario_service_1.UsuarioService],
        controllers: [ciudad_restaurante_controller_1.CiudadRestauranteController]
    })
], CiudadRestauranteModule);
exports.CiudadRestauranteModule = CiudadRestauranteModule;
//# sourceMappingURL=ciudad-restaurante.module.js.map