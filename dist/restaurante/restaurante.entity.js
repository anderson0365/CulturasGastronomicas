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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestauranteEntity = void 0;
const ciudad_entity_1 = require("../ciudad/ciudad.entity");
const estrella_michelin_entity_1 = require("../estrella-michelin/estrella-michelin.entity");
const typeorm_1 = require("typeorm");
const receta_entity_1 = require("../receta/receta.entity");
let RestauranteEntity = class RestauranteEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RestauranteEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RestauranteEntity.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RestauranteEntity.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => estrella_michelin_entity_1.EstrellaMichelinEntity, (estrellaMichelin) => estrellaMichelin.restaurante),
    __metadata("design:type", Array)
], RestauranteEntity.prototype, "estrellasMichelin", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ciudad_entity_1.CiudadEntity, (ciudad) => ciudad.restaurantes),
    __metadata("design:type", ciudad_entity_1.CiudadEntity)
], RestauranteEntity.prototype, "ciudad", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => receta_entity_1.RecetaEntity, (receta) => receta.restaurantes),
    __metadata("design:type", Array)
], RestauranteEntity.prototype, "recetas", void 0);
RestauranteEntity = __decorate([
    (0, typeorm_1.Entity)()
], RestauranteEntity);
exports.RestauranteEntity = RestauranteEntity;
//# sourceMappingURL=restaurante.entity.js.map