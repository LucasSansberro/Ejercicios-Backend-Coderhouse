import { ProductoDTO } from 'src/dto/productoDTO';
import { Producto } from 'src/interfaces/producto/producto.interface';
import { ProductosService } from './productos.service';
export declare class ProductosController {
    private readonly productoService;
    constructor(productoService: ProductosService);
    findAll(): Promise<Producto[]>;
    create(productoReq: ProductoDTO): Promise<string>;
    update(id: number, productoAEditar: ProductoDTO): Promise<string>;
    delete(id: number): Promise<string>;
}
