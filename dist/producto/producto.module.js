"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const producto_entity_1 = require("./producto.entity");
const producto_service_1 = require("./producto.service");
const producto_controller_1 = require("./producto.controller");
const jwt_1 = require("@nestjs/jwt");
const sqliteStore = require("cache-manager-sqlite");
let ProductoModule = class ProductoModule {
};
ProductoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([producto_entity_1.ProductoEntity]),
            common_1.CacheModule.register({
                store: sqliteStore,
                path: ':memory:',
                options: {
                    ttl: 5
                },
            })
        ],
        providers: [producto_service_1.ProductoService, jwt_1.JwtService],
        controllers: [producto_controller_1.ProductoController]
    })
], ProductoModule);
exports.ProductoModule = ProductoModule;
//# sourceMappingURL=producto.module.js.map