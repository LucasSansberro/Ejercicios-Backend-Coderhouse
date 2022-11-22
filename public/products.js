const url = "http://localhost:8080/api/productos";

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
    .then((response) => {
      if (response.status == "200") {
        return;
      } else {
        console.log("Error de parte del servidor");
      }
    })
    .catch(() => {
      return;
    });
};

const confirmEdit = (title, description, code, price, stock, id, thumbnail) => {
  Swal.fire({
    title: "Editar producto",
    html: `<input type="text" id="title" class="swal2-input" name="title" value=${title}>
    <input type="text" id="description" class="swal2-input" name="description" value='${description}'>
    <input type="text" id="code" class="swal2-input" name="code" value=${code}>
    <input type="number" id="price" class="swal2-input" name="price" value=${price}>
    <input type="number" id="stock" class="swal2-input" name="stock" value=${stock}>
    <input type="number" id="id" class="swal2-input" name="id" value=${id}>
    <input type="text" id="thumbnail" class="swal2-input" name="thumbnail" value=${thumbnail}>`,
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
      return;
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
