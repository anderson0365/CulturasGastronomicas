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
exports.CiudadResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const ciudad_dto_1 = require("./ciudad.dto");
const ciudad_entity_1 = require("./ciudad.entity");
const ciudad_service_1 = require("./ciudad.service");
let CiudadResolver = class CiudadResolver {
    constructor(ciudadService) {
        this.ciudadService = ciudadService;
    }
    ciudades() {
        return this.ciudadService.findAll();
    }
    ciudad(id) {
        return this.ciudadService.findOne(id);
    }
    createCiudad(ciudadDto) {
        const ciudad = (0, class_transformer_1.plainToInstance)(ciudad_entity_1.CiudadEntity, ciudadDto);
        return this.ciudadService.create(ciudad);
    }
    updateCiudad(id, ciudadDto) {
        const ciudad = (0, class_transformer_1.plainToInstance)(ciudad_entity_1.CiudadEntity, ciudadDto);
        return this.ciudadService.update(id, ciudad);
    }
    deleteCiudad(id) {
        this.ciudadService.delete(id);
        return id;
    }
};
__decorate([
    (0, graphql_1.Query)(() => [ciudad_entity_1.CiudadEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CiudadResolver.prototype, "ciudades", null);
__decorate([
    (0, graphql_1.Query)(() => ciudad_entity_1.CiudadEntity),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CiudadResolver.prototype, "ciudad", null);
__decorate([
    (0, graphql_1.Mutation)(() => ciudad_entity_1.CiudadEntity),
    __param(0, (0, graphql_1.Args)('ciudad')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ciudad_dto_1.CiudadDto]),
    __metadata("design:returntype", Promise)
], CiudadResolver.prototype, "createCiudad", null);
__decorate([
    (0, graphql_1.Mutation)(() => ciudad_entity_1.CiudadEntity),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('ciudad')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ciudad_dto_1.CiudadDto]),
    __metadata("design:returntype", Promise)
], CiudadResolver.prototype, "updateCiudad", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CiudadResolver.prototype, "deleteCiudad", null);
CiudadResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [ciudad_service_1.CiudadService])
], CiudadResolver);
exports.CiudadResolver = CiudadResolver;
//# sourceMappingURL=ciudad.resolver.js.map