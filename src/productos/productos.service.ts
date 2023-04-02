import { Injectable } from '@nestjs/common';
import { ProductoDTO } from 'src/dto/productoDTO';
import { Producto } from 'src/interfaces/producto/producto.interface';

@Injectable()
export class ProductosService {
  private productos: Producto[] = [];

  async findAll(): Promise<Producto[]> {
    return this.productos;
  }

  create(productoReq: ProductoDTO): void {
    let productoFinal: Producto;
    if (this.productos.length == 0) {
      productoFinal = { ...productoReq, id: 1 };
    } else {
      const lastId = this.productos[this.productos.length - 1].id + 1;
      productoFinal = { ...productoReq, id: lastId };
    }
    this.productos.push(productoFinal);
  }

  updateById(id: number, productoEditado: ProductoDTO): void {
    const productoAEditar = this.productos.find(
      (producto) => producto.id == id,
    );
    const indexProductoAEditar = this.productos.indexOf(productoAEditar);
    this.productos[indexProductoAEditar] = { ...productoEditado, id };
  }

  deleteById(id: number): void {
    this.productos = this.productos.filter((product) => product.id != id);
  }
}
