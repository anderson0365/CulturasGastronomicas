"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfiguracionPruebas = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const receta_entity_1 = require("../../receta/receta.entity");
const ciudad_entity_1 = require("../../ciudad/ciudad.entity");
const cultura_gastronomica_entity_1 = require("../../cultura-gastronomica/cultura-gastronomica.entity");
const restaurante_entity_1 = require("../../restaurante/restaurante.entity");
const estrella_michelin_entity_1 = require("../../estrella-michelin/estrella-michelin.entity");
const pais_entity_1 = require("../../pais/pais.entity");
const producto_entity_1 = require("../../producto/producto.entity");
const sqliteStore = require("cache-manager-sqlite");
const TypeOrmConfiguracionPruebas = () => [
    typeorm_1.TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [cultura_gastronomica_entity_1.CulturaGastronomicaEntity, receta_entity_1.RecetaEntity, ciudad_entity_1.CiudadEntity, restaurante_entity_1.RestauranteEntity, estrella_michelin_entity_1.EstrellaMichelinEntity, pais_entity_1.PaisEntity, producto_entity_1.ProductoEntity],
        synchronize: true,
        keepConnectionAlive: true,
    }),
    typeorm_1.TypeOrmModule.forFeature([cultura_gastronomica_entity_1.CulturaGastronomicaEntity, receta_entity_1.RecetaEntity, ciudad_entity_1.CiudadEntity, pais_entity_1.PaisEntity, producto_entity_1.ProductoEntity, restaurante_entity_1.RestauranteEntity, estrella_michelin_entity_1.EstrellaMichelinEntity]),
    common_1.CacheModule.register({
        store: sqliteStore,
        path: ':memory:',
        options: {
            ttl: 5
        },
    })
];
exports.TypeOrmConfiguracionPruebas = TypeOrmConfiguracionPruebas;
//# sourceMappingURL=typeorm-configuracion-pruebas.js.map