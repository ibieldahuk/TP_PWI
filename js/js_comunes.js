const btnCerrar = document.querySelector(".boton-cierre");
const popup = document.querySelector(".popup-compra");
const btnCarrito = document.querySelector(".carrito");

btnCarrito.addEventListener("click", ()=>{
    popup.classList.remove("d-none");
});

btnCerrar.addEventListener("click", ()=>{
    popup.classList.add("d-none");
});
