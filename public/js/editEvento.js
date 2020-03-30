//Sempre que houver mudança no id: input-2
  $("#input-2").change(function() {
    atualiza();
  });


function atualiza() {
    var ul = document.getElementById("listImg");

    //Limpa a lista
    var filhos = ul.childNodes;
    for (i = filhos.length - 1; i >= 0; i--) {
        if (filhos[i].tagName == 'li') {
            ul.removeChild(filhos[i]);
        }
    }

    var imagens = document.getElementsByName('eventoimg')[0]

    console.log(imagens.files.length)

    for (let index = 0; index < imagens.files.length; index++) {
        var li = document.createElement('li');
        li.innerHTML = imagens.files[index].name;
        ul.appendChild(li);

    }

}

function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
        $('#blah').attr('src', e.target.result);
      }
      
      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }
  
//   <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
//   <form runat="server">
//     <input type='file' id="imgInp" />
//     <img id="blah" src="#" alt="your image" />
//   </form>