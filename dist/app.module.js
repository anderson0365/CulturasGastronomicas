"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const receta_module_1 = require("./receta/receta.module");
const receta_entity_1 = require("./receta/receta.entity");
const ciudad_module_1 = require("./ciudad/ciudad.module");
const ciudad_entity_1 = require("./ciudad/ciudad.entity");
const cultura_gastronomica_entity_1 = require("./cultura-gastronomica/cultura-gastronomica.entity");
const cultura_gastronomica_module_1 = require("./cultura-gastronomica/cultura-gastronomica.module");
const pais_module_1 = require("./pais/pais.module");
const pais_entity_1 = require("./pais/pais.entity");
const producto_module_1 = require("./producto/producto.module");
const producto_entity_1 = require("./producto/producto.entity");
const restaurante_module_1 = require("./restaurante/restaurante.module");
const estrella_michelin_module_1 = require("./estrella-michelin/estrella-michelin.module");
const estrella_michelin_entity_1 = require("./estrella-michelin/estrella-michelin.entity");
const restaurante_entity_1 = require("./restaurante/restaurante.entity");
const cultura_gastronomica_receta_module_1 = require("./cultura-gastronomica-receta/cultura-gastronomica-receta.module");
const cultura_gastronomica_producto_module_1 = require("./cultura-gastronomica-producto/cultura-gastronomica-producto.module");
const restaurante_receta_module_1 = require("./restaurante-receta/restaurante-receta.module");
const cultura_gastronomica_pais_module_1 = require("./cultura-gastronomica-pais/cultura-gastronomica-pais.module");
const pais_cultura_gastronomica_module_1 = require("./pais-cultura-gastronomica/pais-cultura-gastronomica.module");
const usuario_module_1 = require("./usuario/usuario.module");
const autenticar_module_1 = require("./autenticar/autenticar.module");
const restaurante_estrella_michelin_module_1 = require("./restaurante-estrella-michelin/restaurante-estrella-michelin.module");
const ciudad_restaurante_module_1 = require("./ciudad-restaurante/ciudad-restaurante.module");
const pais_ciudad_module_1 = require("./pais-ciudad/pais-ciudad.module");
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const apollo_1 = require("@nestjs/apollo");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cultura_gastronomica_module_1.CulturaGastronomicaModule,
            receta_module_1.RecetaModule,
            ciudad_module_1.CiudadModule,
            producto_module_1.ProductoModule,
            pais_module_1.PaisModule,
            restaurante_module_1.RestauranteModule,
            estrella_michelin_module_1.EstrellaMichelinModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'gastronomia',
                entities: [
                    cultura_gastronomica_entity_1.CulturaGastronomicaEntity,
                    receta_entity_1.RecetaEntity,
                    ciudad_entity_1.CiudadEntity,
                    producto_entity_1.ProductoEntity,
                    pais_entity_1.PaisEntity,
                    estrella_michelin_entity_1.EstrellaMichelinEntity,
                    restaurante_entity_1.RestauranteEntity,
                ],
                dropSchema: true,
                synchronize: true,
                keepConnectionAlive: true,
            }),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                driver: apollo_1.ApolloDriver
            }),
            cultura_gastronomica_receta_module_1.CulturaGastronomicaRecetaModule,
            cultura_gastronomica_pais_module_1.CulturaGastronomicaPaisModule,
            pais_cultura_gastronomica_module_1.PaisCulturaGastronomicaModule,
            cultura_gastronomica_producto_module_1.CulturaGastronomicaProductoModule,
            ciudad_restaurante_module_1.CiudadRestauranteModule,
            restaurante_receta_module_1.RestauranteRecetaModule,
            usuario_module_1.UsuarioModule,
            autenticar_module_1.AutenticarModule,
            pais_ciudad_module_1.PaisCiudadModule,
            restaurante_estrella_michelin_module_1.RestauranteEstrellaMichelinModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map