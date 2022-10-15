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
exports.PaisService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const errores_negocio_1 = require("../compartido/errores-negocio");
const typeorm_2 = require("typeorm");
const pais_entity_1 = require("./pais.entity");
let PaisService = class PaisService {
    constructor(paisRepository, cacheManager) {
        this.paisRepository = paisRepository;
        this.cacheManager = cacheManager;
        this.cacheKey = "cachePaises";
    }
    async obtenerTodos() {
        const cached = await this.cacheManager.get(this.cacheKey);
        if (!cached) {
            const paises = await this.paisRepository.find({});
            await this.cacheManager.set(this.cacheKey, paises);
            return paises;
        }
        return cached;
    }
    async obtenerUno(id) {
        const pais = await this.paisRepository.findOne({ where: { id }, });
        if (!pais)
            throw new errores_negocio_1.ExcepcionLogicaNegocio("El pais no fue encontrado", errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        return pais;
    }
    async crear(pais) {
        return await this.paisRepository.save(pais);
    }
    async actualizar(id, pais) {
        const paisPersistido = await this.paisRepository.findOne({ where: { id } });
        if (!paisPersistido)
            throw new errores_negocio_1.ExcepcionLogicaNegocio("El pais no fue encontrado", errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        return await this.paisRepository.save(Object.assign(Object.assign({}, paisPersistido), pais));
    }
    async borrar(id) {
        const pais = await this.paisRepository.findOne({ where: { id } });
        if (!pais)
            throw new errores_negocio_1.ExcepcionLogicaNegocio("El pais no fue encontrado", errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        await this.paisRepository.remove(pais);
    }
};
PaisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pais_entity_1.PaisEntity)),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], PaisService);
exports.PaisService = PaisService;
//# sourceMappingURL=pais.service.js.map