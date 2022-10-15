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
exports.CiudadService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const errores_negocio_1 = require("../compartido/errores-negocio");
const ciudad_entity_1 = require("./ciudad.entity");
let CiudadService = class CiudadService {
    constructor(ciudadRepository, cacheManager) {
        this.ciudadRepository = ciudadRepository;
        this.cacheManager = cacheManager;
        this.cacheKey = "cacheCiudades";
    }
    async create(ciudad) {
        return await this.ciudadRepository.save(ciudad);
    }
    async findAll() {
        const cached = await this.cacheManager.get(this.cacheKey);
        if (!cached) {
            const ciudades = await this.ciudadRepository.find();
            await this.cacheManager.set(this.cacheKey, ciudades);
            return ciudades;
        }
        return cached;
    }
    async findOne(id) {
        const ciudad = await this.ciudadRepository.findOne({ where: { id } });
        if (!ciudad)
            throw new errores_negocio_1.ExcepcionLogicaNegocio("La ciudad con el solicitado id no existe", errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        return ciudad;
    }
    async update(id, ciudad) {
        const persistedCiudad = await this.ciudadRepository.findOne({ where: { id } });
        if (!persistedCiudad)
            throw new errores_negocio_1.ExcepcionLogicaNegocio("La ciudad con el id solicitado no existe", errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        return await this.ciudadRepository.save(Object.assign(Object.assign({}, persistedCiudad), ciudad));
    }
    async delete(id) {
        const ciudad = await this.ciudadRepository.findOne({ where: { id } });
        if (!ciudad)
            throw new errores_negocio_1.ExcepcionLogicaNegocio("La ciudad con el id solicitado no existe", errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        await this.ciudadRepository.remove(ciudad);
    }
};
CiudadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ciudad_entity_1.CiudadEntity)),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], CiudadService);
exports.CiudadService = CiudadService;
//# sourceMappingURL=ciudad.service.js.map