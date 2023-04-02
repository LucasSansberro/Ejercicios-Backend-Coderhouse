import {
  Controller,
  Body,
  Get,
  Post,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { ProductoDTO } from 'src/dto/productoDTO';
import { Producto } from 'src/interfaces/producto/producto.interface';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productoService: ProductosService) {}
  @Get()
  async findAll(): Promise<Producto[]> {
    return this.productoService.findAll();
  }

  @Post()
  async create(@Body() productoReq: ProductoDTO) {
    this.productoService.create(productoReq);
    return 'Objeto creado con éxito';
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() productoAEditar: ProductoDTO) {
    this.productoService.updateById(id, productoAEditar);
    return 'Objeto editado con éxito';
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    this.productoService.deleteById(id);
    return 'Objeto eliminado con éxito';
  }
}
