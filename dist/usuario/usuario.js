"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["LECTOR"] = "lector";
    Role["LECTOR_UNICO_RECURSO"] = "lector_unico_recurso";
    Role["ESCRITURA"] = "escritura";
    Role["ELIMINACION"] = "eliminacion";
})(Role = exports.Role || (exports.Role = {}));
class Usuario {
    constructor(id, nombre, contrasena, roles) {
        this.id = id;
        this.nombre = nombre;
        this.contrasena = contrasena;
        this.roles = roles;
    }
}
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map