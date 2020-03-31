//Sempre que houver mudança no id: input-2
var fechar = document.querySelectorAll('.close');

$("#input-2").change(function () {
    atualiza();
    if (document.getElementsByName('eventoimg')[0].files.length == 0) {
        removeTudo()
    } 
    fechar = document.querySelectorAll('.close');
    fechar.forEach(function (item) {
        item.addEventListener('click', () => (item.parentElement.remove()));

    });

});

let ids = 1
function atualiza() {
    // var ul = document.getElementById("listImg");
    var imagem = document.getElementById("imagem");

    removeTudo()
    var imagens = document.getElementsByName('eventoimg')[0]

    // console.log(imagens.files.length)

    for (let index = 0; index < imagens.files.length; index++) {
        // var li = document.createElement('li');
        // li.innerHTML = imagens.files[index].name;
        // ul.appendChild(li);

        var div = document.createElement('div')
        setAttributes(div, { 'class': 'col mt-2', 'id': ids })
        div.innerHTML = "<button type=\"button\" class=\"close\" aria-label=\"Fechar\"> <span aria-hidden=\"true\">&times;</span></button>"

        var img = document.createElement('img')
        setAttributes(img, { 'class': 'rounded img-fluid', 'alt': "Imagem responsiva", 'src': window.URL.createObjectURL(imagens.files[index]) })
        div.appendChild(img);

        ids++;
        imagem.appendChild(div);
    }
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



fechar.forEach(function (item) {
    item.addEventListener('click', () => (item.parentElement.remove()));

});


