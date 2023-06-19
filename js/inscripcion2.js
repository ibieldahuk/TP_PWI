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

function eliminarLinea(id) {
    document.querySelector('#linea_inscripcion_' + id).remove();
}