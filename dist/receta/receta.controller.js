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
exports.RecetaController = void 0;
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../autenticar/guards/roles.guard");
const class_transformer_1 = require("class-transformer");
const errores_negocio_interceptor_1 = require("../compartido/interceptores/errores-negocio.interceptor");
const receta_dto_1 = require("./receta.dto");
const receta_entity_1 = require("./receta.entity");
const receta_service_1 = require("./receta.service");
const jwt_auth_guard_1 = require("../autenticar/guards/jwt-auth.guard");
const decoradores_1 = require("../compartido/seguridad/decoradores");
const usuario_1 = require("../usuario/usuario");
let RecetaController = class RecetaController {
    constructor(recetaService) {
        this.recetaService = recetaService;
    }
    async findAll() {
        return await this.recetaService.findAll();
    }
    async findOne(recetaId) {
        return await this.recetaService.findOne(recetaId);
    }
    async create(recetaDto) {
        const receta = (0, class_transformer_1.plainToInstance)(receta_entity_1.RecetaEntity, recetaDto);
        return await this.recetaService.create(receta);
    }
    async update(recetaId, recetaDto) {
        const receta = (0, class_transformer_1.plainToInstance)(receta_entity_1.RecetaEntity, recetaDto);
        return await this.recetaService.update(recetaId, receta);
    }
    async delete(recetaId) {
        return await this.recetaService.delete(recetaId);
    }
};
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecetaController.prototype, "findAll", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(':recetaId'),
    __param(0, (0, common_1.Param)('recetaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecetaController.prototype, "findOne", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [receta_dto_1.RecetaDto]),
    __metadata("design:returntype", Promise)
], RecetaController.prototype, "create", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Put)(':recetaId'),
    __param(0, (0, common_1.Param)('recetaId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, receta_dto_1.RecetaDto]),
    __metadata("design:returntype", Promise)
], RecetaController.prototype, "update", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ELIMINACION),
    (0, common_1.Delete)(':recetaId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('recetaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecetaController.prototype, "delete", null);
RecetaController = __decorate([
    (0, common_1.Controller)('recetas'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)(errores_negocio_interceptor_1.ErroresNegocioInterceptor),
    __metadata("design:paramtypes", [receta_service_1.RecetaService])
], RecetaController);
exports.RecetaController = RecetaController;
//# sourceMappingURL=receta.controller.js.map