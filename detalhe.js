var templateBio  = '<h3> <STRONG> {{NUMEROSOL}}  </STRONG></h3>'+
                   '<p> '+
				   '<strong>Data Solicitação: </strong> {{DATASOL}} <br>'+
				   '<strong>Justificativa: </strong> {{JUSTIF}} <br>'+
				   '<strong>Comando Roteador: </strong> {{COMANDROT}} <br>'+
				   '<strong>VLAN de origem: </strong> {{VLANORI}} <br>'+
				   '<strong>VLAN de destino: </strong> {{VLANDES}} <br>'+
				   '<h1><strong>Informações do Usuário</strong></h1> <br>'+
                   '<strong>RACF :</strong> {{RACF}} <br>'+
                   '<strong>EMAIL:</strong> {{EMAIL}} <br>'+
                   '<strong>DEPTO:</strong> {{DEPARTAMENTO}}'+
                   '</p>'+
				   '<h1><strong>Informações do computador</strong></h1> <br>'+
                   '<p> <STRONG> Número de série </STRONG>'+
                   '<STRONG>do Computador: </STRONG> {{NUMSERIE}} <br>'+
                   '<STRONG>Descrição:</STRONG> {{DESCRICAO}} <br>'+
                   '<STRONG>ID do Ponto de Rede<STRONG>: {{CONECTOR}} </p>';
function recuperaDetalhe(){
    var parametro = window.location.search;

    console.log("link da url = "+parametro);

    var numero = parametro.substr(8);

    console.log("Agora recupererei o numero = "+numero);

    fetch("http://localhost:8080/solicitacoes/"+numero)
       .then(res => res.json())
       .then(res => mostrarSoliticao(res));
}
function mostrarSoliticao(res){
	console.log(res.dataSolicitacao)
     // converti o texto para um objeto javascript
  // a idéia aqui é preencher as coisas
    // foto
    // bio
	console.log(user);
    var strBio = templateBio.replace("{{NOME}}", res.solicitante.nome)
                            .replace("{{RACF}}", res.solicitante.racf)
                            .replace("{{EMAIL}}", res.solicitante.email)
                            .replace("{{DEPARTAMENTO}}",res.solicitante.departamento.nome)
                            .replace("{{NUMSERIE}}",res.solicitante.computador.numSerie)
                            .replace("{{DESCRICAO}}",res.solicitante.computador.descricao)
                            .replace("{{CONECTOR}}",res.solicitante.computador.conectorRede);
                
    document.getElementById("descSol").innerHTML = strBio;

    // aqui vem a lista de solicitacoes
}