"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestauranteController = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const jwt_auth_guard_1 = require("../autenticar/guards/jwt-auth.guard");
const roles_guard_1 = require("../autenticar/guards/roles.guard");
const errores_negocio_interceptor_1 = require("../compartido/interceptores/errores-negocio.interceptor");
const decoradores_1 = require("../compartido/seguridad/decoradores");
const usuario_1 = require("../usuario/usuario");
const restaurante_dto_1 = require("./restaurante.dto");
const restaurante_entity_1 = require("./restaurante.entity");
const restaurante_service_1 = require("./restaurante.service");
let RestauranteController = class RestauranteController {
    constructor(restauranteService, administradorCache) {
        this.restauranteService = restauranteService;
        this.administradorCache = administradorCache;
    }
    async findAll() {
        const almacenado = await this.administradorCache.get('restaurantes');
        if (!almacenado) {
            const restaurantes = await this.restauranteService.findAll();
            await this.administradorCache.set('restaurantes', restaurantes);
            return restaurantes;
        }
        return almacenado;
    }
    async findOne(restauranteId) {
        return await this.restauranteService.findOne(restauranteId);
    }
    async create(restauranteDto) {
        const restaurante = (0, class_transformer_1.plainToInstance)(restaurante_entity_1.RestauranteEntity, restauranteDto);
        return await this.restauranteService.create(restaurante);
    }
    async update(restauranteId, restauranteDto) {
        const restaurante = (0, class_transformer_1.plainToInstance)(restaurante_entity_1.RestauranteEntity, restauranteDto);
        return await this.restauranteService.update(restauranteId, restaurante);
    }
    async delete(restauranteId) {
        return await this.restauranteService.delete(restauranteId);
    }
};
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR, usuario_1.Role.LECTOR_UNICO_RECURSO),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestauranteController.prototype, "findAll", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR, usuario_1.Role.LECTOR_UNICO_RECURSO),
    (0, common_1.Get)(':restauranteId'),
    __param(0, (0, common_1.Param)('restauranteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestauranteController.prototype, "findOne", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [restaurante_dto_1.RestauranteDto]),
    __metadata("design:returntype", Promise)
], RestauranteController.prototype, "create", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Put)(':restauranteId'),
    __param(0, (0, common_1.Param)('restauranteId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, restaurante_dto_1.RestauranteDto]),
    __metadata("design:returntype", Promise)
], RestauranteController.prototype, "update", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ELIMINACION),
    (0, common_1.Delete)(':restauranteId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('restauranteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestauranteController.prototype, "delete", null);
RestauranteController = __decorate([
    (0, common_1.Controller)('restaurantes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)(errores_negocio_interceptor_1.ErroresNegocioInterceptor),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [restaurante_service_1.RestauranteService, Object])
], RestauranteController);
exports.RestauranteController = RestauranteController;
//# sourceMappingURL=restaurante.controller.js.map