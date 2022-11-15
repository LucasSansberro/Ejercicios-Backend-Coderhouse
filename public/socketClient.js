const socket = io();
socket.on("connect", () => {
  console.log("Usuario conectado")
});

socket.on("lastProducts", (data) => {
  const lastProducts = [
    data[data.length - 1],
    data[data.length - 2],
    data[data.length - 3],
  ];
  if (document.getElementById("lastProducts")) {
    const divFiller = document.getElementById("lastProducts");
    divFiller.innerHTML = "" //Es destruir y volver a armar la manera más eficiente de hacer esto?
    //La otra opción que se me ocurre es un condicional que compare el array de productos viejo y el nuevo,
    //pero no sé si valdría la pena implementarlo
    lastProducts.map((product) => {
      divFiller.innerHTML += `<div class="card m-3" style="width:18rem">
                                <img src="${product.thumbnail}" class="card-img-top" alt=${product.title}/>
                                <div class="card-body d-flex flex-column justify-content-between">
                                  <h5 class="card-title">${product.title}</h5>
                                  <p class="card-text">Precio: $${product.price} / ID: ${product.id}</p>
                                </div>
                              </div>`;
    });
  }else return //Intenté usar renderizado condicional con ternarios como en React y me daba error. Buscar una solución
});
