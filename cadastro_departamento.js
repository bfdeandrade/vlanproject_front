function cancelarDepartamento(){
    console.log("Entrou aqui")
    window.location.replace("perfil_operador.html");
}
function cadastrarDepartamento(){
    var inputAndarDepartamento = document.getElementById("inputAndarDepartamento").value;
    var inputNomeDepartamento = document.getElementById("inputNomeDepartamento").value;
    var inputUnidadeDepartamento = document.getElementById("inputUnidadeDepartamento").value;
    var inputVlanDepartamento = document.getElementById("inputVlanDepartamento").value;

    var msgSolicitacao = {
      andar: parseInt(inputAndarDepartamento),
      nome: inputNomeDepartamento,
      unidade: inputUnidadeDepartamento,
      vlan: inputVlanDepartamento
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

    fetch("http://localhost:8080/departamentos/novo", cabecalho)
       .then(res => res.json()) 
       .then(res => adicionarDepartamento(res));
}

function adicionarDepartamento(res){
    fetch("http://localhost:8080/departamentos/"+res.departamento.id)
       .then(res2 => res2.json())
       .then(res2 => window.location="perfil_operador.html")
       .then(alert("Departamento cadastrado com sucesso"))
       .catch(err => alert("Erro ao cadastrar usuario"));
}