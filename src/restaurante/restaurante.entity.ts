/* eslint-disable prettier/prettier */
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { EstrellaMichelinEntity } from '../estrella-michelin/estrella-michelin.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RecetaEntity } from '../receta/receta.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class RestauranteEntity {

  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  nombre: string;

  @Field()
  @Column()
  img: string;

  @Field(type => [EstrellaMichelinEntity])
  @OneToMany(
    () => EstrellaMichelinEntity,
    (estrellaMichelin) => estrellaMichelin.restaurante,
  )
  estrellasMichelin: EstrellaMichelinEntity[];

  @Field(type => CiudadEntity)
  @ManyToOne(() => CiudadEntity, (ciudad) => ciudad.restaurantes)
  ciudad: CiudadEntity;

  @Field(type => [RecetaEntity])
  @ManyToMany(() => RecetaEntity, (receta) => receta.restaurantes)
  recetas: RecetaEntity[];
}
