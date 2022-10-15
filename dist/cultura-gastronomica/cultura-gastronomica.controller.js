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
exports.CulturaGastronomicaController = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const jwt_auth_guard_1 = require("../autenticar/guards/jwt-auth.guard");
const decoradores_1 = require("../compartido/seguridad/decoradores");
const errores_negocio_interceptor_1 = require("../compartido/interceptores/errores-negocio.interceptor");
const cultura_gastronomica_dto_1 = require("./cultura-gastronomica.dto");
const cultura_gastronomica_entity_1 = require("./cultura-gastronomica.entity");
const cultura_gastronomica_service_1 = require("./cultura-gastronomica.service");
const usuario_1 = require("../usuario/usuario");
const roles_guard_1 = require("../autenticar/guards/roles.guard");
let CulturaGastronomicaController = class CulturaGastronomicaController {
    constructor(servicioCulturaGastronomica, administradorCache) {
        this.servicioCulturaGastronomica = servicioCulturaGastronomica;
        this.administradorCache = administradorCache;
    }
    async obtenerTodos() {
        const almacenado = await this.administradorCache.get('culturas');
        if (!almacenado) {
            const culturas = await this.servicioCulturaGastronomica.obtenerTodos();
            await this.administradorCache.set('culturas', culturas);
            return culturas;
        }
        return almacenado;
    }
    async obtenerUno(culturaId) {
        return await this.servicioCulturaGastronomica.obtenerUno(culturaId);
    }
    async crear(culturaDto) {
        const cultura = (0, class_transformer_1.plainToInstance)(cultura_gastronomica_entity_1.CulturaGastronomicaEntity, culturaDto);
        return await this.servicioCulturaGastronomica.crear(cultura);
    }
    async actualizar(culturaId, culturaDto) {
        const cultura = (0, class_transformer_1.plainToInstance)(cultura_gastronomica_entity_1.CulturaGastronomicaEntity, culturaDto);
        return await this.servicioCulturaGastronomica.actualizar(culturaId, cultura);
    }
    async eliminar(culturaId) {
        return await this.servicioCulturaGastronomica.eliminar(culturaId);
    }
};
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR, usuario_1.Role.LECTOR_UNICO_RECURSO),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaController.prototype, "obtenerTodos", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR, usuario_1.Role.LECTOR_UNICO_RECURSO),
    (0, common_1.Get)(':culturaId'),
    __param(0, (0, common_1.Param)('culturaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaController.prototype, "obtenerUno", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cultura_gastronomica_dto_1.CulturaGastronomicaDto]),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaController.prototype, "crear", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Put)(':culturaId'),
    __param(0, (0, common_1.Param)('culturaId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cultura_gastronomica_dto_1.CulturaGastronomicaDto]),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaController.prototype, "actualizar", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ELIMINACION),
    (0, common_1.Delete)(':culturaId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('culturaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaController.prototype, "eliminar", null);
CulturaGastronomicaController = __decorate([
    (0, common_1.UseInterceptors)(errores_negocio_interceptor_1.ErroresNegocioInterceptor),
    (0, common_1.Controller)('culturasGastronomicas'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [cultura_gastronomica_service_1.CulturaGastronomicaService, Object])
], CulturaGastronomicaController);
exports.CulturaGastronomicaController = CulturaGastronomicaController;
//# sourceMappingURL=cultura-gastronomica.controller.js.map