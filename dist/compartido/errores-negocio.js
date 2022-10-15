"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorNegocio = exports.ExcepcionLogicaNegocio = void 0;
function ExcepcionLogicaNegocio(mensaje, tipo) {
    this.mensaje = mensaje;
    this.tipo = tipo;
}
exports.ExcepcionLogicaNegocio = ExcepcionLogicaNegocio;
var ErrorNegocio;
(function (ErrorNegocio) {
    ErrorNegocio[ErrorNegocio["NO_ENCONTRADO"] = 0] = "NO_ENCONTRADO";
    ErrorNegocio[ErrorNegocio["PRECONDICION_FALLIDA"] = 1] = "PRECONDICION_FALLIDA";
    ErrorNegocio[ErrorNegocio["PETICION_INCORRECTA"] = 2] = "PETICION_INCORRECTA";
})(ErrorNegocio = exports.ErrorNegocio || (exports.ErrorNegocio = {}));
//# sourceMappingURL=errores-negocio.js.map