const btnCerrar = document.querySelector(".boton-cierre");
const popup = document.querySelector(".popup-compra");
const btnCarrito = document.querySelector(".carrito");

btnCarrito.addEventListener("click", ()=>{
    popup.classList.remove("d-none");
});

btnCerrar.addEventListener("click", ()=>{
    popup.classList.add("d-none");
});

//CUANDO SE GARGA LA PÁGINA
window.onload = function () {
    mostrarNroCarrito();
};

function mostrarNroCarrito () {    
    //ASUMO QUE EL NÚMERO DE CARRITO ESTÁ EN DISPLAY:NONE
    //CHEQUEO SI HAY UN NÚMERO DE COMPRAS GUARDADO EN LOCALSTORAGE
    if (sessionStorage.getItem('nroCompras') != null) {
        let nroCarrito = document.querySelector('.numero-carrito');
        //ASUMO QUE EL NÚMERO DE CARRITO NO EXISTE YA QUE RECIÉN SE CARGÓ LA PÁGINA
        //ASIGNO EL NÚMERO DE COMPRAS AL NÚMERO DEL CARRITO
        nroCarrito.innerHTML = sessionStorage.getItem('nroCompras');
        //LE CAMBIO LA PROPIEDAD DISPLAY ASÍ SE VE
        nroCarrito.classList.toggle('d-none');
    }
}