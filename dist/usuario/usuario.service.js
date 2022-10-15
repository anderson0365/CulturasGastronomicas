"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const usuario_1 = require("./usuario");
let UsuarioService = class UsuarioService {
    constructor() {
        this.usuarios = [
            new usuario_1.default(1, "admin", "admin", [usuario_1.Role.ADMIN]),
            new usuario_1.default(2, "lector", "lector", [usuario_1.Role.LECTOR]),
            new usuario_1.default(3, "lector_unico_recurso", "lector_unico_recurso", [usuario_1.Role.LECTOR_UNICO_RECURSO]),
            new usuario_1.default(4, "escritura", "escritura", [usuario_1.Role.ESCRITURA]),
            new usuario_1.default(5, "eliminacion", "eliminacion", [usuario_1.Role.ELIMINACION]),
        ];
    }
    async obtenerUno(nombre) {
        return this.usuarios.find(usuario => usuario.nombre == nombre);
    }
};
UsuarioService = __decorate([
    (0, common_1.Injectable)()
], UsuarioService);
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuario.service.js.map