const url = 'https://go-wash-api.onrender.com/api/auth/address';

async function getEnderecoUsuario() {
    let user = localStorage.getItem('user');
    let token = JSON.parse(user).access_token;

    const resposta = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        }
    });

    const data = await resposta.json();

    if (data && data.data && data.data.length > 0) {
        exibirDados(data.data);
    } else {
        console.log("Nenhum endereço encontrado.");
    }
    console.log(data);
}

function exibirDados(enderecos) {
    const tabela = document.getElementById('dados-api');

    enderecos.forEach(endereco => {
        const linha = criaLinha(endereco);
        tabela.appendChild(linha);
    });
}

function criaLinha(endereco) {
    const linha = document.createElement("tr");

    const tdId = document.createElement("td");
    const tdTitle = document.createElement("td");
    const tdCEP = document.createElement("td");
    const tdAddress = document.createElement("td");
    const tdNumber = document.createElement("td");
    const tdComplement = document.createElement("td");
    const tdActions = document.createElement("td"); // Nova célula para ações

    tdId.textContent = endereco.id;
    tdTitle.textContent = endereco.title;
    tdCEP.textContent = endereco.cep;
    tdAddress.textContent = endereco.address;
    tdNumber.textContent = endereco.number;
    tdComplement.textContent = endereco.complement || "-";

    // Botão de deletar
    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Deletar";
    btnDelete.addEventListener('click', () => deleteEndereco(endereco.id, linha)); // Adiciona evento de clique para deletar
    tdActions.appendChild(btnDelete);

    linha.appendChild(tdId);
    linha.appendChild(tdTitle);
    linha.appendChild(tdCEP);
    linha.appendChild(tdAddress);
    linha.appendChild(tdNumber);
    linha.appendChild(tdComplement);
    linha.appendChild(tdActions); // Adiciona a célula de ações

    return linha;
}

async function deleteEndereco(id, linha) {
    let user = localStorage.getItem('user');
    let token = JSON.parse(user).access_token;

    console.log(`Tentando deletar o endereço com ID: ${id}`); // Loga o ID

    const resposta = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        }
    });

    if (resposta.ok) {
        console.log(`Endereço com ID ${id} deletado com sucesso.`);
        linha.remove(); // Remove a linha da tabela sem recarregar a página
    } else {
        const errorData = await resposta.json(); // Obtem detalhes do erro
        console.error(`Falha ao deletar o endereço com ID ${id}.`, errorData);
    }
}

getEnderecoUsuario();
