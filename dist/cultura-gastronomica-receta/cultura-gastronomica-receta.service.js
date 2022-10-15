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
exports.CulturaGastronomicaRecetaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const errores_negocio_1 = require("../compartido/errores-negocio");
const cultura_gastronomica_entity_1 = require("../cultura-gastronomica/cultura-gastronomica.entity");
const receta_entity_1 = require("../receta/receta.entity");
const typeorm_2 = require("typeorm");
let CulturaGastronomicaRecetaService = class CulturaGastronomicaRecetaService {
    constructor(repositorioCulturaGastronomica, repositorioReceta) {
        this.repositorioCulturaGastronomica = repositorioCulturaGastronomica;
        this.repositorioReceta = repositorioReceta;
    }
    async agregarRecetaCulturaGastronomica(culturaId, recetaId) {
        const receta = await this.repositorioReceta.findOne({
            where: { id: recetaId },
        });
        if (!receta)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Receta dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const cultura = await this.repositorioCulturaGastronomica.findOne({
            where: { id: culturaId },
            relations: ['recetas'],
        });
        if (!cultura)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('CulturaGastronomica dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        cultura.recetas = [...cultura.recetas, receta];
        return await this.repositorioCulturaGastronomica.save(cultura);
    }
    async obtenerRecetaCulturaGastronomica(culturaId, recetaId) {
        return (await this.__obtenerRecetaCulturaGastronomica(culturaId, recetaId))[1];
    }
    async obtenerTodasRecetasDeCulturaGastronomica(culturaId) {
        const cultura = await this.repositorioCulturaGastronomica.findOne({
            where: { id: culturaId },
            relations: ['recetas'],
        });
        if (!cultura)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('CulturaGastronomica dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        return cultura.recetas;
    }
    async asociarRecetasCulturaGastronomica(culturaId, recetas) {
        const cultura = await this.repositorioCulturaGastronomica.findOne({
            where: { id: culturaId },
            relations: ['recetas'],
        });
        if (!cultura)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('CulturaGastronomica dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        for (let i = 0; i < recetas.length; i++) {
            const receta = await this.repositorioReceta.findOne({
                where: { id: recetas[i].id },
            });
            if (!receta)
                throw new errores_negocio_1.ExcepcionLogicaNegocio('Receta dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        }
        cultura.recetas = recetas;
        return await this.repositorioCulturaGastronomica.save(cultura);
    }
    async eliminarRecetaCulturaGastronomica(culturaId, recetaId) {
        const cultura = (await this.__obtenerRecetaCulturaGastronomica(culturaId, recetaId))[0];
        cultura.recetas = cultura.recetas.filter((e) => e.id !== recetaId);
        await this.repositorioCulturaGastronomica.save(cultura);
    }
    async __obtenerRecetaCulturaGastronomica(culturaId, recetaId) {
        const receta = await this.repositorioReceta.findOne({
            where: { id: recetaId },
        });
        if (!receta)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Receta dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const cultura = await this.repositorioCulturaGastronomica.findOne({
            where: { id: culturaId },
            relations: ['recetas'],
        });
        if (!cultura)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('CulturaGastronomica dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const culturaReceta = cultura.recetas.find((e) => e.id === receta.id);
        if (!culturaReceta)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Receta dada no se encuentra asociada a CulturaGastronomica dada.', errores_negocio_1.ErrorNegocio.PRECONDICION_FALLIDA);
        return [cultura, culturaReceta];
    }
};
CulturaGastronomicaRecetaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cultura_gastronomica_entity_1.CulturaGastronomicaEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(receta_entity_1.RecetaEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CulturaGastronomicaRecetaService);
exports.CulturaGastronomicaRecetaService = CulturaGastronomicaRecetaService;
//# sourceMappingURL=cultura-gastronomica-receta.service.js.map