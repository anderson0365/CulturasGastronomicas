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
exports.PaisEntity = void 0;
const cultura_gastronomica_entity_1 = require("../cultura-gastronomica/cultura-gastronomica.entity");
const typeorm_1 = require("typeorm");
const ciudad_entity_1 = require("../ciudad/ciudad.entity");
const graphql_1 = require("@nestjs/graphql");
let PaisEntity = class PaisEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PaisEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PaisEntity.prototype, "nombre", void 0);
__decorate([
    (0, graphql_1.Field)(type => [ciudad_entity_1.CiudadEntity]),
    (0, typeorm_1.OneToMany)(() => ciudad_entity_1.CiudadEntity, (ciudad) => ciudad.pais),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], PaisEntity.prototype, "ciudades", void 0);
__decorate([
    (0, graphql_1.Field)(type => [cultura_gastronomica_entity_1.CulturaGastronomicaEntity]),
    (0, typeorm_1.ManyToMany)(() => cultura_gastronomica_entity_1.CulturaGastronomicaEntity, (cultura) => cultura.paises),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], PaisEntity.prototype, "culturasGastronomicas", void 0);
PaisEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], PaisEntity);
exports.PaisEntity = PaisEntity;
//# sourceMappingURL=pais.entity.js.map