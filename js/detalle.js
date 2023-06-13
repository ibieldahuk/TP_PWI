function mostrarOcultar(idLista, idBtn) {
    let estado = document.getElementById(idBtn).innerHTML;
    if (estado == 'expand_less') {
        document.getElementById(idLista).style.display = 'none';
        document.getElementById(idBtn).innerHTML = 'expand_more';
    } else if (estado == 'expand_more') {
        document.getElementById(idLista).style.display = 'block';
        document.getElementById(idBtn).innerHTML = 'expand_less';
    }
}