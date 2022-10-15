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
exports.PaisCulturaGastronomicaController = void 0;
const common_1 = require("@nestjs/common");
const errores_negocio_interceptor_1 = require("../compartido/interceptores/errores-negocio.interceptor");
const pais_cultura_gastronomica_service_1 = require("./pais-cultura-gastronomica.service");
const cultura_gastronomica_service_1 = require("../cultura-gastronomica/cultura-gastronomica.service");
const jwt_auth_guard_1 = require("../autenticar/guards/jwt-auth.guard");
const roles_guard_1 = require("../autenticar/guards/roles.guard");
const decoradores_1 = require("../compartido/seguridad/decoradores");
const usuario_1 = require("../usuario/usuario");
let PaisCulturaGastronomicaController = class PaisCulturaGastronomicaController {
    constructor(servicioPaisCulturaGastronomica, servicioCulturaGastronomica) {
        this.servicioPaisCulturaGastronomica = servicioPaisCulturaGastronomica;
        this.servicioCulturaGastronomica = servicioCulturaGastronomica;
    }
    async agregarCulturaGastronomicaPais(paisId, culturaId) {
        return await this.servicioPaisCulturaGastronomica.agregarCulturaGastronomicaPais(paisId, culturaId);
    }
    async obtenerCulturaGastronomicaPais(paisId, culturaId) {
        return await this.servicioPaisCulturaGastronomica.obtenerCulturaGastronomicaPais(paisId, culturaId);
    }
    async obtenerTodasRecetasDeCulturaGastronomica(paisId) {
        return await this.servicioPaisCulturaGastronomica.obtenerTodasRecetasDeCulturaGastronomica(paisId);
    }
    async asociarCulturaGastronomicaPais(culturasIds, paisId) {
        const culturas = [];
        for (let i = 0; i < culturasIds.length; i++) {
            const cultura = await this.servicioCulturaGastronomica.obtenerUno(culturasIds[i]);
            culturas.push(cultura);
        }
        return await this.servicioPaisCulturaGastronomica.asociarCulturaGastronomicaPais(paisId, culturas);
    }
    async eliminarCulturaGastronomicaPais(paisId, culturaId) {
        return await this.servicioPaisCulturaGastronomica.eliminarCulturaGastronomicaPais(paisId, culturaId);
    }
};
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Post)(':paisId/culturasGastronomicas/:culturaId'),
    __param(0, (0, common_1.Param)('paisId')),
    __param(1, (0, common_1.Param)('culturaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PaisCulturaGastronomicaController.prototype, "agregarCulturaGastronomicaPais", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(':paisId/culturasGastronomicas/:culturaId'),
    __param(0, (0, common_1.Param)('paisId')),
    __param(1, (0, common_1.Param)('culturaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PaisCulturaGastronomicaController.prototype, "obtenerCulturaGastronomicaPais", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(':paisId/culturasGastronomicas'),
    __param(0, (0, common_1.Param)('paisId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaisCulturaGastronomicaController.prototype, "obtenerTodasRecetasDeCulturaGastronomica", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Put)(':paisId/culturasGastronomicas'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('paisId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], PaisCulturaGastronomicaController.prototype, "asociarCulturaGastronomicaPais", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ELIMINACION),
    (0, common_1.Delete)(':paisId/culturasGastronomicas/:culturaId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('paisId')),
    __param(1, (0, common_1.Param)('culturaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PaisCulturaGastronomicaController.prototype, "eliminarCulturaGastronomicaPais", null);
PaisCulturaGastronomicaController = __decorate([
    (0, common_1.Controller)('paises'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)(errores_negocio_interceptor_1.ErroresNegocioInterceptor),
    __metadata("design:paramtypes", [pais_cultura_gastronomica_service_1.PaisCulturaGastronomicaService,
        cultura_gastronomica_service_1.CulturaGastronomicaService])
], PaisCulturaGastronomicaController);
exports.PaisCulturaGastronomicaController = PaisCulturaGastronomicaController;
//# sourceMappingURL=pais-cultura-gastronomica.controller.js.map