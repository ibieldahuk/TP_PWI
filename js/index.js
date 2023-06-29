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

window.onload = function () {
    // console.log('ok');
    let btnsCompra = document.querySelectorAll('.compra');
    btnsCompra.forEach((btn) => {
        btn.addEventListener('click', function () {
            // console.log(this.parentElement.querySelector('.nombre').innerHTML);
            let curso = this.parentElement.querySelector('.nombre').innerHTML;
            guardarCompra(curso);
            console.log(sessionStorage.getItem('compras'));
        });
    });
};

$(document).ready(function(){
    $(document.querySelector('.slider')).slick({
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
        });
   });
   $(document.querySelector('.medios_de_pago')).slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
});