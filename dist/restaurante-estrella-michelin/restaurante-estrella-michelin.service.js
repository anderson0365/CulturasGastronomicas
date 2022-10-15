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
exports.RestauranteEstrellaMichelinService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const restaurante_entity_1 = require("../restaurante/restaurante.entity");
const estrella_michelin_entity_1 = require("../estrella-michelin/estrella-michelin.entity");
const errores_negocio_1 = require("../compartido/errores-negocio");
let RestauranteEstrellaMichelinService = class RestauranteEstrellaMichelinService {
    constructor(restauranteRepository, estrellaMichelinRepository) {
        this.restauranteRepository = restauranteRepository;
        this.estrellaMichelinRepository = estrellaMichelinRepository;
    }
    async addEstrellaMichelinRestaurante(restauranteId, estrellaMichelinId) {
        const estrellaMichelin = await this.estrellaMichelinRepository.findOne({ where: { id: estrellaMichelinId } });
        if (!estrellaMichelin)
            throw new errores_negocio_1.ExcepcionLogicaNegocio("La estrella michelin con el id dado no fue encontrada", errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const restaurante = await this.restauranteRepository.findOne({ where: { id: restauranteId }, relations: ["estrellasMichelin", "ciudad", "recetas"] });
        if (!restaurante)
            throw new errores_negocio_1.ExcepcionLogicaNegocio("El restaurante con el id dado no fue encontrado", errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        restaurante.estrellasMichelin = [...restaurante.estrellasMichelin, estrellaMichelin];
        return await this.restauranteRepository.save(restaurante);
    }
    async findEstrellaMichelinByRestauranteIdEstrellaMichelinId(restauranteId, estrellaMichelinId) {
        const estrellaMichelin = await this.estrellaMichelinRepository.findOne({ where: { id: estrellaMichelinId } });
        if (!estrellaMichelin)
            throw new errores_negocio_1.ExcepcionLogicaNegocio("La estrella michelin con el id dado no fue encontrada", errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const restaurante = await this.restauranteRepository.findOne({ where: { id: restauranteId }, relations: ["estrellasMichelin", "ciudad", "recetas"] });
        if (!restaurante)
            throw new errores_negocio_1.ExcepcionLogicaNegocio("El restaurante con el id dado no fue encontrado", errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const restauranteEstrellaMichelin = restaurante.estrellasMichelin.find(e => e.id === estrellaMichelin.id);
        if (!restauranteEstrellaMichelin)
            throw new errores_negocio_1.ExcepcionLogicaNegocio("La estrella michelin con el id dado no está asociada al restaurante", errores_negocio_1.ErrorNegocio.PRECONDICION_FALLIDA);
        return restauranteEstrellaMichelin;
    }
    async findEstrellaMichelinsByRestauranteId(restauranteId) {
        const restaurante = await this.restauranteRepository.findOne({ where: { id: restauranteId }, relations: ["estrellasMichelin", "ciudad", "recetas"] });
        if (!restaurante)
            throw new errores_negocio_1.ExcepcionLogicaNegocio("El restaurante con el id dado no fue encontrado", errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        return restaurante.estrellasMichelin;
    }
    async associateEstrellaMichelinsRestaurante(restauranteId, estrellasMichelin) {
        const restaurante = await this.restauranteRepository.findOne({ where: { id: restauranteId }, relations: ["estrellasMichelin", "ciudad", "recetas"] });
        if (!restaurante)
            throw new errores_negocio_1.ExcepcionLogicaNegocio("El restaurante con el id dado no fue encontrado", errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        for (let i = 0; i < estrellasMichelin.length; i++) {
            const estrellaMichelin = await this.estrellaMichelinRepository.findOne({ where: { id: estrellasMichelin[i].id } });
            if (!estrellaMichelin)
                throw new errores_negocio_1.ExcepcionLogicaNegocio("La estrella michelin con el id dado no fue encontrada", errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        }
        restaurante.estrellasMichelin = estrellasMichelin;
        return await this.restauranteRepository.save(restaurante);
    }
    async deleteEstrellaMichelinRestaurante(restauranteId, estrellaMichelinId) {
        const estrellaMichelin = await this.estrellaMichelinRepository.findOne({ where: { id: estrellaMichelinId } });
        if (!estrellaMichelin)
            throw new errores_negocio_1.ExcepcionLogicaNegocio("La estrella michelin con el id dado no fue encontrada", errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const restaurante = await this.restauranteRepository.findOne({ where: { id: restauranteId }, relations: ["estrellasMichelin", "ciudad", "recetas"] });
        if (!restaurante)
            throw new errores_negocio_1.ExcepcionLogicaNegocio("El restaurante con el id dado no fue encontrado", errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        const restauranteEstrellaMichelin = restaurante.estrellasMichelin.find(e => e.id === estrellaMichelin.id);
        if (!restauranteEstrellaMichelin)
            throw new errores_negocio_1.ExcepcionLogicaNegocio("La estrella michelin con el id dado no está asociada al restaurante", errores_negocio_1.ErrorNegocio.PRECONDICION_FALLIDA);
        restaurante.estrellasMichelin = restaurante.estrellasMichelin.filter(e => e.id !== estrellaMichelinId);
        await this.restauranteRepository.save(restaurante);
    }
};
RestauranteEstrellaMichelinService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurante_entity_1.RestauranteEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(estrella_michelin_entity_1.EstrellaMichelinEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RestauranteEstrellaMichelinService);
exports.RestauranteEstrellaMichelinService = RestauranteEstrellaMichelinService;
//# sourceMappingURL=restaurante-estrella-michelin.service.js.map