function autenticar(){
    var txtEmail = document.getElementById("txtEmail").value;
    var txtSenha = document.getElementById("txtSenha").value;

    console.log("Recebidos = "+txtEmail + " / "+ txtSenha);

    var loginMsg = {
        email : txtEmail,
        senha : txtSenha
    }

    console.log(loginMsg);

    var cabecalho = {
        method : 'POST',
        body   : JSON.stringify(loginMsg),
        headers : {
            'Content-type' : 'application/json'
        }
    }

    fetch("http://localhost:8080/login", cabecalho)
        .then(res => tratarResultado(res));     
}

function tratarResultado(res){
   if (res.status == 200) { // ok
       document.getElementById("erroMSG").innerHTML = "";
       res.json().then(console.log("Estou autenticado"));
   }
   else if (res.status == 403){  // usuario valido, senha invalida
       document.getElementById("erroMSG").innerHTML = "Senha Inválida";

   }
   else if (res.status == 404){  // usuario invalido
       document.getElementById("erroMSG").innerHTML = "Usuário Desconhecido";
   }
}