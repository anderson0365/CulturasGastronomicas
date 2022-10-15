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
exports.ProductoController = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const roles_guard_1 = require("../autenticar/guards/roles.guard");
const jwt_auth_guard_1 = require("../autenticar/guards/jwt-auth.guard");
const errores_negocio_interceptor_1 = require("../compartido/interceptores/errores-negocio.interceptor");
const producto_dto_1 = require("./producto.dto");
const producto_entity_1 = require("./producto.entity");
const producto_service_1 = require("./producto.service");
const decoradores_1 = require("../compartido/seguridad/decoradores");
const usuario_1 = require("../usuario/usuario");
let ProductoController = class ProductoController {
    constructor(servicioProductos) {
        this.servicioProductos = servicioProductos;
    }
    async obtenerTodos() {
        return await this.servicioProductos.obtenerTodos();
    }
    async obtenerUno(productoId) {
        return await this.servicioProductos.obtenerUno(productoId);
    }
    async crear(productoDto) {
        const producto = (0, class_transformer_1.plainToInstance)(producto_entity_1.ProductoEntity, productoDto);
        return await this.servicioProductos.crear(producto);
    }
    async actualizar(productoId, productoDto) {
        const producto = (0, class_transformer_1.plainToInstance)(producto_entity_1.ProductoEntity, productoDto);
        return await this.servicioProductos.actualizar(productoId, producto);
    }
    async eliminar(productoId) {
        return await this.servicioProductos.borrar(productoId);
    }
};
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR, usuario_1.Role.LECTOR_UNICO_RECURSO),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "obtenerTodos", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR, usuario_1.Role.LECTOR_UNICO_RECURSO),
    (0, common_1.Get)(':productoId'),
    __param(0, (0, common_1.Param)('productoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "obtenerUno", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [producto_dto_1.ProductoDto]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "crear", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Put)(':productoId'),
    __param(0, (0, common_1.Param)('productoId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, producto_dto_1.ProductoDto]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "actualizar", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ELIMINACION),
    (0, common_1.Delete)(':productoId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('productoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "eliminar", null);
ProductoController = __decorate([
    (0, common_1.UseInterceptors)(errores_negocio_interceptor_1.ErroresNegocioInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('productos'),
    __metadata("design:paramtypes", [producto_service_1.ProductoService])
], ProductoController);
exports.ProductoController = ProductoController;
//# sourceMappingURL=producto.controller.js.map