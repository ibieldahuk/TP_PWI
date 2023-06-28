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
    document.querySelector('#inscribirse').addEventListener('click', guardarCompra);
});

function guardarCompra() {
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
    imprimirCompras();
}

function validarForm() {
    let regexNombreApellido = /^[a-zA-Z]+$/;
    let regexDni = /^[0-9]$/;
    let regexNumero = /^(?:\d{4}-)?\d{4}$/;
    let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let mensajeError = '';
    let error = false;
    let selecCurso = document.getElementsByName('selec_curso');
    let seleccion = false;
    selecCurso.forEach((radioIn) => {
        if (radioIn.checked) {
            seleccion = true;
        }
    });
    if (!seleccion) {
        mensajeError += 'Debe seleccionar algún curso<br>';
        error = true;
    }
    let lineasForm = document.querySelectorAll('.linea_inscripcion');
    let nombres = [];
    let apellidos = [];
    let dnis = [];
    let emails = [];
    let telefonos = [];
    lineasForm.forEach((linea) => {
        nombres.push(linea.querySelector('input[name="nombre"]'));
        apellidos.push(linea.querySelector('input[name="apellido"]'));
        dnis.push(linea.querySelector('input[name="dni"]'));
        emails.push(linea.querySelector('input[name="email"]'));
        telefonos.push(linea.querySelector('input[name="telefono"]'));
    });

    let nombreEstaOk = true;
    nombres.forEach((elemento) => {
        valor = elemento.value
        if (!regexNombreApellido.test(valor)) {
            nombreEstaOk = false;
        }
    });
    if (!nombreEstaOk) {
        error = true;
        mensajeError += '<p>El nombre no es válido</p>';
    }

    let apellidoEstaOk = true;
    apellidos.forEach((elemento) => {
        valor = elemento.value
        if (!regexNombreApellido.test(valor)) {
            apellidoEstaOk = false;
        }
    });
    if (!apellidoEstaOk) {
        error = true;
        mensajeError += '<p>El apellido no es válido</p>';
    }

    let dniEstaOk = true;
    dnis.forEach((elemento) => {
        valor = elemento.value
        if (!regexDni.test(valor)) {
            dniEstaOk = false;
        }
    });
    if (!dniEstaOk) {
        error = true;
        mensajeError += '<p>El dni no es válido</p>';
    }

    let emailEstaOk = true;
    emails.forEach((elemento) => {
        valor = elemento.value
        if (!regexEmail.test(valor)) {
            emailEstaOk = false;
        }
    });
    if (!emailEstaOk) {
        error = true;
        mensajeError += '<p>El email no es válido</p>';
    }

    let telefonoEstaOk = true;
    telefonos.forEach((elemento) => {
        valor = elemento.value
        if (!regexNumero.test(valor)) {
            telefonoEstaOk = false;
        }
    });
    if (!telefonoEstaOk) {
        error = true;
        mensajeError += '<p>El telefono no es válido</p>';
    }

    document.querySelector('#mensaje-error').innerHTML = mensajeError;
    return !error;
}