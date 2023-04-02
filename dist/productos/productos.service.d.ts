import { ProductoDTO } from 'src/dto/productoDTO';
import { Producto } from 'src/interfaces/producto/producto.interface';
export declare class ProductosService {
    private productos;
    findAll(): Promise<Producto[]>;
    create(productoReq: ProductoDTO): void;
    updateById(id: number, productoEditado: ProductoDTO): void;
    deleteById(id: number): void;
}
