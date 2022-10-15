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
exports.CulturaGastronomicaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const errores_negocio_1 = require("../compartido/errores-negocio");
const typeorm_2 = require("typeorm");
const cultura_gastronomica_entity_1 = require("./cultura-gastronomica.entity");
let CulturaGastronomicaService = class CulturaGastronomicaService {
    constructor(repositorioCultura) {
        this.repositorioCultura = repositorioCultura;
    }
    async obtenerTodos() {
        return await this.repositorioCultura.find({
            relations: ['recetas', 'paises', 'productos'],
        });
    }
    async obtenerUno(id) {
        const cultura = await this.repositorioCultura.findOne({
            where: { id },
            relations: ['recetas', 'paises', 'productos'],
        });
        if (!cultura)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('CulturaGastronomica dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        return cultura;
    }
    async crear(cultura) {
        return await this.repositorioCultura.save(cultura);
    }
    async actualizar(id, cultura) {
        const culturaPersistent = await this.repositorioCultura.findOne({ where: { id } });
        if (!culturaPersistent)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('CulturaGastronomica dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        return await this.repositorioCultura.save(Object.assign(Object.assign({}, culturaPersistent), cultura));
    }
    async eliminar(id) {
        const cultura = await this.repositorioCultura.findOne({ where: { id } });
        if (!cultura)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('CulturaGastronomica dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        await this.repositorioCultura.remove(cultura);
    }
};
CulturaGastronomicaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cultura_gastronomica_entity_1.CulturaGastronomicaEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CulturaGastronomicaService);
exports.CulturaGastronomicaService = CulturaGastronomicaService;
//# sourceMappingURL=cultura-gastronomica.service.js.map