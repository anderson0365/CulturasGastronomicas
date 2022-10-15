"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErroresNegocioInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const errores_negocio_1 = require("../errores-negocio");
let ErroresNegocioInterceptor = class ErroresNegocioInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.catchError)((error) => {
            if (error.tipo === errores_negocio_1.ErrorNegocio.NO_ENCONTRADO)
                throw new common_1.HttpException({
                    codigoError: common_1.HttpStatus.NOT_FOUND,
                    mensaje: error.mensaje,
                }, common_1.HttpStatus.NOT_FOUND);
            else if (error.tipo === errores_negocio_1.ErrorNegocio.PRECONDICION_FALLIDA)
                throw new common_1.HttpException({
                    codigoError: common_1.HttpStatus.PRECONDITION_FAILED,
                    mensaje: error.mensaje,
                }, common_1.HttpStatus.PRECONDITION_FAILED);
            else if (error.tipo === errores_negocio_1.ErrorNegocio.PETICION_INCORRECTA)
                throw new common_1.HttpException({
                    codigoError: common_1.HttpStatus.BAD_REQUEST,
                    mensaje: error.mensaje,
                }, common_1.HttpStatus.BAD_REQUEST);
            else
                throw error;
        }));
    }
};
ErroresNegocioInterceptor = __decorate([
    (0, common_1.Injectable)()
], ErroresNegocioInterceptor);
exports.ErroresNegocioInterceptor = ErroresNegocioInterceptor;
//# sourceMappingURL=errores-negocio.interceptor.js.map