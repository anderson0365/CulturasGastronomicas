import { Repository } from 'typeorm';
import { EstrellaMichelinEntity } from './estrella-michelin.entity';
export declare class EstrellaMichelinService {
    private readonly estrellaMichelinRepository;
    constructor(estrellaMichelinRepository: Repository<EstrellaMichelinEntity>);
    findAll(): Promise<EstrellaMichelinEntity[]>;
    findOne(id: string): Promise<EstrellaMichelinEntity>;
    create(estrellaMichelin: EstrellaMichelinEntity): Promise<EstrellaMichelinEntity>;
    update(id: string, estrellaMichelin: EstrellaMichelinEntity): Promise<EstrellaMichelinEntity>;
    delete(id: string): Promise<void>;
}
