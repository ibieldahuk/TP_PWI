const agregarPersona = document.getElementById("agregar-persona");
const botonesSuprimir = document.querySelectorAll("#suprimir");
let lineaInscripcion = document.querySelector('.linea-inscripcion');
let montoTotal = document.querySelector("#monto");
const inscribirse = document.querySelector("#inscribirse");
let personas = 1;
let botones = document.querySelectorAll(".opciones");
let btnsEliminarPersona = document.querySelectorAll(".eliminar-persona");

//AGREGAR PERSONA
agregarPersona.addEventListener("click", () => {
  var nuevaLineaInscripcion = lineaInscripcion.cloneNode(true);
  personas++;
  var inputs = nuevaLineaInscripcion.querySelectorAll('input');
  inputs.forEach(function (input) {
    input.value = '';
  });
  lineaInscripcion.parentNode.insertBefore(nuevaLineaInscripcion, null);
});

//ELIMINAR PERSONA
btnsEliminarPersona.forEach((item) => {
  item.addEventListener("click", function () {
    console.log("acá");
    this.parentNode.remove();
  });
});

function toggleClase(boton) {
  // Recorrer todos los botones y deseleccionar los que están seleccionados
  botones.forEach(function (btn) {
    if (btn !== boton && btn.classList.contains('clicked')) {
      btn.classList.remove('clicked');
    }
  });

  // Alternar la clase del botón actual
  boton.classList.toggle('clicked');
  actualizarMonto();
};

function actualizarMonto() {
  var monto = 0;
  var botonesSeleccionados = document.querySelectorAll('.opciones.clicked');
  botonesSeleccionados.forEach(function (btn) {

    switch (btn.id) {
      case 'php':
        monto += 10000;
        break;
      case 'html':
        monto += 50000;
        break;
      case 'css':
        monto += 25000;
        break;
      case 'java':
        monto += 120000;
        break;
      case 'javas':
        monto += 90000;
        break;
      case 'mysql':
        monto += 60000;
        break;
    };
  });

  montoTotal.textContent = '$' + monto + '.-';
};