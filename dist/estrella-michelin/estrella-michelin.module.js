"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstrellaMichelinModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const estrella_michelin_entity_1 = require("./estrella-michelin.entity");
const estrella_michelin_service_1 = require("./estrella-michelin.service");
const estrella_michelin_controller_1 = require("./estrella-michelin.controller");
const jwt_1 = require("@nestjs/jwt");
const usuario_service_1 = require("../usuario/usuario.service");
const sqliteStore = require("cache-manager-sqlite");
let EstrellaMichelinModule = class EstrellaMichelinModule {
};
EstrellaMichelinModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([estrella_michelin_entity_1.EstrellaMichelinEntity]),
            common_1.CacheModule.register({
                store: sqliteStore,
                path: ':memory:',
                options: {
                    ttl: 15,
                },
            }),
        ],
        providers: [estrella_michelin_service_1.EstrellaMichelinService, jwt_1.JwtService, usuario_service_1.UsuarioService],
        controllers: [estrella_michelin_controller_1.EstrellaMichelinController],
    })
], EstrellaMichelinModule);
exports.EstrellaMichelinModule = EstrellaMichelinModule;
//# sourceMappingURL=estrella-michelin.module.js.map