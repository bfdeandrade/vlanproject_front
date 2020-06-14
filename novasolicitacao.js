function logout(){
    localStorage.removeItem("userVlan");
    window.location = "login.html";
}
function cancelarSolicitacao(){
  var user = JSON.parse(localStorage.getItem("userVlan"));
  if(user.operador == true){
    window.location = "perfil_operador.html";

  } else{
    window.location = "perfil.html"
  }
}
function preencherDeptos(){

    fetch("http://localhost:8080/departamentos")
       .then(res => res.json())
       .then(res => criaOptions(res));
}



function criaOptions(res){
    var strOption = "";
    for (i=0;i<res.length; i++){
        strOption = strOption + 
              '<option value="'+res[i].id+'">'+res[i].nome+'/'+res[i].unidade+'</option>';
    }
    document.getElementById("txtNovoDepto").innerHTML = strOption;
}   

function enviarSolicitacao(){
    var txtData = document.getElementById("txtData").value;
    var txtJustificativa = document.getElementById("txtJustificativa").value;
    var txtNovoDepto = document.getElementById("txtNovoDepto").selectedOptions[0].value;
    var user = JSON.parse(localStorage.getItem("userVlan"));

    var msgSolicitacao = {
        dataSolicitacao : txtData,
        justificativa : txtJustificativa,
        comandoRoteador : "",
        solicitante : {
            id : user.id
        },
        origem : {
            id : user.departamento.id
        },
        destino : {
            id: parseInt(txtNovoDepto)
        }
    }

    var cabecalho = {
        method : 'POST',
        body : JSON.stringify(msgSolicitacao),
        headers : {
            'Content-type':'application/json'
        }
    }

    fetch("http://localhost:8080/solicitacoes/nova", cabecalho)
       .then(res => res.json())
       .then(res => atualizaUser(res,user));
       //.catch(err => alert("Cadastro realizado com sucesso"));
}

function atualizaUser(res,user){
    console.log(user)
    if(user.operador == false ){
    fetch("http://localhost:8080/usuario/"+res.solicitante.id)
       .then(res2 => res2.json())
       .then(res2 => localStorage.setItem("userVlan",JSON.stringify(res2)))
       .then(res2 => window.location="perfil.html")
       .catch(err => alert("Erro ao atualizar usuario"));
    } else {
        fetch("http://localhost:8080/usuario/"+res.solicitante.id)
       .then(res2 => res2.json())
       .then(res2 => localStorage.setItem("userVlan",JSON.stringify(res2)))
       .then(res2 => window.location="perfil_operador.html")
       .catch(err => alert("Erro ao atualizar usuario"));
    }
    }

    
     
