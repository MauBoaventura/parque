//Sempre que houver mudança no id: input-2
var fechar = document.querySelectorAll('.close');

$("#input-2").change(function () {
    if (document.getElementById('input-2').files.length == 0) {
        // removeTudo()
    } else {
        atualizaEvento();
        // atualizaClose()                                                             .
    }

});

async function atualizaEvento() {
    const ids = new Array();

    var imagem = document.getElementById("imagem");

    removeTudo()
    var imagens = document.getElementById('input-2')

    //Insere a imagem e pega o ID
    for (let index = 0; index < imagens.files.length; index++) {
        var formData = new FormData();
        const file = imagens.files[index]
        formData.append("imagem", file);
        formData.append("id", document.getElementsByName('id')[0].value);
        var algo = await axios.post('/admin/insertimgevento', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        ids.push(algo.data)
    }


    for (let index = 0; index < imagens.files.length; index++) {
        var div = document.createElement('div')
        setAttributes(div, { 'class': 'col mt-2', 'id': ids[index] })
        div.innerHTML = "<button type=\"button\" class=\"close\" aria-label=\"Fechar\"> <span aria-hidden=\"true\">&times;</span></button>"

        var img = document.createElement('img')
        setAttributes(img, { 'class': 'rounded img-fluid', 'alt': "Imagem responsiva", 'src': window.URL.createObjectURL(imagens.files[index]) })
        div.appendChild(img);

        imagem.appendChild(div);
    }

    atualizaClose()
}

//Coloca todos os atributos no Element
function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

//Limpa apenas as imagens preview
function removeTudo() {
    var close = document.getElementsByClassName('close')
    for (i = close.length - 1; i >= 0; i--) {
        if (close[i].parentElement.id > 0) {
            close[i].parentElement.remove()
        }
    }
}

function addClose(item) {
    console.log(item.parentElement.getAttribute('id'))
    axios.post('/admin/deleteimg/' + item.parentElement.getAttribute('id'))
        .then(response => console.log(response))
        .catch(error => console.log(error))

    item.parentElement.remove()
    // atualizaClose()
}
// var iterado = ''
// var closeItem = () => addClose(iterado)


function atualizaClose() {
    fechar = document.querySelectorAll('.close');
    fechar.forEach(function (item) {
        // iterado = item
        // item.removeEventListener('click', closeItem, false);
        item.addEventListener('click', () => addClose(item));
    });

}
atualizaClose()

$('#formularioEvento').submit((evt) => {
    fechar.forEach(function (item) {
        console.log(
            item.parentElement.getAttribute('id')
        )
    })

    // evt.preventDefault();
})
