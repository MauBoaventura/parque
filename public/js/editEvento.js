//Sempre que houver mudança no id: input-2
$("#input-2").change(function () {
    atualiza();
});


function atualiza() {
    var ul = document.getElementById("listImg");
    var imagem = document.getElementById("imagem");

    //Limpa a lista
    var filhos = ul.childNodes;
    for (i = filhos.length - 1; i >= 0; i--) {
        if (filhos[i].tagName == 'LI') {
            ul.removeChild(filhos[i]);
        }
    }

    var imagens = document.getElementsByName('eventoimg')[0]

    console.log(imagens.files.length)

    for (let index = 0; index < imagens.files.length; index++) {
        var li = document.createElement('li');
        li.innerHTML = imagens.files[index].name;
        ul.appendChild(li);

        var div = document.createElement('div')
        setAttributes(div, { 'class': 'col mt-2' })
        div.innerHTML = "<button type=\"button\" class=\"close\" aria-label=\"Fechar\"> <span aria-hidden=\"true\">&times;</span></button>"

        var img = document.createElement('img')
        setAttributes(img, { 'class': 'rounded img-fluid', 'alt': "Imagem responsiva", 'src': window.URL.createObjectURL(imagens.files[index]) })
        div.appendChild(img);

        imagem.appendChild(div);
    }
}
function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}
