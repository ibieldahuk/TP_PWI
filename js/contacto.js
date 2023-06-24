let regexNombreApellido = /^[a-zA-Z]+$/;
let regexNumero = /^[0-9]{6}+\-[0-9]{4}+$/;

let formulario = document.querySelector("#form-contacto");
let botonEnviar = document.querySelector(".boton");

formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    validar();
});

// INICIO validacion de formulario
function validar(){
    let error = false;
    let mensaje = " ";
    let telefono = document.querySelector("#telefono").value;
    let nombre = document.querySelector("#nombre").value;
    let apellido = document.querySelector("#apellido").value;
    let comentarios = document.querySelector("#comentarios").value;

    if(!regexNombreApellido.test(nombre)){
        error = true;
        mensaje += "<p>Debe ingresar letras</p>";
    }

    if(!regexNombreApellido.test(apellido)){
        error = true;
        mensaje += "<p>Debe ingresar letras</p>";
    }

    if(!regexNumero.test(telefono)){
        error = true;
        mensaje += "<p>Debe ingresar números</p>";
    }

    if(comentarios == null || comentarios.length == 0|| /^\s+$/.test(comentarios)){
        error = true;
        mensaje += "<p>Ingrese una consulta</p>";
    }

    if(error){
        document.getElementById("mensaje").innerHTML = mensaje;
    }else {
        formulario.submit();
    }
   
};
// FIN validacion de formulario

