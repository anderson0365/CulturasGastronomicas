"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CulturaGastronomicaProductoModule = void 0;
const common_1 = require("@nestjs/common");
const sqliteStore = require("cache-manager-sqlite");
const typeorm_1 = require("@nestjs/typeorm");
const producto_entity_1 = require("../producto/producto.entity");
const cultura_gastronomica_entity_1 = require("../cultura-gastronomica/cultura-gastronomica.entity");
const cultura_gastronomica_producto_controller_1 = require("./cultura-gastronomica-producto.controller");
const cultura_gastronomica_producto_service_1 = require("./cultura-gastronomica-producto.service");
const producto_service_1 = require("../producto/producto.service");
const usuario_service_1 = require("../usuario/usuario.service");
const jwt_1 = require("@nestjs/jwt");
let CulturaGastronomicaProductoModule = class CulturaGastronomicaProductoModule {
};
CulturaGastronomicaProductoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([cultura_gastronomica_entity_1.CulturaGastronomicaEntity, producto_entity_1.ProductoEntity]),
            common_1.CacheModule.register({
                store: sqliteStore,
                path: ':memory:',
                options: {
                    ttl: 15
                },
            }),
        ],
        providers: [
            cultura_gastronomica_producto_service_1.CulturaGastronomicaProductoService,
            producto_service_1.ProductoService,
            jwt_1.JwtService,
            usuario_service_1.UsuarioService,
        ],
        controllers: [cultura_gastronomica_producto_controller_1.CulturaGastronomicaProductoController],
    })
], CulturaGastronomicaProductoModule);
exports.CulturaGastronomicaProductoModule = CulturaGastronomicaProductoModule;
//# sourceMappingURL=cultura-gastronomica-producto.module.js.map