//Sempre que houver mudança no id: input-2
var fechar = document.querySelectorAll('.close');

$("#input-2").change(function () {
    atualiza();
    if (document.getElementById('input-2').files.length == 0) {
        removeTudo()
    }
    atualizaClose()

});

let ids = 1
function atualiza() {
    // var ul = document.getElementById("listImg");
    var imagem = document.getElementById("imagem");

    removeTudo()
    var imagens = document.getElementById('input-2')

    // console.log(imagens.files.length)

    for (let index = 0; index < imagens.files.length; index++) {
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


function atualizaClose() {
    fechar = document.querySelectorAll('.close');
    fechar.forEach(function (item) {
        item.addEventListener('click', () => {
            if (item.parentElement.getAttribute('id') < 100) {
                var files = document.getElementById('input-2')

            }
            item.parentElement.remove()
            atualizaClose()
        });

    });

}

atualizaClose()

$('#formularioEvento').submit((evt) => {
    fechar.forEach(function (item) {
        console.log(
            item.parentElement.getAttribute('id')
        )
    })
    // var oData = new FormData($('#formularioEvento'));
    // oData.append("CustomField", "This is some extra data");

    // var oReq = new XMLHttpRequest();
    // oReq.open("POST", "/admin/editevento", true);
    
    // oReq.send(oData)


    // evt.preventDefault();
})

// var form = document.forms.namedItem("formularioEvento");
// form.addEventListener('submit', function (ev) {

    // var oOutput = document.querySelector("div"),
    //     oData = new FormData(form);

    // oData.append("CustomField", "This is some extra data");

    // var imagens = []
    // // var aFileParts = ['<a id="a"><b id="b">hey!</b></a>'];
    // for (let index = 0; index < document.getElementById('input-2').files.length; index++) {
    //     const element = document.getElementById('input-2').files[index];
    //     imagens.push(element)
    //     console.log("\n\n" + element)
    // }

    // // var oMyBlob = oBuilder.getBlob('text/xml'); // o blob

    // var oMyBlob = new Blob(imagens, { type: "image/png" }); // o blob
    // console.log(oMyBlob)
    // oMyBlob.arrayBuffe
    // if (oMyBlob.size > 0)
    //     oData.append("eventoimg", oMyBlob);
    // oData.append("eventoimg", document.getElementById('input-2'));

    // var oReq = new XMLHttpRequest();
    // oReq.open("POST", "/admin/editevento", true);
    // oReq.onload = function (oEvent) {
    //     if (oReq.status == 200) {
    //         oOutput.innerHTML = "Uploaded!";
    //     } else {
    //         oOutput.innerHTML = "Error " + oReq.status + " occurred when trying to upload your file.<br \/>";
    //     }
    // };

    // oReq.send(oData);
//     ev.preventDefault();
//     console.log("AAAAAAAAAAAAAAAAAAAAA")
//     console.log(oData)
// }, false);