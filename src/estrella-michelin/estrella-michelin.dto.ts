import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class EstrellaMichelinDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly fechaDeObtencion: string;
}
