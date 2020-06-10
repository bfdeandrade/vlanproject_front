var contador=0;

function mudaTexto(){
    document.getElementById("titulo").innerHTML = "Cliquei "+contador+" vezes";
    contador++;

}

function buscarUsuarios(){

    fetch("http://localhost:8080/usuarios")
       .then(resultado => resultado.json())
       .then(resultado => preencheLinhas(resultado));
}


function preencheLinhas(lista){
    var texto = "";
    var usuario;
    for (i=0; i<lista.length; i++){
        usuario = lista[i];
        texto = texto + "Nome: "+usuario.nome+"("+usuario.email+")"+"<br>";
    }
    document.getElementById("resultado").innerHTML = texto;
}