'use strict';

class Tabs {
    constructor(idElemento) {
        this.tabs = document.getElementById(idElemento);
        this.nav = this.tabs.querySelector(".tabs");

        this.nav.addEventListener("click", (e) => {
            e.preventDefault();

            // Solo reaccionamos a los botones de las tabs
            if (e.target.classList.contains("tabs__button")) {
                // Tab que queremos mostrar
                const tab = e.target.dataset.tab;

                // Quitamos la clase activa de la tab y del botón anteriores
                this.tabs.querySelector(".tab--active")?.classList.remove("tab--active");
                this.tabs.querySelector(".tabs__button--active")?.classList.remove("tabs__button--active");

                // Activamos la nueva tab y su botón
                this.tabs.querySelector(`#${tab}`).classList.add("tab--active");
                e.target.classList.add("tabs__button--active");
            }
        });
    }
}

const producto$1 = document.getElementById("producto");
const productoImagen = producto$1.querySelector(".producto__imagen");
const thumbs = producto$1.querySelector(".producto__thumbs");

//COLOR
const propiedadColor = producto$1.querySelector("#propiedad-color");

//CANTIDAD
const btnIncrementar = producto$1.querySelector("#incrementar-cantidad");
const btnDisminiur = producto$1.querySelector("#disminuir-cantidad");
const inputCantidad = producto$1.querySelector("#cantidad");

thumbs.addEventListener("click", (e) => {
    if(e.target.tagName === "IMG"){
        const imagenSrc = e.target.src;
        const nombreImagen = imagenSrc.substring(imagenSrc.lastIndexOf("/") + 1);
        productoImagen.src = `./img/tennis/${nombreImagen}`;
    }
});

propiedadColor.addEventListener("click", (e) =>{
    if(e.target.tagName === "INPUT"){
        productoImagen.src = `./img/tennis/${e.target.value}.jpg`;
    }
});

btnIncrementar.addEventListener("click", (e) => {
    inputCantidad.value = parseInt(inputCantidad.value) + 1;
});

btnDisminiur.addEventListener("click", (e) => {
    if(parseInt(inputCantidad.value) > 1){
        inputCantidad.value = parseInt(inputCantidad.value) - 1;
    }
});

var data = {
    productos: [
        {
            id: "1",
            nombre: "Tennis Converse",
            descripcion: "aaaaaaaaaaaaaaaaaaaaaaaaa",
            precio: 500,
            colores: ["negro", "rojo", "amarillo"],
            tamanos: ["1.5","2","2.5","3","4"],
        }
    ]
};

const btnAbrirCarrito = document.querySelectorAll("[data-accion='abrir-carrito']");
const btnCerrarCarrito = document.querySelectorAll("[data-accion='cerrar-carrito']");
const ventanaCarrito = document.getElementById("carrito");
const btnAgregarCarrito = document.getElementById("agregar-al-carrito");
const btnComprar = document.getElementById("carrito__btn-comprar");
const producto = document.getElementById("producto");
const notificacion = document.getElementById("notificacion");
let carrito = [];
const formatearMoneda = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });

const renderCarrito = () => {
    ventanaCarrito.classList.add("carrito--active");

    // Eliminamos los productos anteriores para construir el carrito desde cero
    const productosAnteriores = ventanaCarrito.querySelectorAll(".carrito__body .carrito__producto");
    productosAnteriores.forEach((item) => item.remove());

    let total = 0;

    
    if (carrito.length < 1) {
        ventanaCarrito.classList.add("carrito--vacio");
    } else {
        ventanaCarrito.classList.remove("carrito--vacio");

        carrito.forEach((productoCarrito) => {
            
            data.productos.forEach((productoBaseDatos) => {
                if (productoCarrito.id === productoBaseDatos.id) {
                    productoCarrito.precio = productoBaseDatos.precio;
                    total += productoCarrito.precio * productoCarrito.cantidad;
                }
            });

            
            let thumbSrc = producto.querySelectorAll(".producto__thumb-img")[0].src;
            if (productoCarrito.color === "rojo") {
                thumbSrc = "./img/thumbs/rojo.jpg";
            } else if (productoCarrito.color === "amarillo") {
                thumbSrc = "./img/thumbs/amarillo.jpg";
            }

            // Plantilla HTML del producto
            const plantillaProducto = `
                <div class="carrito__producto-info">
                    <img src="${thumbSrc}" alt="" class="carrito__thumb" />
                    <div>
                        <p class="carrito__producto-nombre">
                            <span class="carrito__producto-cantidad">${productoCarrito.cantidad} x </span>${productoCarrito.nombre}
                        </p>
                        <p class="carrito__producto-propiedades">
                            Tamaño:<span>${productoCarrito.tamano}</span>
                            Color:<span>${productoCarrito.color}</span>
                        </p>
                    </div>
                </div>
                <div class="carrito__producto-contenedor-precio">
                    <button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                        </svg>
                    </button>
                    <p class="carrito__producto-precio">${formatearMoneda.format(productoCarrito.precio * productoCarrito.cantidad)}</p>
                </div>
            `;

            // Creamos el elemento, le damos la plantilla y lo agregamos al carrito
            const itemCarrito = document.createElement("div");
            itemCarrito.classList.add("carrito__producto");
            itemCarrito.innerHTML = plantillaProducto;
            ventanaCarrito.querySelector(".carrito__body").appendChild(itemCarrito);
        });
    }

    ventanaCarrito.querySelector(".carrito__total").innerText = formatearMoneda.format(total);
};

//abrir carrito
btnAbrirCarrito.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        renderCarrito();
    });
});

//cerrar carrito
btnCerrarCarrito.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        ventanaCarrito.classList.remove("carrito--active");
    });
});

//agregar carrito
btnAgregarCarrito.addEventListener("click", (e) => {
    const id = producto.dataset.productoId;
    const cantidad = parseInt(producto.querySelector("#cantidad").value);
    const nombre = producto.querySelector(".producto__nombre").innerText;
    const color = producto.querySelector("#propiedad-color input:checked").value;
    const tamano = producto.querySelector("#propiedad-tamaño input:checked").value;

    const itemExistente = carrito.find(
        (item) => item.id === id && item.nombre === nombre && item.color === color && item.tamano === tamano
    );

    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            id: id,
            nombre: nombre,
            cantidad: cantidad,
            color: color,
            tamano: tamano,
        });
    }

    
    let thumbSrc = producto.querySelectorAll(".producto__thumb-img")[0].src;
    if (color === "rojo") {
        thumbSrc = "./img/thumbs/rojo.jpg";
    } else if (color === "amarillo") {
        thumbSrc = "./img/thumbs/amarillo.jpg";
    }

    notificacion.querySelector("img").src = thumbSrc;
    notificacion.classList.add("notificacion--active");
    // Después de 5 segundos la ocultamos
    setTimeout(() => notificacion.classList.remove("notificacion--active"), 5000);
});

// Botón eliminar del carrito
ventanaCarrito.addEventListener("click", (e) => {
    // closest por si e.target es el svg o el path
    if (e.target.closest("button")?.dataset.accion === "eliminar-item-carrito") {
        const itemDOM = e.target.closest(".carrito__producto");
        const indice = [...ventanaCarrito.querySelectorAll(".carrito__producto")].indexOf(itemDOM);

        carrito = carrito.filter((item, index) => index !== indice);

        renderCarrito();
    }
});

btnComprar.addEventListener("click", () => {
    console.log("Enviando petición de compra!");
    console.log(carrito);
});

// Creamos una instancia de Tabs
new Tabs("mas-informacion");
