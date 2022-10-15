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
exports.RestauranteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const restaurante_entity_1 = require("./restaurante.entity");
const errores_negocio_1 = require("../compartido/errores-negocio");
let RestauranteService = class RestauranteService {
    constructor(restauranteRepository) {
        this.restauranteRepository = restauranteRepository;
    }
    async findAll() {
        return await this.restauranteRepository.find({
            relations: ['estrellasMichelin'],
        });
    }
    async findOne(id) {
        const restaurante = await this.restauranteRepository.findOne({
            where: { id },
            relations: ['estrellasMichelin'],
        });
        if (!restaurante)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('El restaurante con el id dado no fue encontrado', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        return restaurante;
    }
    async create(restaurante) {
        return await this.restauranteRepository.save(restaurante);
    }
    async update(id, restaurante) {
        const persistedRestaurante = await this.restauranteRepository.findOne({ where: { id } });
        if (!persistedRestaurante)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('El restaurante con el id dado no fue encontrado', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        return await this.restauranteRepository.save(Object.assign(Object.assign({}, persistedRestaurante), restaurante));
    }
    async delete(id) {
        const restaurante = await this.restauranteRepository.findOne({ where: { id } });
        if (!restaurante)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('El restaurante con el id dado no fue encontrado', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        await this.restauranteRepository.remove(restaurante);
    }
};
RestauranteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurante_entity_1.RestauranteEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RestauranteService);
exports.RestauranteService = RestauranteService;
//# sourceMappingURL=restaurante.service.js.map