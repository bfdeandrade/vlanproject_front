var templateFoto = '<img src="{{FOTO}}" width="100%"> ';
var templateBio  = '<h3> {{NOME}} </h3>'+
                   '<p> '+
                   '<strong>RACF :</strong> {{RACF}} <br>'+
                   '<strong>EMAIL:</strong> {{EMAIL}} <br>'+
                   '<strong>DEPTO:</strong> {{DEPARTAMENTO}}'+
                   '</p>'+
                   '<p> <STRONG> Computador </STRONG>'+
                   'Num Serie {{NUMSERIE}} <br>'+
                   'Descricao: {{DESCRICAO}} <br>'+
                   'Conector REDE: {{CONECTOR}} </p>';

var templateSol = '<div class="row">'+
                     '<div class="col-md-12">'+
                       '<a href="detalhe.html?numero={{NUMSOL}}"> ' +
                            '{{DATA}} De:{{ORIGEM}} / Para:{{DESTINO}}'+  
                        '</a>'+
                     '</div>'+
                  '</div>';


function mostrarPerfil(){
    var userTxt = localStorage.getItem("userVlan");
    if (!userTxt){
        window.location = "login.html";  // não tenho o "token", vou pro index
    }

    var user = JSON.parse(userTxt); // converti o texto para um objeto javascript

    // a idéia aqui é preencher as coisas

    // foto
    var strFoto = templateFoto.replace("{{FOTO}}",user.linkFoto);
    document.getElementById("fotoUser").innerHTML = strFoto;

    // bio
    var strBio = templateBio.replace("{{NOME}}", user.nome)
                            .replace("{{RACF}}", user.racf)
                            .replace("{{EMAIL}}", user.email)
                            .replace("{{DEPARTAMENTO}}",user.departamento.nome)
                            .replace("{{NUMSERIE}}",user.computador.numSerie)
                            .replace("{{DESCRICAO}}",user.computador.descricao)
                            .replace("{{CONECTOR}}",user.computador.conectorRede);
                
    document.getElementById("bioUser").innerHTML = strBio;

    // aqui vem a lista de solicitacoes
    var strSol = "";
    for (i=0; i<user.solicitacoes.length; i++){

        var solic = user.solicitacoes[i];  // apenas para simplificar
        
        strSol = strSol + templateSol.replace("{{NUMSOL}}",solic.numero)
                                     .replace("{{DATA}}", solic.dataSolicitacao)
                                     .replace("{{ORIGEM}}",solic.origem.nome)
                                     .replace("{{DESTINO}}",solic.destino.nome);

    }
    document.getElementById("listaSolicitacoes").innerHTML = strSol;
}

function logout(){
    localStorage.removeItem("userVlan");
    window.location = "login.html";
}
