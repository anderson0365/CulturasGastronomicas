import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { ProductoDto } from './producto.dto';
import { ProductoEntity } from './producto.entity';
import { ProductoService } from './producto.service';

@Resolver()
export class ProductoResolver {
    constructor(private productoService: ProductoService){}

    @Query(() => [ProductoEntity])
    productos(): Promise<ProductoEntity[]> {
        return this.productoService.obtenerTodos();
    }

    @Query(() => ProductoEntity)
    producto(@Args('id') id: string): Promise<ProductoEntity> {
        return this.productoService.obtenerUno(id);
    }

    @Mutation(() => ProductoEntity)
    crearProducto(@Args('producto') productoDto: ProductoDto): Promise<ProductoEntity> {
       const producto = plainToInstance(ProductoEntity, productoDto);
       return this.productoService.crear(producto);
    }

    @Mutation(() => ProductoEntity)
    actualizarProducto(@Args('id') id: string, @Args('producto') productoDto: ProductoDto): Promise<ProductoEntity> {
       const producto = plainToInstance(ProductoEntity, productoDto);
       return this.productoService.actualizar(id,producto);
    }

    @Mutation(() => ProductoEntity)
    borrarProducto(@Args('id') id: string){
       return this.productoService.borrar(id);
    }
}
