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
exports.CulturaGastronomicaRecetaController = void 0;
const common_1 = require("@nestjs/common");
const errores_negocio_interceptor_1 = require("../compartido/interceptores/errores-negocio.interceptor");
const receta_service_1 = require("../receta/receta.service");
const cultura_gastronomica_receta_service_1 = require("./cultura-gastronomica-receta.service");
const jwt_auth_guard_1 = require("../autenticar/guards/jwt-auth.guard");
const roles_guard_1 = require("../autenticar/guards/roles.guard");
const decoradores_1 = require("../compartido/seguridad/decoradores");
const usuario_1 = require("../usuario/usuario");
let CulturaGastronomicaRecetaController = class CulturaGastronomicaRecetaController {
    constructor(servicioCulturaGastronomicaReceta, servicioReceta, administradorCache) {
        this.servicioCulturaGastronomicaReceta = servicioCulturaGastronomicaReceta;
        this.servicioReceta = servicioReceta;
        this.administradorCache = administradorCache;
    }
    async agregarRecetaCulturaGastronomica(culturaId, recetaId) {
        return await this.servicioCulturaGastronomicaReceta.agregarRecetaCulturaGastronomica(culturaId, recetaId);
    }
    async obtenerRecetaCulturaGastronomica(culturaId, recetaId) {
        return await this.servicioCulturaGastronomicaReceta.obtenerRecetaCulturaGastronomica(culturaId, recetaId);
    }
    async obtenerTodosRecetaesDeCulturaGastronomica(culturaId) {
        const almacenado = await this.administradorCache.get(culturaId);
        if (!almacenado) {
            const recetas = await this.servicioCulturaGastronomicaReceta.obtenerTodasRecetasDeCulturaGastronomica(culturaId);
            await this.administradorCache.set(culturaId, recetas);
            return recetas;
        }
        return almacenado;
    }
    async asociarRecetasACulturaGastronomica(recetasIds, culturaId) {
        const recetas = [];
        for (let i = 0; i < recetasIds.length; i++) {
            const receta = await this.servicioReceta.findOne(recetasIds[i]);
            recetas.push(receta);
        }
        return await this.servicioCulturaGastronomicaReceta.asociarRecetasCulturaGastronomica(culturaId, recetas);
    }
    async eliminarRecetaDeCulturaGastronomica(culturaId, recetaId) {
        return await this.servicioCulturaGastronomicaReceta.eliminarRecetaCulturaGastronomica(culturaId, recetaId);
    }
};
__decorate([
    (0, common_1.Post)(':culturaId/recetas/:recetaId'),
    __param(0, (0, common_1.Param)('culturaId')),
    __param(1, (0, common_1.Param)('recetaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaRecetaController.prototype, "agregarRecetaCulturaGastronomica", null);
__decorate([
    (0, common_1.Get)(':culturaId/recetas/:recetaId'),
    __param(0, (0, common_1.Param)('culturaId')),
    __param(1, (0, common_1.Param)('recetaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaRecetaController.prototype, "obtenerRecetaCulturaGastronomica", null);
__decorate([
    (0, common_1.Get)(':culturaId/recetas'),
    __param(0, (0, common_1.Param)('culturaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaRecetaController.prototype, "obtenerTodosRecetaesDeCulturaGastronomica", null);
__decorate([
    (0, common_1.Put)(':culturaId/recetas'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('culturaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaRecetaController.prototype, "asociarRecetasACulturaGastronomica", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ELIMINACION),
    (0, common_1.Delete)(':culturaId/recetas/:recetaId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('culturaId')),
    __param(1, (0, common_1.Param)('recetaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaRecetaController.prototype, "eliminarRecetaDeCulturaGastronomica", null);
CulturaGastronomicaRecetaController = __decorate([
    (0, common_1.UseInterceptors)(errores_negocio_interceptor_1.ErroresNegocioInterceptor),
    (0, common_1.Controller)('culturasGastronomicas'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [cultura_gastronomica_receta_service_1.CulturaGastronomicaRecetaService,
        receta_service_1.RecetaService, Object])
], CulturaGastronomicaRecetaController);
exports.CulturaGastronomicaRecetaController = CulturaGastronomicaRecetaController;
//# sourceMappingURL=cultura-gastronomica-receta.controller.js.map