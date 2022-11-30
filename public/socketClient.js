const socket = io();
socket.on("connect", () => {
});

socket.on("lastProducts", (data) => {
  const lastProducts = [
    data[data.length - 1],
    data[data.length - 2],
    data[data.length - 3],
  ];
  if (document.getElementById("lastProducts")) {
    const divFiller = document.getElementById("lastProducts");
    divFiller.innerHTML = "";
    lastProducts.map((product) => {
      divFiller.innerHTML += `<div class="card m-3" style="width:18rem">
                                <img src="${product.thumbnail}" class="card-img-top" alt=${product.title}/>
                                <div class="card-body d-flex flex-column justify-content-between">
                                  <h5 class="card-title">${product.title}</h5>
                                  <p class="card-text">Precio: $${product.price} / ID: ${product.id}</p>
                                </div>
                              </div>`;
    });
  } else return;
});

const sendMsg = () => {
  const userEmail = document.getElementById("userEmail").value;
  const userMsg = document.getElementById("userMsg").value;
  let timestamp = new Date().toLocaleString();
  socket.emit("userMsg", { userEmail, userMsg, timestamp });
  document.getElementById("userMsg").value = "";
  return false;
};

socket.on("chat", (data) => {
  const divFiller = document.getElementById("div-chats");
  try {
    divFiller.innerHTML = "";
    data.map((message) => {
      divFiller.innerHTML += `<div class="m-3 d-flex justify-content-between">
                              <div>
                                <span style="color:blue; font-weight:bold">${message.userEmail}</span>
                                dice: <span style="color:green;font-style:italic"> ${message.userMsg} </span>
                              </div>
                              <div>
                              <span style="color:brown"> ${message.timestamp} </span>
                              </div>
                            </div>`;
    });
  } catch {
    return;
  }
});
