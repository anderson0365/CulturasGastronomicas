"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticarModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const usuario_service_1 = require("../usuario/usuario.service");
const usuario_module_1 = require("../usuario/usuario.module");
const autenticar_service_1 = require("./autenticar.service");
const local_strategy_1 = require("./strategies/local-strategy");
const jwt_strategy_1 = require("./strategies/jwt-strategy");
const constantes_1 = require("../compartido/seguridad/constantes");
let AutenticarModule = class AutenticarModule {
};
AutenticarModule = __decorate([
    (0, common_1.Module)({
        imports: [
            usuario_module_1.UsuarioModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constantes_1.default.JWT_SECRETO,
                signOptions: { expiresIn: constantes_1.default.JWT_EXPIRA_EN },
            })
        ],
        providers: [autenticar_service_1.AutenticarService, usuario_service_1.UsuarioService, jwt_1.JwtService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
        exports: [autenticar_service_1.AutenticarService]
    })
], AutenticarModule);
exports.AutenticarModule = AutenticarModule;
//# sourceMappingURL=autenticar.module.js.map