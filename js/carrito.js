function mostrarCarrito() {
  modalContainer.innerHTML = "";
  modalContainer.classList = "modal__container__products";
  modalContainer.style.display = "flex";

  const modalHeader = document.createElement("div");
  modalHeader.className = "modal__header";
  modalHeader.innerHTML = `
  <h2 class="modal__header__title">Carrito de Compras</h2>
  `;
  modalContainer.append(modalHeader);

  const modalBtn = document.createElement("p");
  modalBtn.innerText = "❌";
  modalBtn.className = "modal__header__btn";

  modalHeader.append(modalBtn);

  modalBtn.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal__content";
    carritoContent.innerHTML = `
    <img src="${product.Imagen}">
    <h3>${product.titulo}</h3>
    <p>Precio:<b>$${product.precio}</b></p>
    <span class="restar"> - </span>
    <p>Cantidad: ${product.cantidad}</p>
    <span class="sumar"> + </span>
    <p>Total por cant: $${product.cantidad * product.precio}</P>
    <span class="delete__product">❌</span>
    `;
    modalContainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () => {
      if (product.cantidad !== 1) {
        product.cantidad--;
      }
      mostrarCarrito();
      saveLocal();
    });

    let sumar = carritoContent.querySelector(".sumar");

    sumar.addEventListener("click", () => {
      product.cantidad++;
      mostrarCarrito();
      saveLocal();
    });
    let eliminar = carritoContent.querySelector(".delete__product");

    eliminar.addEventListener("click", () => {
      eliminarProducto(product.id);
    });
  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalcompra = document.createElement("div");
  totalcompra.className = "total__compra";
  totalcompra.innerHTML = `Total a pagar: $${total}`;

  modalContainer.append(totalcompra);

  const btnVaciarCarrito = document.createElement("button");
  btnVaciarCarrito.className = "btn__vaciar__carrito";
  btnVaciarCarrito.innerText = "Vaciar Carrito";

  modalContainer.append(btnVaciarCarrito);

  const vaciarCarrito = document.querySelector(".btn__vaciar__carrito");

  vaciarCarrito.addEventListener("click", () => {
    vaciar();
  });
}

iconoCarrito.addEventListener("click", mostrarCarrito);

const eliminarProducto = (id) => {
  const encontrarID = carrito.find((elemento) => elemento.id === id);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== encontrarID;
  });
  saveLocal();
  carritoCounter();
  mostrarCarrito();
};

const vaciar = () => {
  carrito = [];
  saveLocal();
  carritoCounter();
  mostrarCarrito();
};

const carritoCounter = () => {
  carritoContador.style.display = "block";
  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  carritoContador.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();
