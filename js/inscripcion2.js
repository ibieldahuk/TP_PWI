let contadorID = 1;

document.querySelector('#agregar_persona').addEventListener("click", function () {
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

document.getElementsByName('selec_curso').forEach((item) => {
    item.addEventListener('change', function () {
        calcularMonto();
    })
});

function eliminarLinea(id) {
    document.querySelector('#linea_inscripcion_' + id).remove();
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
    console.log(curso + ': $' + subtotal);
    let cantidadInscriptos = document.querySelectorAll('.linea_inscripcion').length;
    let total = subtotal * cantidadInscriptos;
    document.querySelector('#monto').innerHTML = '$' + total + '.-';
}