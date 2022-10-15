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
exports.CulturaGastronomicaPaisController = void 0;
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../autenticar/guards/roles.guard");
const pais_service_1 = require("../pais/pais.service");
const errores_negocio_interceptor_1 = require("../compartido/interceptores/errores-negocio.interceptor");
const cultura_gastronomica_pais_service_1 = require("./cultura-gastronomica-pais.service");
const jwt_auth_guard_1 = require("../autenticar/guards/jwt-auth.guard");
const decoradores_1 = require("../compartido/seguridad/decoradores");
const usuario_1 = require("../usuario/usuario");
let CulturaGastronomicaPaisController = class CulturaGastronomicaPaisController {
    constructor(servicioCulturaGastronomicaPais, servicioPais, administradorCache) {
        this.servicioCulturaGastronomicaPais = servicioCulturaGastronomicaPais;
        this.servicioPais = servicioPais;
        this.administradorCache = administradorCache;
    }
    async agregarPaisCulturaGastronomica(culturaId, paisId) {
        return await this.servicioCulturaGastronomicaPais.agregarPaisCulturaGastronomica(culturaId, paisId);
    }
    async obtenerPaisCulturaGastronomica(culturaId, paisId) {
        return await this.servicioCulturaGastronomicaPais.obtenerPaisCulturaGastronomica(culturaId, paisId);
    }
    async obtenerTodosPaisesDeCulturaGastronomica(culturaId) {
        const almacenado = await this.administradorCache.get(culturaId);
        if (!almacenado) {
            const paises = await this.servicioCulturaGastronomicaPais.obtenerTodosPaisesDeCulturaGastronomica(culturaId);
            await this.administradorCache.set(culturaId, paises);
            return paises;
        }
        return almacenado;
    }
    async asociarPaisesACulturaGastronomica(paisesIds, culturaId) {
        const paises = [];
        for (let i = 0; i < paisesIds.length; i++) {
            const pais = await this.servicioPais.obtenerUno(paisesIds[i]);
            paises.push(pais);
        }
        return await this.servicioCulturaGastronomicaPais.asociarPaisesCulturaGastronomica(culturaId, paises);
    }
    async eliminarPaisCulturaGatronomica(culturaId, paisId) {
        return await this.servicioCulturaGastronomicaPais.eliminarPaisCulturaGastronomica(culturaId, paisId);
    }
};
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Post)(':culturaId/paises/:paisId'),
    __param(0, (0, common_1.Param)('culturaId')),
    __param(1, (0, common_1.Param)('paisId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaPaisController.prototype, "agregarPaisCulturaGastronomica", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(':culturaId/paises/:paisId'),
    __param(0, (0, common_1.Param)('culturaId')),
    __param(1, (0, common_1.Param)('paisId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaPaisController.prototype, "obtenerPaisCulturaGastronomica", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(':culturaId/paises'),
    __param(0, (0, common_1.Param)('culturaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaPaisController.prototype, "obtenerTodosPaisesDeCulturaGastronomica", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Put)(':culturaId/paises'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('culturaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaPaisController.prototype, "asociarPaisesACulturaGastronomica", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ELIMINACION),
    (0, common_1.Delete)(':culturaId/paises/:paisId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('culturaId')),
    __param(1, (0, common_1.Param)('paisId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaPaisController.prototype, "eliminarPaisCulturaGatronomica", null);
CulturaGastronomicaPaisController = __decorate([
    (0, common_1.UseInterceptors)(errores_negocio_interceptor_1.ErroresNegocioInterceptor),
    (0, common_1.Controller)('culturasGastronomicas'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [cultura_gastronomica_pais_service_1.CulturaGastronomicaPaisService,
        pais_service_1.PaisService, Object])
], CulturaGastronomicaPaisController);
exports.CulturaGastronomicaPaisController = CulturaGastronomicaPaisController;
//# sourceMappingURL=cultura-gastronomica-pais.controller.js.map