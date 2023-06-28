let contadorID = 1;

document.querySelector('#agregar_persona').addEventListener('click', function () {
    contadorID++;
    //DIV
    let nodoDiv = document.createElement('div');
    nodoDiv.setAttribute('class', 'linea_inscripcion');
    nodoDiv.setAttribute('id', 'linea_inscripcion_' + contadorID);
    //INPUTS
    let nodoInNombre = document.createElement('input');
    nodoInNombre.setAttribute('type', 'text');
    nodoInNombre.setAttribute('name', 'nombre');
    nodoInNombre.setAttribute('placeholder', 'Nombre');
    let nodoInApellido = document.createElement('input');
    nodoInApellido.setAttribute('type', 'text');
    nodoInApellido.setAttribute('name', 'apellido');
    nodoInApellido.setAttribute('placeholder', 'Apellido');
    let nodoInDNI = document.createElement('input');
    nodoInDNI.setAttribute('type', 'text');
    nodoInDNI.setAttribute('name', 'dni');
    nodoInDNI.setAttribute('placeholder', 'DNI');
    let nodoInEMail = document.createElement('input');
    nodoInEMail.setAttribute('type', 'email');
    nodoInEMail.setAttribute('name', 'email');
    nodoInEMail.setAttribute('placeholder', 'E-Mail');
    let nodoInTel = document.createElement('input');
    nodoInTel.setAttribute('type', 'tel');
    nodoInTel.setAttribute('name', 'telefono');
    nodoInTel.setAttribute('placeholder', 'Teléfono');
    let nodoInBtn = document.createElement('input');
    nodoInBtn.setAttribute('type', 'button');
    nodoInBtn.setAttribute('class', 'eliminar_persona');
    nodoInBtn.setAttribute('value', '-');
    nodoInBtn.setAttribute('onClick', 'eliminarLinea(' + contadorID + ')');
    //APPENDS
    nodoDiv.appendChild(nodoInNombre);
    nodoDiv.appendChild(nodoInApellido);
    nodoDiv.appendChild(nodoInDNI);
    nodoDiv.appendChild(nodoInEMail);
    nodoDiv.appendChild(nodoInTel);
    nodoDiv.appendChild(nodoInBtn);
    document.querySelector('#formulario_inscripcion').appendChild(nodoDiv);
});

document.querySelector('#agregar_persona').addEventListener('click', calcularMonto);

document.getElementsByName('selec_curso').forEach((item) => {
    item.addEventListener('change', function () {
        calcularMonto();
    })
});

function eliminarLinea(id) {
    document.querySelector('#linea_inscripcion_' + id).remove();
    calcularMonto();
}

function borrarDatos() {
    document.querySelector('#linea_inscripcion_1').childNodes.forEach((item) => {
        if (item.type == 'text' || item.type == 'email' || item.type == 'tel') {
            item.value = '';
        }
    });
}

function definirCursoSeleccionado() {
    let curso = ''
    document.getElementsByName('selec_curso').forEach((item) => {
        if (item.checked) {
            curso = item.value;
        }
    });
    return curso;
}

function definirSubtotal(curso) {
    let subtotal = 0;
    switch (curso) {
        case 'html':
            subtotal = 50000;
            break;
        case 'css':
            subtotal = 25000;
            break;
        case 'js':
            subtotal = 90000;
            break;
        case 'php':
            subtotal = 10000;
            break;
        case 'mysql':
            subtotal = 60000;
            break;
        case 'java':
            subtotal = 120000;
            break;
    }
    return subtotal;
}

function calcularMonto() {
    let curso = definirCursoSeleccionado();
    let subtotal = definirSubtotal(curso);
    let cantidadInscriptos = document.querySelectorAll('.linea_inscripcion').length;
    let total = subtotal * cantidadInscriptos;
    document.querySelector('#monto').innerHTML = '$' + total + '.-';
}
window.addEventListener('load', function () {
    document.querySelector('#inscribirse').addEventListener('click', guardarCompra3);
});

function guardarCompra() {
    let nroCarrito = document.querySelector('.numero-carrito');
    //SI NO EXISTÍA NINGÚN VALOR DE CURSOS INSCRIPTOS
    if (isNaN(sessionStorage.getItem('nroCompras')) || sessionStorage.getItem('nroCompras') == null) {
        //LE SUMO UNO (1) AL NÚMERO DE INSCRIPCIONES
        sessionStorage.setItem('nroCompras', 1);
        //AGREGO EL NÚMERO DE INSCRIPCIONES AL NÚMERO DEL CARRITO
        nroCarrito.innerHTML = sessionStorage.getItem('nroCompras');
        //LE SACO EL DISPLAY:NONE AL CSS PARA QUE SE VEA
        nroCarrito.classList.toggle('d-none');
    //SI SÍ EXISTÍA UN VALOR DE CURSOS INSCRIPTOS
    } else {
        //LE SUMO UNO AL NÚMERO DE INSCRIPTOS
        sessionStorage.setItem('nroCompras', parseInt(sessionStorage.getItem('nroCompras')) + 1);
        //ACTUALIZO EL NÚMERO DEL CARRITO
        nroCarrito.innerHTML = sessionStorage.getItem('nroCompras');
    }
}

function guardarCompra3() {
    let cantLineas = document.querySelectorAll('.linea_inscripcion').length;
    let cursoSelec = definirCursoSeleccionado();
    let listaCompras = JSON.parse(sessionStorage.getItem('compras'));

    if (listaCompras != null) {
        let elCursoYaExiste = false;
        listaCompras.forEach((compra) => {
            if (cursoSelec == compra.curso) {
                elCursoYaExiste = true;
                compra.cantidad += cantLineas;
                compra.subtotal += definirSubtotal(cursoSelec) * cantLineas
            }
        });
        if (!elCursoYaExiste) {
            let compra = {
                curso : cursoSelec,
                cantidad : cantLineas,
                subtotal : definirSubtotal(cursoSelec) * cantLineas
            };
            listaCompras.push(compra);
        }
    } else {
        let compra = {
            curso : cursoSelec,
            cantidad : cantLineas,
            subtotal : definirSubtotal(cursoSelec) * cantLineas
        };
        listaCompras = [compra];
    }

    sessionStorage.setItem('compras', JSON.stringify(listaCompras));

    /////////////////////////////
    imprimirCompras();
    /////////////////////////////
}

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
            let cantidad = document.createElement('p');
            let subtotal = document.createElement('p');
            nombreCurso.appendChild(document.createTextNode(curso.curso));
            cantidad.appendChild(document.createTextNode('x' + curso.cantidad));
            subtotal.appendChild(document.createTextNode('$' + curso.subtotal + '.-'));
            contenedor.appendChild(nombreCurso);
            contenedor.appendChild(cantidad);
            contenedor.appendChild(subtotal);
            contenedorCompras.appendChild(contenedor);
            totalCalculado += curso.subtotal;
            cantCompras++;
        });
        total.innerHTML = '$' + totalCalculado + '.-';
        nroCarrito.innerHTML = cantCompras;
        nroCarrito.classList.toggle('d-none');
    }
}

function guardarCompra2() {
    imprimirCompras();
    // let nombre_recivido = document.querySelector('#nombre').value;
    // let apellido_recivido = document.querySelector('#apellido').value;
    // let dni_recivido = document.querySelector('#dni').value;
    // let email_recivido = document.querySelector('#email').value;
    // let telefono_recivido = document.querySelector('#telefono').value;
    // let curso_recivido = definirCursoSeleccionado();
    // // let listaCompras = {
    // //     nombre : nombre_recivido,
    // //     apellido : apellido_recivido,
    // //     dni : dni_recivido,
    // //     email : email_recivido,
    // //     telefono : telefono_recivido,
    // //     curso : curso_recivido
    // // };
    // let nombre = document.createElement('p');
    // let apellido = document.createElement('p');
    // let dni = document.createElement('p');
    // let email = document.createElement('p');
    // let telefono = document.createElement('p');
    // let curso = document.createElement('p');
    // let tNombre = document.createTextNode(nombre_recivido);
    // let tApellido = document.createTextNode(apellido_recivido);
    // let tDni = document.createTextNode(dni_recivido);
    // let tEmail = document.createTextNode(email_recivido);
    // let tTelefono = document.createTextNode(telefono_recivido);
    // let tCurso = document.createTextNode(curso_recivido);
    // nombre.appendChild(tNombre);
    // apellido.appendChild(tApellido);
    // dni.appendChild(tDni);
    // email.appendChild(tEmail);
    // telefono.appendChild(tTelefono);
    // curso.appendChild(tCurso);
    // let padre = document.querySelector('#items-carrito');
    // padre.appendChild(nombre);
    // padre.appendChild(apellido);
    // padre.appendChild(dni);
    // padre.appendChild(email);
    // padre.appendChild(telefono);
    // padre.appendChild(curso);
}

//CUANDO SE GARGA LA PÁGINA
// window.onload = function () {
//     mostrarNroCarrito();
// };

//function actualizarNroCarrito () {
//}

// function mostrarNroCarrito () {    
//     //ASUMO QUE EL NÚMERO DE CARRITO ESTÁ EN DISPLAY:NONE
//     //CHEQUEO SI HAY UN NÚMERO DE COMPRAS GUARDADO EN LOCALSTORAGE
//     console.log(window.localStorage.getItem('nroCompras'))
//     if (window.localStorage.getItem('nroCompras') != null) {
//         let nroCarrito = document.querySelector('.numero-carrito');
//         //ASUMO QUE EL NÚMERO DE CARRITO NO EXISTE YA QUE RECIÉN SE CARGÓ LA PÁGINA
//         //ASIGNO EL NÚMERO DE COMPRAS AL NÚMERO DEL CARRITO
//         nroCarrito.innerHTML = window.localStorage.getItem('nroCompras');
//         //LE CAMBIO LA PROPIEDAD DISPLAY ASÍ SE VE
//         nroCarrito.classList.toggle('d-none');
//     }
// }