/* eslint-disable prettier/prettier */
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class EstrellaMichelinEntity {

    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    fechaDeObtencion: string;

    @Field(type => RestauranteEntity)
    @ManyToOne(() => RestauranteEntity, restaurante => restaurante.estrellasMichelin)
    restaurante: RestauranteEntity;
}
