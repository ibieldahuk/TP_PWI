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

function definirSubtotal(curso) {
    let subtotal = 0;
    switch (curso) {
        case 'HTML':
            subtotal = 50000;
            break;
        case 'CSS':
            subtotal = 25000;
            break;
        case 'JavaScript':
            subtotal = 90000;
            break;
        case 'PHP':
            subtotal = 10000;
            break;
        case 'MySQL':
            subtotal = 60000;
            break;
        case 'Java':
            subtotal = 120000;
            break;
    }
    return subtotal;
}

function guardarCompra(cursoSelec) {
    let listaCompras = JSON.parse(sessionStorage.getItem('compras'));
    if (listaCompras != null) {
        let elCursoYaExiste = false;
        listaCompras.forEach((compra) => {
            if (cursoSelec == compra.curso) {
                elCursoYaExiste = true;
                compra.subtotal += definirSubtotal(cursoSelec)
            }
        });
        if (!elCursoYaExiste) {
            let compra = {
                curso : cursoSelec,
                subtotal : definirSubtotal(cursoSelec)
            };
            listaCompras.push(compra);
        }
    } else {
        let compra = {
            curso : cursoSelec,
            subtotal : definirSubtotal(cursoSelec)
        };
        listaCompras = [compra];
    }
    sessionStorage.setItem('compras', JSON.stringify(listaCompras));
    imprimirCompras();
}

window.addEventListener('load', function () {
    let btnsCompra = document.querySelectorAll('.compra');
    btnsCompra.forEach((btn) => {
        btn.addEventListener('click', function () {
            let curso = this.parentElement.querySelector('.nombre').innerHTML;
            guardarCompra(curso);
        });
    });
});