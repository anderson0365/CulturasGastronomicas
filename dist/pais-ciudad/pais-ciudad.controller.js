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
exports.PaisCiudadController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../autenticar/guards/jwt-auth.guard");
const roles_guard_1 = require("../autenticar/guards/roles.guard");
const decoradores_1 = require("../compartido/seguridad/decoradores");
const usuario_1 = require("../usuario/usuario");
const ciudad_service_1 = require("../ciudad/ciudad.service");
const errores_negocio_interceptor_1 = require("../compartido/interceptores/errores-negocio.interceptor");
const pais_ciudad_service_1 = require("./pais-ciudad.service");
let PaisCiudadController = class PaisCiudadController {
    constructor(servicioPaisCiudades, servicioCiudad) {
        this.servicioPaisCiudades = servicioPaisCiudades;
        this.servicioCiudad = servicioCiudad;
    }
    async agregarRecetaCulturaGastronomica(paisId, ciudadId) {
        return await this.servicioPaisCiudades.agregarCiudadPais(paisId, ciudadId);
    }
    async obtenerRecetaCulturaGastronomica(paisId, ciudadId) {
        return await this.servicioPaisCiudades.obtenerCiudadPais(paisId, ciudadId);
    }
    async obtenerTodosRecetaesDeCulturaGastronomica(paisId) {
        return await this.servicioPaisCiudades.obtenerTodasCiudadesPais(paisId);
    }
    async associateArtworksMuseum(ciudadesIds, paisId) {
        const ciudades = [];
        for (let i = 0; i < ciudadesIds.length; i++) {
            const receta = await this.servicioCiudad.findOne(ciudadesIds[i]);
            ciudades.push(receta);
        }
        return await this.servicioPaisCiudades.asociarCiudadesPais(paisId, ciudades);
    }
    async deleteArtworkMuseum(paisId, ciudadId) {
        return await this.servicioPaisCiudades.eliminarCiudadPais(paisId, ciudadId);
    }
};
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Post)(':paisId/ciudades/:ciudadId'),
    __param(0, (0, common_1.Param)('paisId')),
    __param(1, (0, common_1.Param)('ciudadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PaisCiudadController.prototype, "agregarRecetaCulturaGastronomica", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(':paisId/ciudades/:ciudadId'),
    __param(0, (0, common_1.Param)('paisId')),
    __param(1, (0, common_1.Param)('ciudadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PaisCiudadController.prototype, "obtenerRecetaCulturaGastronomica", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(':paisId/ciudades'),
    __param(0, (0, common_1.Param)('paisId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaisCiudadController.prototype, "obtenerTodosRecetaesDeCulturaGastronomica", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Put)(':paisId/ciudades'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('paisId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], PaisCiudadController.prototype, "associateArtworksMuseum", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ELIMINACION),
    (0, common_1.Delete)(':paisId/ciudades/:ciudadId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('paisId')),
    __param(1, (0, common_1.Param)('ciudadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PaisCiudadController.prototype, "deleteArtworkMuseum", null);
PaisCiudadController = __decorate([
    (0, common_1.Controller)('paises'),
    (0, common_1.UseInterceptors)(errores_negocio_interceptor_1.ErroresNegocioInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [pais_ciudad_service_1.PaisCiudadService,
        ciudad_service_1.CiudadService])
], PaisCiudadController);
exports.PaisCiudadController = PaisCiudadController;
//# sourceMappingURL=pais-ciudad.controller.js.map