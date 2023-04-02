"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosService = void 0;
const common_1 = require("@nestjs/common");
let ProductosService = class ProductosService {
    constructor() {
        this.productos = [];
    }
    async findAll() {
        return this.productos;
    }
    create(productoReq) {
        let productoFinal;
        if (this.productos.length == 0) {
            productoFinal = Object.assign(Object.assign({}, productoReq), { id: 1 });
        }
        else {
            const lastId = this.productos[this.productos.length - 1].id + 1;
            productoFinal = Object.assign(Object.assign({}, productoReq), { id: lastId });
        }
        this.productos.push(productoFinal);
    }
    updateById(id, productoEditado) {
        const productoAEditar = this.productos.find((producto) => producto.id == id);
        const indexProductoAEditar = this.productos.indexOf(productoAEditar);
        this.productos[indexProductoAEditar] = Object.assign(Object.assign({}, productoEditado), { id });
    }
    deleteById(id) {
        this.productos = this.productos.filter((product) => product.id != id);
    }
};
ProductosService = __decorate([
    (0, common_1.Injectable)()
], ProductosService);
exports.ProductosService = ProductosService;
//# sourceMappingURL=productos.service.js.map