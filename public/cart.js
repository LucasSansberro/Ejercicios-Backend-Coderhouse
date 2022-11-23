const url = "http://localhost:8080/api/carrito";

const cartsCharge = async () => {
  const data = await fetch(url);
  const dataJson = await data.json();
  const cartsContainer = document.getElementById("cartsContainer");
  dataJson.map((cart) => {
    cartsContainer.innerHTML += `<div class="card m-5" style="width: 18rem">
        <img src="https://www.freeiconspng.com/uploads/basket-cart-icon-27.png" class="card-img-top h-100 p-3" alt="Carrito" />
      <div class="card-body d-flex flex-column text-center justify-content-around" id="buttonDiv">
      <h5 class="card-title">Cart #${cart.id}</h5>
      <p>Items: ${cart.productos.length}</p>
      <button
        type="button"
        class="btn btn-primary my-3"
        onclick="cartDetail(${cart.id})"
      >
        Ver productos
      </button>
      <button
        type="button"
        class="btn btn-danger"
        onclick="cartDelete(${cart.id})"
      >
        Eliminar
      </button>
      </div>
    </div>`;
  });
};
cartsCharge();

const cartCreate = () => {
  Swal.fire({
    icon: "question",
    title: "¿Quieres crear un carrito?",
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    allowOutsideClick: true,
    showCloseButton: true,
  })
    .then((result) => {
      if (result.isConfirmed) {
        return fetch(url, {
          method: "POST",
        });
      }
    })
    .catch(() => {
      console.log("Error de parte del servidor");
    });
};

const cartDelete = (id) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: `¿Quieres eliminar el carrito con ID ${id}`,
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
    allowOutsideClick: true,
  })
    .then((result) => {
      if (result.isConfirmed) {
        return fetch(url + `/${id}`, {
          method: "DELETE",
        });
      }
    })
    .catch(() => {
      console.log("Error de parte del servidor");
    });
};

const cartDetail = async (id) => {
  const data = await fetch(url + `/${id}/productos`);
  const products = await data.json();
  const productsHTML = products
    .map((product) => {
      return `<div class="d-flex justify-content-between bg-light my-2 p-2">
                <p class="w-100">${product.title}</p>
                <p class="w-100">${product.code}</p>
                <p class="w-100">${product.price}</p>
                <p class="w-100">${product.stock}</p>
                <p class="w-100">${product.id}</p>
                <button class="cartProductDeleteButton w-100" type="button" onclick="cartProductDelete(${id} , ${product.id})">
                  <img class="detailButtonImage" src="https://cdn-icons-png.flaticon.com/512/17/17047.png"/>
                </button>
              </div>`;
    })
    .join("");
  Swal.fire({
    title: `Productos`,
    html: `<div class="d-flex justify-content-between bg-light my-2 p-2">
            <p class="w-100 fw-bold">Nombre</p>
            <p class="w-100 fw-bold">Código</p>
            <p class="w-100 fw-bold">Precio</p>
            <p class="w-100 fw-bold">Cantidad</p>
            <p class="w-100 fw-bold">ID</p>
            <p class="w-100 fw-bold">Eliminar</p>
            </div>
            ${productsHTML}`,
    confirmButtonText: "Cerrar",
    showCloseButton: true,
    allowOutsideClick: true,
    width: "70vw",
  });
};

const cartProductDelete = async (id, productId) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: `¿Quieres eliminar el producto con ID ${productId}`,
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
    allowOutsideClick: true,
  })
    .then((result) => {
      if (result.isConfirmed) {
        return fetch(url + `/${id}/productos/${productId}`, {
          method: "DELETE",
        });
      }
    })
    .catch(() => {
      console.log("Error de parte del servidor");
    });
};
