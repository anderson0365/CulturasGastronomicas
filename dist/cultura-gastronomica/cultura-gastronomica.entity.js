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
exports.CulturaGastronomicaEntity = void 0;
const pais_entity_1 = require("../pais/pais.entity");
const producto_entity_1 = require("../producto/producto.entity");
const typeorm_1 = require("typeorm");
const receta_entity_1 = require("../receta/receta.entity");
const graphql_1 = require("@nestjs/graphql");
let CulturaGastronomicaEntity = class CulturaGastronomicaEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CulturaGastronomicaEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CulturaGastronomicaEntity.prototype, "nombre", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CulturaGastronomicaEntity.prototype, "descripcion", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CulturaGastronomicaEntity.prototype, "img", void 0);
__decorate([
    (0, graphql_1.Field)(type => [receta_entity_1.RecetaEntity]),
    (0, typeorm_1.OneToMany)(() => receta_entity_1.RecetaEntity, (receta) => receta.culturaGastronomica),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], CulturaGastronomicaEntity.prototype, "recetas", void 0);
__decorate([
    (0, graphql_1.Field)(type => [pais_entity_1.PaisEntity]),
    (0, typeorm_1.ManyToMany)(() => pais_entity_1.PaisEntity, (pais) => pais.culturasGastronomicas),
    __metadata("design:type", Array)
], CulturaGastronomicaEntity.prototype, "paises", void 0);
__decorate([
    (0, graphql_1.Field)(type => [producto_entity_1.ProductoEntity]),
    (0, typeorm_1.ManyToMany)(() => producto_entity_1.ProductoEntity, (producto) => producto.culturasGastronomicas),
    __metadata("design:type", Array)
], CulturaGastronomicaEntity.prototype, "productos", void 0);
CulturaGastronomicaEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], CulturaGastronomicaEntity);
exports.CulturaGastronomicaEntity = CulturaGastronomicaEntity;
//# sourceMappingURL=cultura-gastronomica.entity.js.map