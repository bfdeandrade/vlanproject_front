function cancelarCadastroComputador(){
    window.location.href = "perfil_operador.html";
}

 function cadastrarComputador(){
    var inputNumSerieComputador = document.getElementById("inputNumSerieComputador").value;
    var inputCodigoConnector = document.getElementById("inputCodigoConnector").value;
    var txtDescricao = document.getElementById("txtDescricao").value;
    console.log(inputNumSerieComputador);
    var msgSolicitacao = {
    	//numSerie: parseInt(inputNumSerieComputador),
      descricao: txtDescricao,
    	conectorRede: inputCodigoConnector
    }

   	console.log(msgSolicitacao);
    var cabecalho = {
        method : 'PUT',
        body : JSON.stringify(msgSolicitacao),
        headers : {
            'Content-type':'application/json'
        }
    }
    console.log(cabecalho);

    fetch("http://localhost:8080/computador/novo", cabecalho)
       .then(res => res.json())
       .then(res => adicionarComputador(res));
}

function adicionarComputador(res){
    console.log(res);
    fetch("http://localhost:8080/computador/"+res.computador.numSerie)
       .then(res2 => res2.json())
       .then(res2 => window.location="perfil_operador.html")
       .then(alert("Computador cadastrado com sucesso"))
       .catch(err => alert("Erro ao cadastrar usuario"));
}