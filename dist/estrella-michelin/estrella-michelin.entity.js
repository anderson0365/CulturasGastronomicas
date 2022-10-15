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
exports.EstrellaMichelinEntity = void 0;
const restaurante_entity_1 = require("../restaurante/restaurante.entity");
const typeorm_1 = require("typeorm");
let EstrellaMichelinEntity = class EstrellaMichelinEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EstrellaMichelinEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EstrellaMichelinEntity.prototype, "fechaDeObtencion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => restaurante_entity_1.RestauranteEntity, restaurante => restaurante.estrellasMichelin),
    __metadata("design:type", restaurante_entity_1.RestauranteEntity)
], EstrellaMichelinEntity.prototype, "restaurante", void 0);
EstrellaMichelinEntity = __decorate([
    (0, typeorm_1.Entity)()
], EstrellaMichelinEntity);
exports.EstrellaMichelinEntity = EstrellaMichelinEntity;
//# sourceMappingURL=estrella-michelin.entity.js.map