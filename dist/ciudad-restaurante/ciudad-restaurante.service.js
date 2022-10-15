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
exports.CiudadRestauranteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const errores_negocio_1 = require("../compartido/errores-negocio");
const ciudad_entity_1 = require("../ciudad/ciudad.entity");
const restaurante_entity_1 = require("../restaurante/restaurante.entity");
const typeorm_2 = require("typeorm");
let CiudadRestauranteService = class CiudadRestauranteService {
    constructor(repositorioCiudad, repositorioRestaurante, cacheManager) {
        this.repositorioCiudad = repositorioCiudad;
        this.repositorioRestaurante = repositorioRestaurante;
        this.cacheManager = cacheManager;
        this.cacheKey = "cacheCiudadRestaurante";
    }
    async agregarRestauranteCiudad(ciudadId, restauranteId) {
        const restaurante = await this.repositorioRestaurante.findOne({
            where: { id: restauranteId },
        });
        if (!restaurante)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Restaurante dado no fue encontrado.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const ciudad = await this.repositorioCiudad.findOne({
            where: { id: ciudadId },
            relations: ['restaurantes'],
        });
        if (!ciudad)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Ciudad dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        ciudad.restaurantes = [...ciudad.restaurantes, restaurante];
        return await this.repositorioCiudad.save(ciudad);
    }
    async obtenerRestauranteCiudad(ciudadId, restauranteId) {
        return ((await this.__obtenerRestauranteCiudad(ciudadId, restauranteId))[1]);
    }
    async obtenerTodosRestaurantesDeCiudad(ciudadId) {
        const cached = await this.cacheManager.get(this.cacheKey);
        if (!cached) {
            const ciudad = await this.repositorioCiudad.findOne({ where: { id: ciudadId },
                relations: ['restaurantes'], });
            if (!ciudad)
                throw new errores_negocio_1.ExcepcionLogicaNegocio('Ciudad dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
            await this.cacheManager.set(this.cacheKey, ciudad);
            return ciudad.restaurantes;
        }
        return cached;
    }
    async asociarRestaurantesCiudad(ciudadId, restaurante) {
        const ciudad = await this.repositorioCiudad.findOne({
            where: { id: ciudadId },
            relations: ['restaurantes'],
        });
        if (!ciudad)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Ciudad dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        ciudad.restaurantes = restaurante;
        return await this.repositorioCiudad.save(ciudad);
    }
    async eliminarRestauranteCiudad(ciudadId, restauranteId) {
        const ciudad = ((await this.__obtenerRestauranteCiudad(ciudadId, restauranteId))[0]);
        ciudad.restaurantes = ciudad.restaurantes.filter((e) => e.id !== restauranteId);
        await this.repositorioCiudad.save(ciudad);
    }
    async __obtenerRestauranteCiudad(ciudadId, restauranteId) {
        const restaurante = await this.repositorioRestaurante.findOne({
            where: { id: restauranteId },
        });
        if (!restaurante)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Restaurante dado no fue encontrado.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const ciudad = await this.repositorioCiudad.findOne({
            where: { id: ciudadId },
            relations: ['restaurantes'],
        });
        if (!ciudad)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Ciudad dada no fue encontrada.', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const ciudadRestaurante = ciudad.restaurantes.find((e) => e.id === restaurante.id);
        if (!ciudadRestaurante)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('Restaurante dado no se encuentra asociado a Ciudad dada.', errores_negocio_1.ErrorNegocio.PRECONDICION_FALLIDA);
        return [ciudad, ciudadRestaurante];
    }
};
CiudadRestauranteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ciudad_entity_1.CiudadEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(restaurante_entity_1.RestauranteEntity)),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object])
], CiudadRestauranteService);
exports.CiudadRestauranteService = CiudadRestauranteService;
//# sourceMappingURL=ciudad-restaurante.service.js.map