import { PaisEntity } from '../pais/pais.entity';
import { ProductoEntity } from '../producto/producto.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RecetaEntity } from '../receta/receta.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class CulturaGastronomicaEntity {
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
  img: string;

  @Field(type => [RecetaEntity])
  @OneToMany(() => RecetaEntity, (receta) => receta.culturaGastronomica)
  @JoinColumn()
  recetas: RecetaEntity[];

  @Field(type => [PaisEntity])
  @ManyToMany(() => PaisEntity, (pais) => pais.culturasGastronomicas)
  paises: PaisEntity[];

  @Field(type => [ProductoEntity])
  @ManyToMany(
    () => ProductoEntity,
    (producto) => producto.culturasGastronomicas,
  )
  productos: ProductoEntity[];
}
