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
exports.RecetaResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const receta_dto_1 = require("./receta.dto");
const receta_entity_1 = require("./receta.entity");
const receta_service_1 = require("./receta.service");
let RecetaResolver = class RecetaResolver {
    constructor(recetaService) {
        this.recetaService = recetaService;
    }
    recetas() {
        return this.recetaService.findAll();
    }
    receta(id) {
        return this.recetaService.findOne(id);
    }
    createReceta(recetaDto) {
        const receta = (0, class_transformer_1.plainToInstance)(receta_entity_1.RecetaEntity, recetaDto);
        return this.recetaService.create(receta);
    }
    updateReceta(id, recetaDto) {
        const receta = (0, class_transformer_1.plainToInstance)(receta_entity_1.RecetaEntity, recetaDto);
        return this.recetaService.update(id, receta);
    }
    deleteReeta(id) {
        this.recetaService.delete(id);
        return id;
    }
};
__decorate([
    (0, graphql_1.Query)(() => [receta_entity_1.RecetaEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecetaResolver.prototype, "recetas", null);
__decorate([
    (0, graphql_1.Query)(() => receta_entity_1.RecetaEntity),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecetaResolver.prototype, "receta", null);
__decorate([
    (0, graphql_1.Mutation)(() => receta_entity_1.RecetaEntity),
    __param(0, (0, graphql_1.Args)('receta')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [receta_dto_1.RecetaDto]),
    __metadata("design:returntype", Promise)
], RecetaResolver.prototype, "createReceta", null);
__decorate([
    (0, graphql_1.Mutation)(() => receta_entity_1.RecetaEntity),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('receta')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, receta_dto_1.RecetaDto]),
    __metadata("design:returntype", Promise)
], RecetaResolver.prototype, "updateReceta", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecetaResolver.prototype, "deleteReeta", null);
RecetaResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [receta_service_1.RecetaService])
], RecetaResolver);
exports.RecetaResolver = RecetaResolver;
//# sourceMappingURL=receta.resolver.js.map