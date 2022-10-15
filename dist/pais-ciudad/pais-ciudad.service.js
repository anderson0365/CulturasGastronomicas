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
exports.PaisCiudadService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ciudad_entity_1 = require("../ciudad/ciudad.entity");
const errores_negocio_1 = require("../compartido/errores-negocio");
const pais_entity_1 = require("../pais/pais.entity");
const typeorm_2 = require("typeorm");
let PaisCiudadService = class PaisCiudadService {
    constructor(repositorioPais, repositorioCiudad) {
        this.repositorioPais = repositorioPais;
        this.repositorioCiudad = repositorioCiudad;
    }
    async agregarCiudadPais(paisId, ciudadId) {
        const ciudad = await this.repositorioCiudad.findOne({
            where: { id: ciudadId },
        });
        if (!ciudad)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Ciudad dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const pais = await this.repositorioPais.findOne({
            where: { id: paisId },
            relations: ['ciudades'],
        });
        if (!pais)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Pais dado no fue encontrado.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        pais.ciudades = [...pais.ciudades, ciudad];
        return await this.repositorioPais.save(pais);
    }
    async obtenerCiudadPais(paisId, ciudadId) {
        return (await this.__obtenerCiudadPais(paisId, ciudadId))[1];
    }
    async obtenerTodasCiudadesPais(paisId) {
        const pais = await this.repositorioPais.findOne({
            where: { id: paisId },
            relations: ['ciudades'],
        });
        if (!pais)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Pais dado no fue encontrado.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        return pais.ciudades;
    }
    async asociarCiudadesPais(paisId, ciudades) {
        const pais = await this.repositorioPais.findOne({
            where: { id: paisId },
            relations: ['ciudades'],
        });
        if (!pais)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Pais dado no fue encontrado.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        for (let i = 0; i < ciudades.length; i++) {
            const ciudad = await this.repositorioCiudad.findOne({
                where: { id: ciudades[i].id },
            });
            if (!ciudad)
                throw new errores_negocio_1.ExcepcionLogicaNegocio('Ciudad dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        }
        pais.ciudades = ciudades;
        return await this.repositorioPais.save(pais);
    }
    async eliminarCiudadPais(paisId, ciudadId) {
        const pais = ((await this.__obtenerCiudadPais(paisId, ciudadId))[0]);
        pais.ciudades = pais.ciudades.filter((e) => e.id !== ciudadId);
        await this.repositorioPais.save(pais);
    }
    async __obtenerCiudadPais(paisId, ciudadId) {
        const ciudad = await this.repositorioCiudad.findOne({
            where: { id: ciudadId },
        });
        if (!ciudad)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Ciudad dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const pais = await this.repositorioPais.findOne({
            where: { id: paisId },
            relations: ['ciudades'],
        });
        if (!pais)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Pais dado no fue encontrado.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const paisCiudad = pais.ciudades.find((e) => e.id === ciudad.id);
        if (!paisCiudad)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Ciudad dada no se encuentra asociada a Pais dado.', errores_negocio_1.ErrorNegocio.PRECONDICION_FALLIDA);
        return [pais, paisCiudad];
    }
};
PaisCiudadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pais_entity_1.PaisEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(ciudad_entity_1.CiudadEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PaisCiudadService);
exports.PaisCiudadService = PaisCiudadService;
//# sourceMappingURL=pais-ciudad.service.js.map