import { Strategy } from 'passport-local';
import { AutenticarService } from '../autenticar.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private autenticarService;
    constructor(autenticarService: AutenticarService);
    validate(username: string, password: string): Promise<any>;
}
export {};
