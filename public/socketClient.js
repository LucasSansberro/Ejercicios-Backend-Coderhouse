const socket = io();
socket.on("connect", () => {});

const schema = normalizr.schema;
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const authorSchema = new schema.Entity("authors");
const messageSchema = new schema.Entity(
  "messages",
  {
    author: authorSchema,
  },
  { idAttribute: "_id" }
);
const messageListSchema = [messageSchema];

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
                                  <p class="card-text">Precio: $${product.price} / ID: ${product._id}</p>
                                </div>
                              </div>`;
    });
  } else return;
});

const sendMsg = () => {
  const id = document.getElementById("userEmail").value;
  const nombre = document.getElementById("userName").value;
  const apellido = document.getElementById("userLastName").value;
  const edad = document.getElementById("userAge").value;
  const alias = document.getElementById("userUser").value;
  const avatar = document.getElementById("userIcon").value;
  const text = document.getElementById("userMsg").value;
  let timestamp = new Date().toLocaleString();
  socket.emit("userMsg", {
    author: {
      id,
      nombre,
      apellido,
      edad,
      alias,
      avatar,
    },
    timestamp,
    text,
  });
  document.getElementById("userMsg").value = "";
  return false;
};

socket.on("chat", (data) => {
  
    const denormalizedData = denormalize(
      data.result,
      messageListSchema,
      data.entities
    );

    if (document.getElementById("normalizados") != null) {
    const normalizedCount = document.getElementById("normalizados");
    const denormalizedCount = document.getElementById("desnormalizados");
    normalizedCount.innerHTML = JSON.stringify(data).length;
    denormalizedCount.innerHTML = JSON.stringify(denormalizedData).length;

    const divFiller = document.getElementById("div-chats");
    try {
      divFiller.innerHTML = "";
      denormalizedData.map((message) => {
        divFiller.innerHTML += `<div class="m-3 d-flex justify-content-between">
                              <div>
                                <span style="color:blue; font-weight:bold">${message.author.id}</span>
                                dice: <span style="color:green;font-style:italic"> ${message.text} </span>
                              </div>
                              <div>
                              <img src=${message.author.avatar} class="me-3" style="height:50px" >
                              <span style="color:brown"> ${message.timestamp} </span>
                              </div>
                            </div>
                            <hr>`;
      });
    } catch {
      return;
    }}
  
});
