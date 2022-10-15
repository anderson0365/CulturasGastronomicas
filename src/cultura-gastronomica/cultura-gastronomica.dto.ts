import { Field, InputType } from '@nestjs/graphql';
import {IsNotEmpty, IsString, IsUrl} from 'class-validator';

@InputType()
export class CulturaGastronomicaDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
  
    @Field()
    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;
  
    @Field()
    @IsUrl()
    @IsNotEmpty()
    readonly img: string;
}
