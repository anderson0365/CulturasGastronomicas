import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class PaisEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  nombre: string;

  @Field(type => [CiudadEntity])
  @OneToMany(() => CiudadEntity, (ciudad) => ciudad.pais)
  @JoinColumn()
  ciudades: CiudadEntity[];

  @Field(type => [CulturaGastronomicaEntity])
  @ManyToMany(() => CulturaGastronomicaEntity, (cultura) => cultura.paises)
  @JoinTable()
  culturasGastronomicas: CulturaGastronomicaEntity[];
}
