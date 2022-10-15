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
exports.PaisCulturaGastronomicaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const errores_negocio_1 = require("../compartido/errores-negocio");
const cultura_gastronomica_entity_1 = require("../cultura-gastronomica/cultura-gastronomica.entity");
const pais_entity_1 = require("../pais/pais.entity");
const typeorm_2 = require("typeorm");
let PaisCulturaGastronomicaService = class PaisCulturaGastronomicaService {
    constructor(repositorioPais, respositorioCulturaGastronomica, cacheManager) {
        this.repositorioPais = repositorioPais;
        this.respositorioCulturaGastronomica = respositorioCulturaGastronomica;
        this.cacheManager = cacheManager;
        this.cacheKey = "cachePaises";
    }
    async agregarCulturaGastronomicaPais(paisId, culturaId) {
        const cultura = await this.respositorioCulturaGastronomica.findOne({
            where: { id: culturaId },
        });
        if (!cultura)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('CulturaGastronomica dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const pais = await this.repositorioPais.findOne({
            where: { id: paisId },
            relations: ['culturasGastronomicas'],
        });
        if (!pais)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Pais dado no fue encontrado.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        pais.culturasGastronomicas = [...pais.culturasGastronomicas, cultura];
        return await this.repositorioPais.save(pais);
    }
    async obtenerCulturaGastronomicaPais(paisId, culturaId) {
        return ((await this.__obtenerCulturaGastronomicaPais(paisId, culturaId))[1]);
    }
    async obtenerTodasRecetasDeCulturaGastronomica(paisId) {
        const cached = await this.cacheManager.get(this.cacheKey);
        if (!cached) {
            const pais = await this.repositorioPais.findOne({ where: { id: paisId },
                relations: ['culturasGastronomicas'], });
            if (!pais)
                throw new errores_negocio_1.ExcepcionLogicaNegocio('Pais dado no fue encontrado.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
            await this.cacheManager.set(this.cacheKey, pais);
            return pais.culturasGastronomicas;
        }
        return cached;
    }
    async asociarCulturaGastronomicaPais(paisId, culturasGastronomicas) {
        const pais = await this.repositorioPais.findOne({
            where: { id: paisId },
            relations: ['culturasGastronomicas'],
        });
        if (!pais)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Pais dado no fue encontrado.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        for (let i = 0; i < culturasGastronomicas.length; i++) {
            const cultura = await this.respositorioCulturaGastronomica.findOne({
                where: { id: culturasGastronomicas[i].id },
            });
            if (!cultura)
                throw new errores_negocio_1.ExcepcionLogicaNegocio('CulturaGastronomica dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        }
        pais.culturasGastronomicas = culturasGastronomicas;
        return await this.repositorioPais.save(pais);
    }
    async eliminarCulturaGastronomicaPais(paisId, culturaId) {
        const pais = ((await this.__obtenerCulturaGastronomicaPais(paisId, culturaId))[0]);
        pais.culturasGastronomicas = pais.culturasGastronomicas.filter((e) => e.id !== culturaId);
        await this.repositorioPais.save(pais);
    }
    async __obtenerCulturaGastronomicaPais(paisId, culturaId) {
        const cultura = await this.respositorioCulturaGastronomica.findOne({
            where: { id: culturaId },
        });
        if (!cultura)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('CulturaGastronomica dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const pais = await this.repositorioPais.findOne({
            where: { id: paisId },
            relations: ['culturasGastronomicas'],
        });
        if (!pais)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Pais dado no fue encontrado.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const paisCultura = pais.culturasGastronomicas.find((e) => e.id === cultura.id);
        if (!paisCultura)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('CulturaGastronomica dada no se encuentra asociada a Pais dado.', errores_negocio_1.ErrorNegocio.PRECONDICION_FALLIDA);
        return [pais, paisCultura];
    }
};
PaisCulturaGastronomicaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pais_entity_1.PaisEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(cultura_gastronomica_entity_1.CulturaGastronomicaEntity)),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object])
], PaisCulturaGastronomicaService);
exports.PaisCulturaGastronomicaService = PaisCulturaGastronomicaService;
//# sourceMappingURL=pais-cultura-gastronomica.service.js.map