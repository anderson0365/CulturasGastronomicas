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
exports.CulturaGastronomicaProductoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const errores_negocio_1 = require("../compartido/errores-negocio");
const cultura_gastronomica_entity_1 = require("../cultura-gastronomica/cultura-gastronomica.entity");
const producto_entity_1 = require("../producto/producto.entity");
const typeorm_2 = require("typeorm");
let CulturaGastronomicaProductoService = class CulturaGastronomicaProductoService {
    constructor(repositorioCulturaGastronomica, repositorioProducto) {
        this.repositorioCulturaGastronomica = repositorioCulturaGastronomica;
        this.repositorioProducto = repositorioProducto;
    }
    async agregarProductoCulturaGastronomica(culturaId, productoId) {
        const producto = await this.repositorioProducto.findOne({
            where: { id: productoId },
        });
        if (!producto)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('producto dado no fue encontrado.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const cultura = await this.repositorioCulturaGastronomica.findOne({
            where: { id: culturaId },
            relations: ['productos'],
        });
        if (!cultura)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('CulturaGastronomica dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        cultura.productos = [...cultura.productos, producto];
        return await this.repositorioCulturaGastronomica.save(cultura);
    }
    async obtenerProductoporCulturaGastronomica(culturaId, productoId) {
        return ((await this.__obtenerProductoporCulturaGastronomica(culturaId, productoId))[1]);
    }
    async obtenerTodosProductosporCultura(culturaId) {
        const cultura = await this.repositorioCulturaGastronomica.findOne({
            where: { id: culturaId },
            relations: ['productos'],
        });
        if (!cultura)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('CulturaGastronomica dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        return cultura.productos;
    }
    async asociarProductoCultura(culturaId, productos) {
        const cultura = await this.repositorioCulturaGastronomica.findOne({
            where: { id: culturaId },
            relations: ['productos'],
        });
        if (!cultura)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('CulturaGastronomica dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        for (let i = 0; i < productos.length; i++) {
            const producto = await this.repositorioProducto.findOne({
                where: { id: productos[i].id },
            });
            if (!producto)
                throw new errores_negocio_1.ExcepcionLogicaNegocio('producto dado no fue encontrado.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        }
        cultura.productos = productos;
        return await this.repositorioCulturaGastronomica.save(cultura);
    }
    async eliminarProductoCultura(culturaId, productoId) {
        const cultura = ((await this.__obtenerProductoporCulturaGastronomica(culturaId, productoId))[0]);
        cultura.productos = cultura.productos.filter((e) => e.id !== productoId);
        await this.repositorioCulturaGastronomica.save(cultura);
    }
    async __obtenerProductoporCulturaGastronomica(culturaId, productoId) {
        const producto = await this.repositorioProducto.findOne({
            where: { id: productoId },
        });
        if (!producto)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('producto dado no fue encontrado.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const cultura = await this.repositorioCulturaGastronomica.findOne({
            where: { id: culturaId },
            relations: ['productos'],
        });
        if (!cultura)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('CulturaGastronomica dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const culturaProducto = cultura.productos.find((e) => e.id === producto.id);
        if (!culturaProducto)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Producto dado no esta asociado a CulturaGastronomica dada.', errores_negocio_1.ErrorNegocio.PRECONDICION_FALLIDA);
        return [cultura, culturaProducto];
    }
};
CulturaGastronomicaProductoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cultura_gastronomica_entity_1.CulturaGastronomicaEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(producto_entity_1.ProductoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CulturaGastronomicaProductoService);
exports.CulturaGastronomicaProductoService = CulturaGastronomicaProductoService;
//# sourceMappingURL=cultura-gastronomica-producto.service.js.map