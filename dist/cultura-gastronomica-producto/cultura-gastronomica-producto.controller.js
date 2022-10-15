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
exports.CulturaGastronomicaProductoController = void 0;
const common_1 = require("@nestjs/common");
const producto_service_1 = require("../producto/producto.service");
const errores_negocio_interceptor_1 = require("../compartido/interceptores/errores-negocio.interceptor");
const cultura_gastronomica_producto_service_1 = require("./cultura-gastronomica-producto.service");
const jwt_auth_guard_1 = require("../autenticar/guards/jwt-auth.guard");
const roles_guard_1 = require("../autenticar/guards/roles.guard");
const decoradores_1 = require("../compartido/seguridad/decoradores");
const usuario_1 = require("../usuario/usuario");
let CulturaGastronomicaProductoController = class CulturaGastronomicaProductoController {
    constructor(servicioCulturaGastronomicaProducto, servicioProducto, administradorCache) {
        this.servicioCulturaGastronomicaProducto = servicioCulturaGastronomicaProducto;
        this.servicioProducto = servicioProducto;
        this.administradorCache = administradorCache;
    }
    async agregarProductoCulturaGastronomica(culturaId, productoId) {
        return await this.servicioCulturaGastronomicaProducto.agregarProductoCulturaGastronomica(culturaId, productoId);
    }
    async obtenerProductoCulturaGastronomica(culturaId, productoId) {
        return await this.servicioCulturaGastronomicaProducto.obtenerProductoporCulturaGastronomica(culturaId, productoId);
    }
    async obtenerTodosProductosDeCulturaGastronomica(culturaId) {
        const almacenado = await this.administradorCache.get(culturaId);
        if (!almacenado) {
            const productos = await this.servicioCulturaGastronomicaProducto.obtenerTodosProductosporCultura(culturaId);
            await this.administradorCache.set(culturaId, productos);
            return productos;
        }
        return almacenado;
    }
    async asociarProductosACulturaGastronomica(productosIds, culturaId) {
        const productos = [];
        for (let i = 0; i < productosIds.length; i++) {
            const producto = await this.servicioProducto.obtenerUno(productosIds[i]);
            productos.push(producto);
        }
        return await this.servicioCulturaGastronomicaProducto.asociarProductoCultura(culturaId, productos);
    }
    async eliminarProductoDeCulturaGastronomica(culturaId, productoId) {
        return await this.servicioCulturaGastronomicaProducto.eliminarProductoCultura(culturaId, productoId);
    }
};
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Post)(':culturaId/productos/:productoId'),
    __param(0, (0, common_1.Param)('culturaId')),
    __param(1, (0, common_1.Param)('productoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaProductoController.prototype, "agregarProductoCulturaGastronomica", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(':culturaId/productos/:productoId'),
    __param(0, (0, common_1.Param)('culturaId')),
    __param(1, (0, common_1.Param)('productoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaProductoController.prototype, "obtenerProductoCulturaGastronomica", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.LECTOR),
    (0, common_1.Get)(':culturaId/productos'),
    __param(0, (0, common_1.Param)('culturaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaProductoController.prototype, "obtenerTodosProductosDeCulturaGastronomica", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ESCRITURA),
    (0, common_1.Put)(':culturaId/productos'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('culturaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaProductoController.prototype, "asociarProductosACulturaGastronomica", null);
__decorate([
    (0, decoradores_1.Roles)(usuario_1.Role.ADMIN, usuario_1.Role.ELIMINACION),
    (0, common_1.Delete)(':culturaId/productos/:productoId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('culturaId')),
    __param(1, (0, common_1.Param)('productoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CulturaGastronomicaProductoController.prototype, "eliminarProductoDeCulturaGastronomica", null);
CulturaGastronomicaProductoController = __decorate([
    (0, common_1.UseInterceptors)(errores_negocio_interceptor_1.ErroresNegocioInterceptor),
    (0, common_1.Controller)('culturasGastronomicas'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [cultura_gastronomica_producto_service_1.CulturaGastronomicaProductoService,
        producto_service_1.ProductoService, Object])
], CulturaGastronomicaProductoController);
exports.CulturaGastronomicaProductoController = CulturaGastronomicaProductoController;
//# sourceMappingURL=cultura-gastronomica-producto.controller.js.map