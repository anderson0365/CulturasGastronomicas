import { PaisEntity } from '../pais/pais.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class CiudadEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  nombre: string;

  @ManyToOne(() => PaisEntity, (pais) => pais.ciudades)
  pais: PaisEntity;

  @Field(type => [RestauranteEntity])
  @OneToMany(() => RestauranteEntity, (restaurante) => restaurante.ciudad)
  @JoinColumn()
  restaurantes: RestauranteEntity[];
}
