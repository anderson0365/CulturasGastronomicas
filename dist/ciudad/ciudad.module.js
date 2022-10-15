"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CiudadModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ciudad_service_1 = require("./ciudad.service");
const ciudad_resolver_1 = require("./ciudad.resolver");
const ciudad_entity_1 = require("./ciudad.entity");
const ciudad_controller_1 = require("./ciudad.controller");
const usuario_service_1 = require("../usuario/usuario.service");
const jwt_1 = require("@nestjs/jwt");
const sqliteStore = require("cache-manager-sqlite");
let CiudadModule = class CiudadModule {
};
CiudadModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([ciudad_entity_1.CiudadEntity]),
            common_1.CacheModule.register({
                store: sqliteStore,
                path: ':memory:',
                options: {
                    ttl: 5
                },
            })
        ],
        providers: [ciudad_service_1.CiudadService, jwt_1.JwtService, usuario_service_1.UsuarioService, ciudad_resolver_1.CiudadResolver],
        controllers: [ciudad_controller_1.CiudadController],
    })
], CiudadModule);
exports.CiudadModule = CiudadModule;
//# sourceMappingURL=ciudad.module.js.map