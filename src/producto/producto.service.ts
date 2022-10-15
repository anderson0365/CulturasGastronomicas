import { CACHE_MANAGER, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorNegocio, ExcepcionLogicaNegocio } from '../compartido/errores-negocio';
import { Repository } from 'typeorm';
import { ProductoEntity } from './producto.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductoService {

    cacheKey: string = "cacheProductos";

    constructor(
        @InjectRepository(ProductoEntity)
        private readonly productoRepository: Repository<ProductoEntity>,
        
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache){}
    
    async obtenerTodos(): Promise<ProductoEntity[]> {
        const cached: ProductoEntity[] = await this.cacheManager.get<ProductoEntity[]>(this.cacheKey);
      
       if(!cached){
           const productos: ProductoEntity[] = await this.productoRepository.find({ });
           await this.cacheManager.set(this.cacheKey, productos);
           return productos;
       }

       return cached;

    }

    async obtenerUno(id: string): Promise<ProductoEntity> {
        const producto: ProductoEntity = await this.productoRepository.findOne({where: {id}, /*relations: ["producto"]*/ } );
        if (!producto)
         throw new ExcepcionLogicaNegocio("El Producto con el Id no ha sido encontrado", ErrorNegocio.NO_ENCONTRADO);
  
       return producto;
    }

    async crear(producto: ProductoEntity): Promise<ProductoEntity> {
        return await this.productoRepository.save(producto);
    }

    async actualizar(id: string, producto: ProductoEntity): Promise<ProductoEntity> {
        const productoPersistido: ProductoEntity = await this.productoRepository.findOne({where:{id}});
        if (!productoPersistido)
          throw new ExcepcionLogicaNegocio("El producto no fue encontrado", ErrorNegocio.NO_ENCONTRADO);
        
        return await this.productoRepository.save({...productoPersistido, ...producto});
    }

    async borrar(id: string) {
        const producto: ProductoEntity = await this.productoRepository.findOne({where:{id}});
        if (!producto)
          throw new ExcepcionLogicaNegocio("El producto no fue encontrado", ErrorNegocio.NO_ENCONTRADO);
     
        await this.productoRepository.remove(producto);
    }
}
