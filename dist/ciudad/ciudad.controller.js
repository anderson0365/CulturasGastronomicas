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
exports.CiudadController = void 0;
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../autenticar/guards/roles.guard");
const class_transformer_1 = require("class-transformer");
const errores_negocio_interceptor_1 = require("../compartido/interceptores/errores-negocio.interceptor");
const ciudad_dto_1 = require("./ciudad.dto");
const ciudad_entity_1 = require("./ciudad.entity");
const ciudad_service_1 = require("./ciudad.service");
const jwt_auth_guard_1 = require("../autenticar/guards/jwt-auth.guard");
const decoradores_1 = require("../compartido/seguridad/decoradores");
const usuario_1 = require("../usuario/usuario");
let CiudadController = class CiudadController {
    constructor(ciudadService) {
        this.ciudadService = ciudadService;
    }
    async findAll() {
        return await this.ciudadService.findAll();
    }
    async findOne(ciudadId) {
        return await this.ciudadService.findOne(ciudadId);
    }
    async create(ciudadDto) {
        const ciudad = (0, class_transformer_1.plainToInstance)(ciudad_entity_1.CiudadEntity, ciudadDto);
        return await this.ciudadService.create(ciudad);
    }
    async update(ciudadId, ciudadDto) {
        const ciudad = (0, class_transformer_1.plainToInstance)(ciudad_entity_1.CiudadEntity, ciudadDto);
        return await this.ciudadService.update(ciudadId, ciudad);
    }
    async delete(ciudadId) {
        return await this.ciudadService.delete(ciudadId);
    }
};
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CiudadController.prototype, "findAll", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(':ciudadId'),
    __param(0, (0, common_1.Param)('ciudadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CiudadController.prototype, "findOne", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ciudad_dto_1.CiudadDto]),
    __metadata("design:returntype", Promise)
], CiudadController.prototype, "create", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Put)(':ciudadId'),
    __param(0, (0, common_1.Param)('ciudadId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ciudad_dto_1.CiudadDto]),
    __metadata("design:returntype", Promise)
], CiudadController.prototype, "update", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ELIMINACION),
    (0, common_1.Delete)(':ciudadId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('ciudadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CiudadController.prototype, "delete", null);
CiudadController = __decorate([
    (0, common_1.Controller)('ciudades'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)(errores_negocio_interceptor_1.ErroresNegocioInterceptor),
    __metadata("design:paramtypes", [ciudad_service_1.CiudadService])
], CiudadController);
exports.CiudadController = CiudadController;
//# sourceMappingURL=ciudad.controller.js.map