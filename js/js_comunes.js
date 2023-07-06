const btnCerrar = document.querySelector(".boton-cierre");
const popup = document.querySelector(".popup-compra");
const btnCarrito = document.querySelector(".carrito");
const btnCompra = document.querySelector('.bn-comprar');
const btnReiniCompra = document.querySelector('.boton-reinicio-compras');

btnCarrito.addEventListener("click", ()=>{
    popup.classList.remove("d-none");
});

btnCerrar.addEventListener("click", ()=>{
    popup.classList.add("d-none");
});

btnReiniCompra.addEventListener("click", ()=>{
    sessionStorage.clear();
    imprimirCompras();
});

window.onload = function () {
    imprimirCompras();
};

function imprimirCompras() {
    let listaCompras = JSON.parse(sessionStorage.getItem('compras'));
    if (listaCompras != null) {
        let contenedorCompras = document.querySelector('#items-carrito');
        let total = document.querySelector('.monto-total');
        let totalCalculado = 0;
        let nroCarrito = document.querySelector('.numero-carrito');
        let cantCompras = 0;
        contenedorCompras.innerHTML = '';
        listaCompras.forEach((curso) => {
            let contenedor = document.createElement('div');
            let nombreCurso = document.createElement('p');
            let subtotal = document.createElement('p');
            nombreCurso.appendChild(document.createTextNode(curso.curso));
            subtotal.appendChild(document.createTextNode('$' + curso.subtotal + '.-'));
            contenedor.appendChild(nombreCurso);
            contenedor.appendChild(subtotal);
            contenedorCompras.appendChild(contenedor);
            totalCalculado += curso.subtotal;
            cantCompras++;
        });
        total.innerHTML = '$' + totalCalculado + '.-';
        nroCarrito.innerHTML = cantCompras;
        if (cantCompras != 0 && nroCarrito.classList.contains('d-none')) {
            nroCarrito.classList.toggle('d-none');
        }
    } else {
        let contenedorCompras = document.querySelector('#items-carrito');
        contenedorCompras.innerHTML = '';
        let nroCarrito = document.querySelector('.numero-carrito');
        nroCarrito.classList.add('d-none');
        let total = document.querySelector('.monto-total');
        total.innerHTML = '$000.-';
    }
}