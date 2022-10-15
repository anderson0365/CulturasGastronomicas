import { EstrellaMichelinDto } from './estrella-michelin.dto';
import { EstrellaMichelinEntity } from './estrella-michelin.entity';
import { EstrellaMichelinService } from './estrella-michelin.service';
import { Cache } from 'cache-manager';
export declare class EstrellaMichelinController {
    private readonly estrellaMichelinService;
    private readonly administradorCache;
    constructor(estrellaMichelinService: EstrellaMichelinService, administradorCache: Cache);
    findAll(): Promise<EstrellaMichelinEntity[]>;
    findOne(estrellaMichelinId: string): Promise<EstrellaMichelinEntity>;
    create(estrellaMichelinDto: EstrellaMichelinDto): Promise<EstrellaMichelinEntity>;
    update(estrellaMichelinId: string, estrellaMichelinDto: EstrellaMichelinDto): Promise<EstrellaMichelinEntity>;
    delete(estrellaMichelinId: string): Promise<void>;
}
