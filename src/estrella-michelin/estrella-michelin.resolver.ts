import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { EstrellaMichelinDto } from './estrella-michelin.dto';
import { EstrellaMichelinEntity } from './estrella-michelin.entity';
import { EstrellaMichelinService } from './estrella-michelin.service';

@Resolver()
export class EstrellaMichelinResolver {
  constructor(private estrellaMichelinService: EstrellaMichelinService) {}

  @Query(() => [EstrellaMichelinEntity])
  estrellaMichelins(): Promise<EstrellaMichelinEntity[]> {
    return this.estrellaMichelinService.findAll();
  }

  @Query(() => EstrellaMichelinEntity)
  estrellaMichelin(@Args('id') id: string): Promise<EstrellaMichelinEntity> {
    return this.estrellaMichelinService.findOne(id);
  }

  @Mutation(() => EstrellaMichelinEntity)
  createEstrellaMichelin(
    @Args('estrellaMichelin') estrellaMichelinDto: EstrellaMichelinDto,
  ): Promise<EstrellaMichelinEntity> {
    const estrellaMichelin = plainToInstance(
      EstrellaMichelinEntity,
      estrellaMichelinDto,
    );
    return this.estrellaMichelinService.create(estrellaMichelin);
  }

  @Mutation(() => EstrellaMichelinEntity)
  updateEstrellaMichelin(
    @Args('id') id: string,
    @Args('estrellaMichelin') estrellaMichelinDto: EstrellaMichelinDto,
  ): Promise<EstrellaMichelinEntity> {
    const estrellaMichelin = plainToInstance(
      EstrellaMichelinEntity,
      estrellaMichelinDto,
    );
    return this.estrellaMichelinService.update(id, estrellaMichelin);
  }

  @Mutation(() => String)
  deleteEstrellaMichelin(@Args('id') id: string) {
    this.estrellaMichelinService.delete(id);
    return id;
  }
}
