import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
@Entity()
export class RecetaEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  nombre: string;

  @Field()
  @Column()
  descripcion: string;

  @Field()
  @Column()
  imagen: string;

  @Field()
  @Column()
  video: string;

  @Field()
  @Column()
  proceso: string;

  @Field(type => CulturaGastronomicaEntity)
  @ManyToOne(() => CulturaGastronomicaEntity, (cultura) => cultura.recetas)
  culturaGastronomica: CulturaGastronomicaEntity;

  @Field(type => [RestauranteEntity])
  @ManyToMany(() => RestauranteEntity, (restaurante) => restaurante.recetas)
  @JoinTable()
  restaurantes: RestauranteEntity[];
}
