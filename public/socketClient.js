const socket = io();
socket.on("connect", () => {
  console.log("Usuario conectado");
});

socket.on("lastProducts", (data) => {
  const lastProducts = [
    data[data.length - 1],
    data[data.length - 2],
    data[data.length - 3],
  ];
  if (document.getElementById("lastProducts")) {
    const divFiller = document.getElementById("lastProducts");
    divFiller.innerHTML = ""; //Es destruir y volver a armar la manera más eficiente de hacer esto?
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
  } else return; //Intenté usar renderizado condicional con ternarios como en React y me daba error. Buscar una solución
});

const sendMsg = () => {
  const userEmail = document.getElementById("userEmail").value;
  const userMsg = document.getElementById("userMsg").value;
  let date = new Date().toLocaleString();
  socket.emit("userMsg", { userEmail, userMsg, date });
  document.getElementById("userMsg").value = "";
  return false;
};

socket.on("chat", (data) => {
  const divFiller = document.getElementById("div-chats");
  divFiller.innerHTML = "";
  data.map((message) => {
    divFiller.innerHTML += `<div class="m-3 d-flex justify-content-between">
                              <div>
                                <span style="color:blue; font-weight:bold">${message.userEmail}</span>
                                dice: <span style="color:green;font-style:italic"> ${message.userMsg} </span>
                              </div>
                              <div>
                              <span style="color:brown"> ${message.date} </span>
                              </div>
                            </div>`;
  });
});
