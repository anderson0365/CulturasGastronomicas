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
exports.RestauranteRecetaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const errores_negocio_1 = require("../compartido/errores-negocio");
const restaurante_entity_1 = require("../restaurante/restaurante.entity");
const receta_entity_1 = require("../receta/receta.entity");
const typeorm_2 = require("typeorm");
let RestauranteRecetaService = class RestauranteRecetaService {
    constructor(repositorioRestaurante, repositorioReceta) {
        this.repositorioRestaurante = repositorioRestaurante;
        this.repositorioReceta = repositorioReceta;
    }
    async agregarRecetaRestaurante(restauranteId, recetaId) {
        const receta = await this.repositorioReceta.findOne({
            where: { id: recetaId },
        });
        if (!receta) {
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Receta dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        }
        const restaurante = await this.repositorioRestaurante.findOne({
            where: { id: restauranteId },
            relations: ['recetas'],
        });
        if (!restaurante) {
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Restaurante dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        }
        restaurante.recetas = [...restaurante.recetas, receta];
        return await this.repositorioRestaurante.save(restaurante);
    }
    async obtenerRecetaRestaurante(restauranteId, recetaId) {
        return ((await this.__obtenerRecetaRestaurante(restauranteId, recetaId))[1]);
    }
    async obtenerTodasRecetasDeRestaurante(restauranteId) {
        const restaurante = await this.repositorioRestaurante.findOne({
            where: { id: restauranteId },
            relations: ['recetas'],
        });
        if (!restaurante)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Restaurante dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        return restaurante.recetas;
    }
    async asociarRecetasRestaurante(restauranteId, recetas) {
        const restaurante = await this.repositorioRestaurante.findOne({
            where: { id: restauranteId },
            relations: ['recetas'],
        });
        if (!restaurante)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Restaurante dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        for (let i = 0; i < recetas.length; i++) {
            const receta = await this.repositorioReceta.findOne({
                where: { id: recetas[i].id },
            });
            if (!receta)
                throw new errores_negocio_1.ExcepcionLogicaNegocio('Receta dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        }
        restaurante.recetas = recetas;
        return await this.repositorioRestaurante.save(restaurante);
    }
    async eliminarRecetaRestaurante(restauranteId, recetaId) {
        const restaurante = ((await this.__obtenerRecetaRestaurante(restauranteId, recetaId))[0]);
        restaurante.recetas = restaurante.recetas.filter((e) => e.id !== recetaId);
        await this.repositorioRestaurante.save(restaurante);
    }
    async __obtenerRecetaRestaurante(restauranteId, recetaId) {
        let receta = await this.repositorioReceta.findOne({
            where: { id: recetaId },
        });
        if (!receta)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Receta dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const restaurante = await this.repositorioRestaurante.findOne({
            where: { id: restauranteId },
            relations: ['recetas'],
        });
        if (!restaurante)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Restaurante dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        receta = restaurante.recetas.find((e) => e.id === receta.id);
        if (!receta)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Receta dada no se encuentra asociada a Restaurante dado.', errores_negocio_1.ErrorNegocio.PRECONDICION_FALLIDA);
        return [restaurante, receta];
    }
};
RestauranteRecetaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurante_entity_1.RestauranteEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(receta_entity_1.RecetaEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RestauranteRecetaService);
exports.RestauranteRecetaService = RestauranteRecetaService;
//# sourceMappingURL=restaurante-receta.service.js.map