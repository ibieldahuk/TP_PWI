const color = document.getElementsByName("color");
const vistaPrevia = document.querySelector(".previsualizacion");
const tamanio = document.getElementsByName("tamanio");
const texto = document.getElementById("destinatario");
const nombre = document.querySelector("#nombre");
const precio = document.querySelector(".precio");
const monto = document.querySelector("#monto");
const fondos = document.getElementsByName("imagen-grad");
const posicion = document.getElementsByName("pos");
const enviar = document.querySelector(".boton-enviar");
const cerrar = document.querySelector(".boton-cancelar");
const confirmar = document.querySelector("#boton-confirmar");
// const popup = document.querySelector(".popup");
// const preguntaPop = document.querySelector(".pregunta-popup");
// const formPop = document.querySelector(".formulario-popup");
const enviado = document.querySelector(".enviado");

//Inicio de la creacion de la giftcard
color.forEach((item)=>{
    item.addEventListener("click", ()=>{
        vistaPrevia.classList.remove("rojo", "verde", "azul", "amarillo", "naranja");
        if(item.checked){
            vistaPrevia.classList.add(`${item.value}`);
        }
    });
});

tamanio.forEach((item)=>{
    item.addEventListener("click", ()=>{
        vistaPrevia.classList.remove("veinte", "veintiocho", "treintidos", "cuarentiocho", "sesenta");
        if(item.checked){
            vistaPrevia.classList.add(`${item.value}`);
        }
    });
});

nombre.addEventListener("keyup", ()=>{
    texto.innerHTML = nombre.value;
});

monto.addEventListener("keyup", ()=>{
    precio.innerHTML = (`$${monto.value}.-`);
});

fondos.forEach((item)=>{
    item.addEventListener("click", ()=>{
        vistaPrevia.classList.remove("celeste", "rosita", "verdoso", "violetoso", "vino");
        if(item.checked){
            vistaPrevia.classList.add(`${item.value}`);
        }
    });
});

posicion.forEach((item) => {
    item.addEventListener("click", () => {
      precio.classList.remove("pos1", "pos2", "pos3");
      precio.classList.add(item.value);
    });
  });
//fin de la creacion de la giftcard


//boton confirmacion de gc
// confirmar.addEventListener("click", (e)=>{
//     e.preventDefault();
//     popup.classList.remove("d-none");
// });

// //botones para cerrar y enviar el popup
// cerrar.addEventListener("click", (e)=>{
//     e.preventDefault();
//     popup.classList.add("d-none");
// });

enviar.addEventListener("click", (e)=>{
    e.preventDefault();
    validar();
});


//validacion de mail
function validar(){
    let regexEmail = /^[0-9a-zA-Z._.-]+\@[0-9a-zA-Z._.-]+\.[0-9a-zA-Z]+$/;
    let mail = document.querySelector("#email").value;
    let error = false;
    let mensaje = "";


    if(!regexEmail.test(mail)){
        error = true;
        mensaje += "<p>Ingrese un mail válido</p>";
    }

    if(error){
        document.getElementById("mensaje").innerHTML = mensaje;
    }else {
        formPop.submit();
    }
};