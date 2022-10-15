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
exports.EstrellaMichelinController = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const usuario_1 = require("../usuario/usuario");
const jwt_auth_guard_1 = require("../autenticar/guards/jwt-auth.guard");
const roles_guard_1 = require("../autenticar/guards/roles.guard");
const errores_negocio_interceptor_1 = require("../compartido/interceptores/errores-negocio.interceptor");
const estrella_michelin_dto_1 = require("./estrella-michelin.dto");
const estrella_michelin_entity_1 = require("./estrella-michelin.entity");
const estrella_michelin_service_1 = require("./estrella-michelin.service");
const decoradores_1 = require("../compartido/seguridad/decoradores");
let EstrellaMichelinController = class EstrellaMichelinController {
    constructor(estrellaMichelinService, administradorCache) {
        this.estrellaMichelinService = estrellaMichelinService;
        this.administradorCache = administradorCache;
    }
    async findAll() {
        const almacenado = await this.administradorCache.get('estrellas-michelin');
        if (!almacenado) {
            const estrellas = await this.estrellaMichelinService.findAll();
            await this.administradorCache.set('estrellas-michelin', estrellas);
            return estrellas;
        }
        return almacenado;
    }
    async findOne(estrellaMichelinId) {
        return await this.estrellaMichelinService.findOne(estrellaMichelinId);
    }
    async create(estrellaMichelinDto) {
        const estrella = (0, class_transformer_1.plainToInstance)(estrella_michelin_entity_1.EstrellaMichelinEntity, estrellaMichelinDto);
        return await this.estrellaMichelinService.create(estrella);
    }
    async update(estrellaMichelinId, estrellaMichelinDto) {
        const estrella = (0, class_transformer_1.plainToInstance)(estrella_michelin_entity_1.EstrellaMichelinEntity, estrellaMichelinDto);
        return await this.estrellaMichelinService.update(estrellaMichelinId, estrella);
    }
    async delete(estrellaMichelinId) {
        return await this.estrellaMichelinService.delete(estrellaMichelinId);
    }
};
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR, usuario_1.Role.LECTOR_UNICO_RECURSO),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EstrellaMichelinController.prototype, "findAll", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR, usuario_1.Role.LECTOR_UNICO_RECURSO),
    (0, common_1.Get)(':estrellaMichelinId'),
    __param(0, (0, common_1.Param)('estrellaMichelinId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstrellaMichelinController.prototype, "findOne", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [estrella_michelin_dto_1.EstrellaMichelinDto]),
    __metadata("design:returntype", Promise)
], EstrellaMichelinController.prototype, "create", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Put)(':estrellaMichelinId'),
    __param(0, (0, common_1.Param)('estrellaMichelinId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, estrella_michelin_dto_1.EstrellaMichelinDto]),
    __metadata("design:returntype", Promise)
], EstrellaMichelinController.prototype, "update", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ELIMINACION),
    (0, common_1.Delete)(':estrellaMichelinId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('estrellaMichelinId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstrellaMichelinController.prototype, "delete", null);
EstrellaMichelinController = __decorate([
    (0, common_1.UseInterceptors)(errores_negocio_interceptor_1.ErroresNegocioInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('estrellas-michelin'),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [estrella_michelin_service_1.EstrellaMichelinService, Object])
], EstrellaMichelinController);
exports.EstrellaMichelinController = EstrellaMichelinController;
//# sourceMappingURL=estrella-michelin.controller.js.map