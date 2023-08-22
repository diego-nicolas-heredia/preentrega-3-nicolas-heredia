const iconoCarrito = document.getElementById("iconoCarrito");
const modalContainer = document.getElementById("modalContainer");
const tiendaProductos = document.getElementById("tiendaProductos");
//*VARIABLES SISTEMA FILTRO
const filtrosContainer = document.getElementById("filtrosContainer");
const filtros = document.getElementsByName("filto-producto");
//*CONTADOR CARRITO
const carritoContador = document.getElementById("carritoContador");
//*CARRITO

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductos() {
  productos.forEach((producto) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img class="card__img" src="${producto.Imagen}">
    <h3 class= "card__titulo">${producto.titulo}</h3>
    <p class= "card__precio">$${producto.precio}</p>
    `;

    tiendaProductos.append(content);

    //Todo btn comprar

    const btnComprar = document.createElement("button");
    btnComprar.className = "card__btn__comprar";
    btnComprar.innerText = "comprar";

    content.append(btnComprar);

    //todo: escuchador de eventos
    btnComprar.addEventListener("click", () => {
      const repetido = carrito.some(
        (repeatProduct) => repeatProduct.id === producto.id
      );

      if (repetido) {
        carrito.map((prod) => {
          if (prod.id === producto.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: producto.id,
          Imagen: producto.Imagen,
          titulo: producto.titulo,
          precio: producto.precio,
          cantidad: producto.cantidad,
        });
      }
      carritoCounter();
      saveLocal();
    });
  });
}

filtrosContainer.addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    switch (e.target.id) {
      case "todos":
        tiendaProductos.innerHTML = "";
        mostrarProductos();
        saveLocal();
        break;
      case "abrigos":
        filtrarProductos("abrigo");
        saveLocal();
        break;
      case "camisas":
        filtrarProductos("camiseta");
        saveLocal();
        break;
      case "pantalones":
        filtrarProductos("pantalon");
        saveLocal();
        break;
    }
  }
});

//*Funcion para filtrar los productos por (type)

function filtrarProductos(type) {
  tiendaProductos.innerHTML = "";
  const productType = productos.filter((product) => product.tipo === type);

  productType.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img class="card__img" src="${product.Imagen}">
    <h3 class= "card__titulo">${product.titulo}</h3>
    <p class= "card__precio">$${product.precio}</p>
  `;

    tiendaProductos.append(content);

    let btnComprar = document.createElement("button");
    btnComprar.className = "card__btn__comprar";
    btnComprar.innerText = "Comprar";

    content.append(btnComprar);

    btnComprar.addEventListener("click", () => {
      const repetido = carrito.some(
        (repeatProduct) => repeatProduct.id === product.id
      );

      if (repetido) {
        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: product.id,
          img: product.Imagen,
          nombre: product.nombre,
          precio: product.precio,
          cantidad: product.cantidad,
        });
        saveLocal();
        carritoCounter();
      }
    });
  });
}

//*Local storage Set Item
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

mostrarProductos();
