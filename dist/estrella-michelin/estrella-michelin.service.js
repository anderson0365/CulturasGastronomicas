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
exports.EstrellaMichelinService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const errores_negocio_1 = require("../compartido/errores-negocio");
const typeorm_2 = require("typeorm");
const estrella_michelin_entity_1 = require("./estrella-michelin.entity");
let EstrellaMichelinService = class EstrellaMichelinService {
    constructor(estrellaMichelinRepository) {
        this.estrellaMichelinRepository = estrellaMichelinRepository;
    }
    async findAll() {
        return await this.estrellaMichelinRepository.find({
            relations: ['restaurante'],
        });
    }
    async findOne(id) {
        const estrellaMichelin = await this.estrellaMichelinRepository.findOne({
            where: { id },
            relations: ['restaurante'],
        });
        if (!estrellaMichelin)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('La estrella michelin con el id dado no fue encontrada', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        return estrellaMichelin;
    }
    async create(estrellaMichelin) {
        return await this.estrellaMichelinRepository.save(estrellaMichelin);
    }
    async update(id, estrellaMichelin) {
        const persistedEstrellaMichelin = await this.estrellaMichelinRepository.findOne({ where: { id } });
        if (!persistedEstrellaMichelin)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('La estrella michelin con el id dado no fue encontrada', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        return await this.estrellaMichelinRepository.save(Object.assign(Object.assign({}, persistedEstrellaMichelin), estrellaMichelin));
    }
    async delete(id) {
        const estrellaMichelin = await this.estrellaMichelinRepository.findOne({ where: { id } });
        if (!estrellaMichelin)
            throw new errores_negocio_1.ExcepcionLogicaNegocio('La estrella michelin con el id dado no fue encontrada', errores_negocio_1.ErrorNegocio.NO_ENCONTRADO);
        await this.estrellaMichelinRepository.remove(estrellaMichelin);
    }
};
EstrellaMichelinService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(estrella_michelin_entity_1.EstrellaMichelinEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EstrellaMichelinService);
exports.EstrellaMichelinService = EstrellaMichelinService;
//# sourceMappingURL=estrella-michelin.service.js.map