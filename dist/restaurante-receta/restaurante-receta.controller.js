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
exports.RestauranteRecetaController = void 0;
const common_1 = require("@nestjs/common");
const receta_service_1 = require("../receta/receta.service");
const errores_negocio_interceptor_1 = require("../compartido/interceptores/errores-negocio.interceptor");
const restaurante_receta_service_1 = require("./restaurante-receta.service");
const jwt_auth_guard_1 = require("../autenticar/guards/jwt-auth.guard");
const roles_guard_1 = require("../autenticar/guards/roles.guard");
const usuario_1 = require("../usuario/usuario");
const decoradores_1 = require("../compartido/seguridad/decoradores");
let RestauranteRecetaController = class RestauranteRecetaController {
    constructor(restauranteRecetaService, servicioReceta, administradorCache) {
        this.restauranteRecetaService = restauranteRecetaService;
        this.servicioReceta = servicioReceta;
        this.administradorCache = administradorCache;
    }
    async addRecetaRestaurante(restauranteId, recetaId) {
        return await this.restauranteRecetaService.agregarRecetaRestaurante(restauranteId, recetaId);
    }
    async findRecetaByRestauranteIdRecetaId(restauranteId, recetaId) {
        return await this.restauranteRecetaService.obtenerRecetaRestaurante(restauranteId, recetaId);
    }
    async findRecetasByRestauranteId(restauranteId) {
        const almacenado = await this.administradorCache.get(restauranteId);
        if (!almacenado) {
            const recetas = await this.restauranteRecetaService.obtenerTodasRecetasDeRestaurante(restauranteId);
            await this.administradorCache.set(restauranteId, recetas);
            return recetas;
        }
        return almacenado;
    }
    async associateArtworksMuseum(recetasIds, restauranteId) {
        const recetas = [];
        for (let i = 0; i < recetasIds.length; i++) {
            const pais = await this.servicioReceta.findOne(recetasIds[i]);
            recetas.push(pais);
        }
        return await this.restauranteRecetaService.asociarRecetasRestaurante(restauranteId, recetas);
    }
    async deleteRecetaRestaurante(restauranteId, recetaId) {
        return await this.restauranteRecetaService.eliminarRecetaRestaurante(restauranteId, recetaId);
    }
};
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Post)(':restauranteId/recetas/:recetaId'),
    __param(0, (0, common_1.Param)('restauranteId')),
    __param(1, (0, common_1.Param)('recetaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RestauranteRecetaController.prototype, "addRecetaRestaurante", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(':restauranteId/recetas/:recetaId'),
    __param(0, (0, common_1.Param)('restauranteId')),
    __param(1, (0, common_1.Param)('recetaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RestauranteRecetaController.prototype, "findRecetaByRestauranteIdRecetaId", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(':restauranteId/recetas'),
    __param(0, (0, common_1.Param)('restauranteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestauranteRecetaController.prototype, "findRecetasByRestauranteId", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Put)(':restauranteId/recetas'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('restauranteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], RestauranteRecetaController.prototype, "associateArtworksMuseum", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ELIMINACION),
    (0, common_1.Delete)(':restauranteId/recetas/:recetaId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('restauranteId')),
    __param(1, (0, common_1.Param)('recetaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RestauranteRecetaController.prototype, "deleteRecetaRestaurante", null);
RestauranteRecetaController = __decorate([
    (0, common_1.UseInterceptors)(errores_negocio_interceptor_1.ErroresNegocioInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('restaurantes'),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [restaurante_receta_service_1.RestauranteRecetaService,
        receta_service_1.RecetaService, Object])
], RestauranteRecetaController);
exports.RestauranteRecetaController = RestauranteRecetaController;
//# sourceMappingURL=restaurante-receta.controller.js.map