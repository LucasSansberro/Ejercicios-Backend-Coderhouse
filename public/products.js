const url = "http://localhost:8080/api/productos";
const cartUrl = "http://localhost:8080/api/carrito";

const productsCharge = async () => {
  const data = await fetch(url);
  const dataJson = await data.json();
  const productsContainer = document.getElementById("productsContainer");
  dataJson.map((product) => {
    productsContainer.innerHTML += `<div class="card m-5" style="width: 18rem">
      <div class="img-holder">
        <img src="${product.thumbnail}" class="card-img-top h-100" alt="${product.title}" />
        <button class="detailButton" type="button" onclick="productDetail(${product.id})">
          <img class="detailButtonImage" src="https://cdn-icons-png.flaticon.com/512/1269/1269549.png"/>
        </button>
      </div>
      <div class="card-body d-flex flex-column justify-content-around" id="buttonDiv">
      <h5 class="card-title">${product.title}</h5>
      <p class="card-text">Precio: $${product.price} / ID: ${product.id}</p>
      <button
        type="button"
        class="btn btn-primary my-3"
        onclick="cartAdd('${product.title}', '${product.description}', '${product.code}', ${product.price},${product.stock}, ${product.id}, '${product.thumbnail}')"
      >
        Agregar al carrito
      </button>
      <button
        type="button"
        class="btn btn-secondary my-3"
        onclick="confirmEdit('${product.title}', '${product.description}', '${product.code}', ${product.price},${product.stock}, ${product.id}, '${product.thumbnail}')"
      >
        Editar
      </button>
      <button
        type="button"
        class="btn btn-danger"
        onclick="confirmDelete(${product.id})"
      >
        Eliminar
      </button>
      </div>
    </div>`;
  });
};
productsCharge();

const confirmDelete = (id) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: `¿Quieres eliminar el producto con ID ${id}`,
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
    allowOutsideClick: true,
  })
    .then((result) => {
      if (result.isConfirmed) {
        return fetch(url + `/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error == -1) {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: data.message,
              });
            }
          });
      }
    })
    .catch(() => {
      console.log("Error de parte del servidor");
    });
};

const confirmEdit = (title, description, code, price, stock, id, thumbnail) => {
  Swal.fire({
    title: "Editar producto",
    html: `
    <div class="d-flex flex-column justify-content-around">
    <label for="title">Título</label>
    <input type="text" id="title" class="swal2-input mb-4" name="title" value=${title}>
    <label for="description">Descripción</label>
    <input type="text" id="description" class="swal2-input mb-4" name="description" value='${description}'>
    <label for="code">Código</label>
    <input type="text" id="code" class="swal2-input mb-4" name="code" value=${code}>
    <label for="price">Precio</label>
    <input type="number" id="price" class="swal2-input mb-4" name="price" value=${price}>
    <label for="stock">Stock</label>
    <input type="number" id="stock" class="swal2-input mb-4" name="stock" value=${stock}>
    <label for="id">ID</label>
    <input type="number" id="id" class="swal2-input mb-4" name="id" value=${id}>
    <label for="thumbnail">Thumbnail</label> 
    <input type="text" id="thumbnail" class="swal2-input" name="thumbnail" value=${thumbnail}>
    </div>`,
    confirmButtonText: "Confirmar cambios",
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    showCloseButton: true,
    preConfirm: () => {
      const title = Swal.getPopup().querySelector("#title").value;
      const description = Swal.getPopup().querySelector("#description").value;
      const code = Swal.getPopup().querySelector("#code").value;
      const price = Swal.getPopup().querySelector("#price").value;
      const stock = Swal.getPopup().querySelector("#stock").value;
      const id = Swal.getPopup().querySelector("#id").value;
      const thumbnail = Swal.getPopup().querySelector("#thumbnail").value;

      return { title, description, code, price, stock, id, thumbnail };
    },
  })
    .then((result) => {
      if (result.isConfirmed) {
        const updatedValues = {
          title: result.value.title,
          description: result.value.description,
          code: result.value.code,
          price: parseInt(result.value.price),
          stock: parseInt(result.value.stock),
          id: parseInt(result.value.id),
          thumbnail: result.value.thumbnail,
        };
        fetch(url + `/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedValues),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error == "ID repetido") {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ya existe un producto con ese ID",
              });
            } else if (data.error == -1) {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: data.message,
              });
            }
          });
      }
    })
    .catch(() => {
      console.log("Error de parte del servidor");
    });
};

const productDetail = async (id) => {
  const data = await fetch(url + `/${id}`);
  const product = await data.json();
  Swal.fire({
    title: `${product.title}`,
    html: `<div class="d-flex justify-content-around bg-light">
            <img src="${product.thumbnail}" class="detailImage" alt="${product.title}" />
            <div class="d-flex flex-column justify-content-around">
              <p>${product.description}</p>
              <p>Código: ${product.code}</p>
              <p>Precio: $${product.price}</p>
              <p>Stock: ${product.stock}</p>
              <p>ID: ${product.id}</p>
              <p>Fecha de carga: ${product.timestamp}</p>
            </div>
           </div>`,
    confirmButtonText: "Cerrar",
    showCloseButton: true,
    allowOutsideClick: true,
    width: "70vw",
  });
};

const cartAdd = async (
  title,
  description,
  code,
  price,
  stock,
  id,
  thumbnail
) => {
  const cartsFetch = await fetch(cartUrl);
  const carts = await cartsFetch.json();
  const cartOptions = {};
  carts.forEach((cart) => {
    cartOptions[cart.id] = `Carrito #${cart.id}`;
  });
  const { value: cartOption } = await Swal.fire({
    customClass: {
      input: "my-radio",
    },
    title: "Enviar al carrito",
    html: `<h5>¿A cuál carrito quieres enviar el producto?</h5>`,
    input: "radio",
    inputOptions: cartOptions,
    confirmButtonText: "Enviar",
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    showCloseButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "Por favor, escoja un carrito";
      }
    },
  });
  if (cartOption) {
    const productToSend = {
      title,
      description,
      code,
      price: parseInt(price),
      stock: parseInt(stock),
      id: parseInt(id),
      thumbnail,
    };
    fetch(cartUrl + `/${cartOption}/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productToSend),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Un producto con ese ID ya se encuentra en el carrito",
          });
        }
      });
  }
};
