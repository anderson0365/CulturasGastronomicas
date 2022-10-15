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
exports.ProductoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const errores_negocio_1 = require("../compartido/errores-negocio");
const typeorm_2 = require("typeorm");
const producto_entity_1 = require("./producto.entity");
let ProductoService = class ProductoService {
    constructor(productoRepository, cacheManager) {
        this.productoRepository = productoRepository;
        this.cacheManager = cacheManager;
        this.cacheKey = "cacheProductos";
    }
    async obtenerTodos() {
        const cached = await this.cacheManager.get(this.cacheKey);
        if (!cached) {
            const productos = await this.productoRepository.find({});
            await this.cacheManager.set(this.cacheKey, productos);
            return productos;
        }
        return cached;
    }
    async obtenerUno(id) {
        const producto = await this.productoRepository.findOne({ where: { id }, });
        if (!producto)
            throw new errores_negocio_1.ExcepcionLogicaNegocio("El Producto con el Id no ha sido encontrado", errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        return producto;
    }
    async crear(producto) {
        return await this.productoRepository.save(producto);
    }
    async actualizar(id, producto) {
        const productoPersistido = await this.productoRepository.findOne({ where: { id } });
        if (!productoPersistido)
            throw new errores_negocio_1.ExcepcionLogicaNegocio("El producto no fue encontrado", errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        return await this.productoRepository.save(Object.assign(Object.assign({}, productoPersistido), producto));
    }
    async borrar(id) {
        const producto = await this.productoRepository.findOne({ where: { id } });
        if (!producto)
            throw new errores_negocio_1.ExcepcionLogicaNegocio("El producto no fue encontrado", errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        await this.productoRepository.remove(producto);
    }
};
ProductoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(producto_entity_1.ProductoEntity)),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], ProductoService);
exports.ProductoService = ProductoService;
//# sourceMappingURL=producto.service.js.map