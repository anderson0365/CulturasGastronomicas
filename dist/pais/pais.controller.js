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
exports.PaisController = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const roles_guard_1 = require("../autenticar/guards/roles.guard");
const jwt_auth_guard_1 = require("../autenticar/guards/jwt-auth.guard");
const errores_negocio_interceptor_1 = require("../compartido/interceptores/errores-negocio.interceptor");
const pais_dto_1 = require("./pais.dto");
const pais_entity_1 = require("./pais.entity");
const pais_service_1 = require("./pais.service");
const decoradores_1 = require("../compartido/seguridad/decoradores");
const usuario_1 = require("../usuario/usuario");
let PaisController = class PaisController {
    constructor(servicioPais) {
        this.servicioPais = servicioPais;
    }
    async obtenerTodos() {
        return await this.servicioPais.obtenerTodos();
    }
    async obtenerUno(paisId) {
        return await this.servicioPais.obtenerUno(paisId);
    }
    async create(paisDto) {
        const pais = (0, class_transformer_1.plainToInstance)(pais_entity_1.PaisEntity, paisDto);
        return await this.servicioPais.crear(pais);
    }
    async update(paisId, paisDto) {
        const pais = (0, class_transformer_1.plainToInstance)(pais_entity_1.PaisEntity, paisDto);
        return await this.servicioPais.actualizar(paisId, pais);
    }
    async eliminar(paisId) {
        return await this.servicioPais.borrar(paisId);
    }
};
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaisController.prototype, "obtenerTodos", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(':paisId'),
    __param(0, (0, common_1.Param)('paisId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaisController.prototype, "obtenerUno", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pais_dto_1.PaisDto]),
    __metadata("design:returntype", Promise)
], PaisController.prototype, "create", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Put)(':paisId'),
    __param(0, (0, common_1.Param)('paisId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pais_dto_1.PaisDto]),
    __metadata("design:returntype", Promise)
], PaisController.prototype, "update", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ELIMINACION),
    (0, common_1.Delete)(':paisId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('paisId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaisController.prototype, "eliminar", null);
PaisController = __decorate([
    (0, common_1.UseInterceptors)(errores_negocio_interceptor_1.ErroresNegocioInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('paises'),
    __metadata("design:paramtypes", [pais_service_1.PaisService])
], PaisController);
exports.PaisController = PaisController;
//# sourceMappingURL=pais.controller.js.map