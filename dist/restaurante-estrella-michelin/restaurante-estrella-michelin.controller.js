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
exports.RestauranteEstrellaMichelinController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../autenticar/guards/jwt-auth.guard");
const roles_guard_1 = require("../autenticar/guards/roles.guard");
const estrella_michelin_service_1 = require("../estrella-michelin/estrella-michelin.service");
const errores_negocio_interceptor_1 = require("../compartido/interceptores/errores-negocio.interceptor");
const restaurante_estrella_michelin_service_1 = require("./restaurante-estrella-michelin.service");
const usuario_1 = require("../usuario/usuario");
const decoradores_1 = require("../compartido/seguridad/decoradores");
let RestauranteEstrellaMichelinController = class RestauranteEstrellaMichelinController {
    constructor(restauranteEstrellaMichelinService, servicioEstrellaMichelin, administradorCache) {
        this.restauranteEstrellaMichelinService = restauranteEstrellaMichelinService;
        this.servicioEstrellaMichelin = servicioEstrellaMichelin;
        this.administradorCache = administradorCache;
    }
    async addEstrellaMichelinRestaurante(restauranteId, estrellaMichelinId) {
        return await this.restauranteEstrellaMichelinService.addEstrellaMichelinRestaurante(restauranteId, estrellaMichelinId);
    }
    async findEstrellaMichelinByRestauranteIdEstrellaMichelinId(restauranteId, estrellaMichelinId) {
        return await this.restauranteEstrellaMichelinService.findEstrellaMichelinByRestauranteIdEstrellaMichelinId(restauranteId, estrellaMichelinId);
    }
    async findEstrellaMichelinsByRestauranteId(restauranteId) {
        const almacenado = await this.administradorCache.get(restauranteId);
        if (!almacenado) {
            const estrellas = await this.restauranteEstrellaMichelinService.findEstrellaMichelinsByRestauranteId(restauranteId);
            await this.administradorCache.set(restauranteId, estrellas);
            return estrellas;
        }
        return almacenado;
    }
    async associateArtworksMuseum(estrellasMichelinIds, restauranteId) {
        const estrellasMichelin = [];
        for (let i = 0; i < estrellasMichelinIds.length; i++) {
            const estrella = await this.servicioEstrellaMichelin.findOne(estrellasMichelinIds[i]);
            estrellasMichelin.push(estrella);
        }
        return await this.restauranteEstrellaMichelinService.associateEstrellaMichelinsRestaurante(restauranteId, estrellasMichelin);
    }
    async deleteEstrellaMichelinRestaurante(restauranteId, estrellaMichelinId) {
        return await this.restauranteEstrellaMichelinService.deleteEstrellaMichelinRestaurante(restauranteId, estrellaMichelinId);
    }
};
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Post)(':restauranteId/estrellas-michelin/:estrellaMichelinId'),
    __param(0, (0, common_1.Param)('restauranteId')),
    __param(1, (0, common_1.Param)('estrellaMichelinId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RestauranteEstrellaMichelinController.prototype, "addEstrellaMichelinRestaurante", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(':restauranteId/estrellas-michelin/:estrellaMichelinId'),
    __param(0, (0, common_1.Param)('restauranteId')),
    __param(1, (0, common_1.Param)('estrellaMichelinId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RestauranteEstrellaMichelinController.prototype, "findEstrellaMichelinByRestauranteIdEstrellaMichelinId", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(':restauranteId/estrellas-michelin'),
    __param(0, (0, common_1.Param)('restauranteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestauranteEstrellaMichelinController.prototype, "findEstrellaMichelinsByRestauranteId", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Put)(':restauranteId/estrellas-michelin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('restauranteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], RestauranteEstrellaMichelinController.prototype, "associateArtworksMuseum", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ELIMINACION),
    (0, common_1.Delete)(':restauranteId/estrellas-michelin/:estrellaMichelinId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('restauranteId')),
    __param(1, (0, common_1.Param)('estrellaMichelinId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RestauranteEstrellaMichelinController.prototype, "deleteEstrellaMichelinRestaurante", null);
RestauranteEstrellaMichelinController = __decorate([
    (0, common_1.UseInterceptors)(errores_negocio_interceptor_1.ErroresNegocioInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('restaurantes'),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [restaurante_estrella_michelin_service_1.RestauranteEstrellaMichelinService,
        estrella_michelin_service_1.EstrellaMichelinService, Object])
], RestauranteEstrellaMichelinController);
exports.RestauranteEstrellaMichelinController = RestauranteEstrellaMichelinController;
//# sourceMappingURL=restaurante-estrella-michelin.controller.js.map