const iconoCarrito = document.getElementById("iconoCarrito");
const modalContainer = document.getElementById("modalContainer");
const tiendaProductos = document.getElementById("tiendaProductos");
let productos = [];

//*VARIABLES SISTEMA FILTRO
const filtrosContainer = document.getElementById("filtrosContainer");
const filtros = document.getElementsByName("filto-producto");

//*CONTADOR CARRITO
const carritoContador = document.getElementById("carritoContador");

//*CHEQUIAMOS QUE HAYA CARGADO EL CONTENIDO DEL DOM
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

//*PETICION CON FETCH
const fetchData = async () => {
  try {
    const res = await fetch("./js/productos.json");
    const data = await res.json();
    productos = data;
    mostrarProductos(data);
  } catch (error) {
    console.log(error);
  }
};

//*CARRITO

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductos(productos) {
  productos.forEach((producto) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img class="card__img" src="${producto.Imagen}">
    <h3 class= "card__titulo">${producto.titulo}</h3>
    <p class= "card__precio">$${producto.precio}</p>
    `;

    tiendaProductos.append(content);

    const btnComprar = document.createElement("button");
    btnComprar.className = "card__btn__comprar";
    btnComprar.innerText = "comprar";

    content.append(btnComprar);

    btnComprar.addEventListener("click", () => {
      modalContainer.style.display = "none";
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

let productoFiltradoDefault = "";

filtrosContainer.addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    let productoFiltrado = e.target.id;

    if (productoFiltrado !== productoFiltradoDefault) {
      productoFiltradoDefault = productoFiltrado;

      if (productoFiltrado === "todos") {
        tiendaProductos.innerHTML = "";
        mostrarProductos(productos);
        carritoCounter();
        saveLocal();
      } else {
        filtrarProductos(productoFiltrado);
        carritoCounter();
        saveLocal();
      }
    }
  }
});

//*Funcion para filtrar los productos por (type)

function filtrarProductos(type) {
  tiendaProductos.innerHTML = "";
  const productType = productos.filter((product) => product.tipo === type);

  mostrarProductos(productType);
}

//*Local storage Set Item
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const toastAction = async () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-right",
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
  await Toast.fire({
    icon: "success",
    title: "Se ha añadido un producto al carrito",
  });
};
