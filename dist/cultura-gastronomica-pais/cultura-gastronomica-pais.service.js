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
exports.CulturaGastronomicaPaisService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const errores_negocio_1 = require("../compartido/errores-negocio");
const cultura_gastronomica_entity_1 = require("../cultura-gastronomica/cultura-gastronomica.entity");
const pais_entity_1 = require("../pais/pais.entity");
const typeorm_2 = require("typeorm");
let CulturaGastronomicaPaisService = class CulturaGastronomicaPaisService {
    constructor(repositorioCulturaGastronomica, repositorioPais) {
        this.repositorioCulturaGastronomica = repositorioCulturaGastronomica;
        this.repositorioPais = repositorioPais;
    }
    async agregarPaisCulturaGastronomica(culturaId, paisId) {
        const pais = await this.repositorioPais.findOne({
            where: { id: paisId },
        });
        if (!pais)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Pais dado no fue encontrado.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const cultura = await this.repositorioCulturaGastronomica.findOne({
            where: { id: culturaId },
            relations: ['paises'],
        });
        if (!cultura)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('CulturaGastronomica dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        cultura.paises = [...cultura.paises, pais];
        return await this.repositorioCulturaGastronomica.save(cultura);
    }
    async obtenerPaisCulturaGastronomica(culturaId, paisId) {
        return ((await this.__obtenerPaisCulturaGastronomica(culturaId, paisId))[1]);
    }
    async obtenerTodosPaisesDeCulturaGastronomica(culturaId) {
        const cultura = await this.repositorioCulturaGastronomica.findOne({
            where: { id: culturaId },
            relations: ['paises'],
        });
        if (!cultura)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('CulturaGastronomica dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        return cultura.paises;
    }
    async asociarPaisesCulturaGastronomica(culturaId, paises) {
        const cultura = await this.repositorioCulturaGastronomica.findOne({
            where: { id: culturaId },
            relations: ['paises'],
        });
        if (!cultura)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('CulturaGastronomica dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        for (let i = 0; i < paises.length; i++) {
            const pais = await this.repositorioPais.findOne({
                where: { id: paises[i].id },
            });
            if (!pais)
                throw new errores_negocio_1.ExcepcionLogicaNegocio('Pais dado no fue encontrado.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        }
        cultura.paises = paises;
        return await this.repositorioCulturaGastronomica.save(cultura);
    }
    async eliminarPaisCulturaGastronomica(culturaId, paisId) {
        const cultura = ((await this.__obtenerPaisCulturaGastronomica(culturaId, paisId))[0]);
        cultura.paises = cultura.paises.filter((e) => e.id !== paisId);
        await this.repositorioCulturaGastronomica.save(cultura);
    }
    async __obtenerPaisCulturaGastronomica(culturaId, paisId) {
        const pais = await this.repositorioPais.findOne({
            where: { id: paisId },
        });
        if (!pais)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Pais dado no fue encontrado.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const cultura = await this.repositorioCulturaGastronomica.findOne({
            where: { id: culturaId },
            relations: ['paises'],
        });
        if (!cultura)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('CulturaGastronomica dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const culturaPais = cultura.paises.find((e) => e.id === pais.id);
        if (!culturaPais)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Pais dado no se encuentra asociado a CulturaGastronomica dada.', errores_negocio_1.ErrorNegocio.PRECONDICION_FALLIDA);
        return [cultura, culturaPais];
    }
};
CulturaGastronomicaPaisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cultura_gastronomica_entity_1.CulturaGastronomicaEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(pais_entity_1.PaisEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CulturaGastronomicaPaisService);
exports.CulturaGastronomicaPaisService = CulturaGastronomicaPaisService;
//# sourceMappingURL=cultura-gastronomica-pais.service.js.map