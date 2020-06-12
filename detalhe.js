function recuperaDetalhe(){
    var parametro = window.location.search;

    console.log("link da url = "+parametro);

    var numero = parametro.substr(8);

    console.log("Agora recupererei o numero = "+numero);

    fetch("http://localhost:8080/solicitacoes/"+numero)
       .then(res => res.json())
       .then(res => console.log(res));

}