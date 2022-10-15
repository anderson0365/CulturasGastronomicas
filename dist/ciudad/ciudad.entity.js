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
exports.CiudadEntity = void 0;
const pais_entity_1 = require("../pais/pais.entity");
const typeorm_1 = require("typeorm");
const restaurante_entity_1 = require("../restaurante/restaurante.entity");
const graphql_1 = require("@nestjs/graphql");
let CiudadEntity = class CiudadEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CiudadEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CiudadEntity.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pais_entity_1.PaisEntity, (pais) => pais.ciudades),
    __metadata("design:type", pais_entity_1.PaisEntity)
], CiudadEntity.prototype, "pais", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => restaurante_entity_1.RestauranteEntity, (restaurante) => restaurante.ciudad),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], CiudadEntity.prototype, "restaurantes", void 0);
CiudadEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], CiudadEntity);
exports.CiudadEntity = CiudadEntity;
//# sourceMappingURL=ciudad.entity.js.map