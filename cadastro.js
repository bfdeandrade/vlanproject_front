function logout(){
    localStorage.removeItem("userVlan");
    window.location = "login.html";
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

function cadastrarUsuario(){
    var inputEmailCadastro = document.getElementById("inputEmailCadastro").value;
    var inputPasswordCadastro = document.getElementById("inputPasswordCadastro").value;
    var inputRacfCadastro = document.getElementById("inputRacfCadastro").value;
    var inputNomeCadastro = document.getElementById("inputNomeCadastro").value
    var inputPhotoCadastro = document.getElementById("inputPhotoCadastro").value;
    var inputNumSerieComputador = document.getElementById("inputNumSerieComputador").value;
    var txtNovoDepto = document.getElementById("txtNovoDepto").selectedOptions[0].value;
    var checkBoxOperador = document.getElementById("checkBoxOperador").value;
    console.log(inputNumSerieComputador);
    var msgSolicitacao = {
    	racf: inputRacfCadastro,
    	nome: inputNomeCadastro,
        email : inputEmailCadastro,
        linkFoto : inputPhotoCadastro,
        senha: inputPasswordCadastro,
        operador: Boolean(checkBoxOperador),
        computador: {
        	numSerie: parseInt(inputNumSerieComputador)
        }, 
        departamento: { 
        	id: parseInt(txtNovoDepto)
    	}
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

    fetch("http://localhost:8080/usuario/novo", cabecalho)
       .then(res => res.json())
       .then(res => adicionarUser(res))
       .catch(err => alert("deu bom"));
}

function adicionarUser(res){
    console.log(res);
    fetch("http://localhost:8080/usuario/"+res.user.id)
       .then(res2 => res2.json())
       .then(res2 => window.location="login.html")
       .then(alert("Usuario cadastrado com sucesso"))
       .catch(err => alert("Erro ao cadastrar usuario"));
}