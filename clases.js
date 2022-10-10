class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [{ nombre: libros }];
    this.mascotas = [mascotas];
  }
  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }
  addMascota(nombre) {
    this.mascotas.push(nombre);
  }
  countMascotas() {
    return this.mascotas.length;
  }
  addBook(nombre, autor) {
    this.libros.push({
      nombre: nombre,
      autor: autor,
    });
  }
  getBookNames() {
    return this.libros.map((libro) => libro.nombre);
  }
}

const lucas = new Usuario("Lucas", "Sansberro", "Don Quijote", "Raúl");
console.log(lucas.getFullName());
lucas.addMascota("Pepe");
console.log(lucas.mascotas);
console.log(lucas.countMascotas());
lucas.addBook("Un coro de niños enfermos", "Tom Piccirilli");
console.log(lucas.getBookNames());
