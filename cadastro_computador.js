function cancelarCadastroComputador(){
    window.location.href = "perfil_operador.html";
}

 function cadastrarComputador(){
    var inputCodigoConnector = document.getElementById("inputCodigoConnector").value;
    var txtDescricao = document.getElementById("txtDescricao").value;
    var msgSolicitacao = {
    	//numSerie: parseInt(inputNumSerieComputador),
      descricao: txtDescricao,
    	conectorRede: inputCodigoConnector
    }
    var cabecalho = {
        method : 'PUT',
        body : JSON.stringify(msgSolicitacao),
        headers : {
            'Content-type':'application/json'
        }
    }
    fetch("http://localhost:8080/computador/novo", cabecalho)
       .then(res => res.json())
       .then(res => adicionarComputador(res));
}

function adicionarComputador(res){
    console.log("Entrou aqui")
    alert("Cadastro com sucesso")
    fetch("http://localhost:8080/computador/"+res.computador.numSerie)
       .then(res2 => res2.json())
       .then(res2 => window.location="perfil_operador.html")
       .then(alert("Computador cadastrado com sucesso"))
       .catch(err => alert("Erro ao cadastrar usuario"));
}