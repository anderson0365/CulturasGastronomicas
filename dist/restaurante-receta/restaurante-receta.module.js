"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestauranteRecetaModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_service_1 = require("../usuario/usuario.service");
const receta_entity_1 = require("../receta/receta.entity");
const receta_service_1 = require("../receta/receta.service");
const restaurante_entity_1 = require("../restaurante/restaurante.entity");
const restaurante_receta_controller_1 = require("./restaurante-receta.controller");
const restaurante_receta_service_1 = require("./restaurante-receta.service");
const sqliteStore = require("cache-manager-sqlite");
let RestauranteRecetaModule = class RestauranteRecetaModule {
};
RestauranteRecetaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([restaurante_entity_1.RestauranteEntity, receta_entity_1.RecetaEntity]),
            common_1.CacheModule.register({
                store: sqliteStore,
                path: ':memory:',
                options: {
                    ttl: 15,
                },
            }),
        ],
        providers: [
            restaurante_receta_service_1.RestauranteRecetaService,
            receta_service_1.RecetaService,
            jwt_1.JwtService,
            usuario_service_1.UsuarioService,
        ],
        controllers: [restaurante_receta_controller_1.RestauranteRecetaController],
    })
], RestauranteRecetaModule);
exports.RestauranteRecetaModule = RestauranteRecetaModule;
//# sourceMappingURL=restaurante-receta.module.js.map