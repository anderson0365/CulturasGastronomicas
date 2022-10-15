import { CulturaGastronomicaEntity } from '../cultura-gastronomica/cultura-gastronomica.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class ProductoEntity {
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
  historia: string;

  @Field()
  @Column()
  categoria: string;
  
  @Field(type => [CulturaGastronomicaEntity])
  @ManyToMany(() => CulturaGastronomicaEntity, (cultura) => cultura.productos)
  @JoinTable()
  culturasGastronomicas: CulturaGastronomicaEntity[];
}
