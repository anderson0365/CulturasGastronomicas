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
exports.CiudadRestauranteController = void 0;
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../autenticar/guards/roles.guard");
const restaurante_service_1 = require("../restaurante/restaurante.service");
const errores_negocio_interceptor_1 = require("../compartido/interceptores/errores-negocio.interceptor");
const ciudad_restaurante_service_1 = require("./ciudad-restaurante.service");
const jwt_auth_guard_1 = require("../autenticar/guards/jwt-auth.guard");
const decoradores_1 = require("../compartido/seguridad/decoradores");
const usuario_1 = require("../usuario/usuario");
let CiudadRestauranteController = class CiudadRestauranteController {
    constructor(servicioCiudadRestaurante, servicioRestaurante) {
        this.servicioCiudadRestaurante = servicioCiudadRestaurante;
        this.servicioRestaurante = servicioRestaurante;
    }
    async agregarRestaurateCiudad(ciudadId, restauranteId) {
        return await this.servicioCiudadRestaurante.agregarRestauranteCiudad(ciudadId, restauranteId);
    }
    async obtenerRestauranteCiudad(ciudadId, restauranteId) {
        return await this.servicioCiudadRestaurante.obtenerRestauranteCiudad(ciudadId, restauranteId);
    }
    async obtenerTodosRestaurantesDeCiudad(ciudadId) {
        return await this.servicioCiudadRestaurante.obtenerTodosRestaurantesDeCiudad(ciudadId);
    }
    async associateArtworksMuseum(restaurantesIds, ciudadId) {
        const restaurantes = [];
        for (let i = 0; i < restaurantesIds.length; i++) {
            const restaurante = await this.servicioRestaurante.findOne(restaurantesIds[i]);
            restaurantes.push(restaurante);
        }
        return await this.servicioCiudadRestaurante.asociarRestaurantesCiudad(ciudadId, restaurantes);
    }
    async deleteArtworkMuseum(ciudadId, restauranteId) {
        return await this.servicioCiudadRestaurante.eliminarRestauranteCiudad(ciudadId, restauranteId);
    }
};
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Post)(':ciudadId/restaurantes/:restauranteId'),
    __param(0, (0, common_1.Param)('ciudadId')),
    __param(1, (0, common_1.Param)('restauranteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CiudadRestauranteController.prototype, "agregarRestaurateCiudad", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(':ciudadId/restaurantes/:restauranteId'),
    __param(0, (0, common_1.Param)('ciudadId')),
    __param(1, (0, common_1.Param)('restauranteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CiudadRestauranteController.prototype, "obtenerRestauranteCiudad", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(':ciudadId/restaurantes'),
    __param(0, (0, common_1.Param)('ciudadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CiudadRestauranteController.prototype, "obtenerTodosRestaurantesDeCiudad", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Put)(':ciudadId/restaurantes'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('ciudadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], CiudadRestauranteController.prototype, "associateArtworksMuseum", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ELIMINACION),
    (0, common_1.Delete)(':ciudadId/restaurantes/:restauranteId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('ciudadId')),
    __param(1, (0, common_1.Param)('restauranteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CiudadRestauranteController.prototype, "deleteArtworkMuseum", null);
CiudadRestauranteController = __decorate([
    (0, common_1.UseInterceptors)(errores_negocio_interceptor_1.ErroresNegocioInterceptor),
    (0, common_1.Controller)('ciudades'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [ciudad_restaurante_service_1.CiudadRestauranteService,
        restaurante_service_1.RestauranteService])
], CiudadRestauranteController);
exports.CiudadRestauranteController = CiudadRestauranteController;
//# sourceMappingURL=ciudad-restaurante.controller.js.map