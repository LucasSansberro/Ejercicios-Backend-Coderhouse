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
        return fetch(`/api/productos/${id}`, { method: "DELETE" });
      }
    })
    .then((response) => {
      if (response.status == "200") {
        window.location.reload();
      } else {
        console.log("Error de parte del servidor");
      }
    })
    .catch(() => {
      return;
    });
};

const confirmEdit = ({ id, title, thumbnail, price }) => {
  Swal.fire({
    title: "Editar producto",
    html: `<input type="text" id="title" class="swal2-input" value=${title}>
    <input type="number" id="price" class="swal2-input" value=${price}>
    <input type="number" id="id" class="swal2-input" value=${id}>
    <input type="text" id="thumbnail" class="swal2-input" value=${thumbnail}>`,
    confirmButtonText: "Confirmar cambios",
    focusConfirm: false,
    preConfirm: () => {
      const title = Swal.getPopup().querySelector("#title").value;
      const price = Swal.getPopup().querySelector("#price").value;
      const id = Swal.getPopup().querySelector("#id").value;
      const thumbnail = Swal.getPopup().querySelector("#thumbnail").value;

      return { title, price, id, thumbnail };
    },
  })
    .then((result) => {
      Swal.fire(
        `
      Title: ${result.value.title}
      Price: ${result.value.price}
    `.trim()
      );
    })
    .catch(() => {
      return;
    });
};
