async function tempoReal() {
    const apiKey = "de29a1be1ab84aa4b2a232418240606";
    const cidade = "São Paulo";

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cidade}`;

    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error('Erro ao fazer a solicitação da API');
        }
        const data = await resposta.json();
        const { temp_c, condition } = data.current;
        const { location } = data.location;

        console.log(data);

        // Exibir os dados na tabela
        const tabela = document.getElementById('clima');
        const linha = document.createElement("tr");
        const tdId = document.createElement("td");
        const tdTemp = document.createElement("td");
        const tdCondicao = document.createElement("td");
        const tdLocation = document.createElement("td");

        tdId.textContent = data.location.id;
        tdTemp.textContent = `${temp_c}°C`;
        tdCondicao.textContent = condition.text;
        tdLocation.textContent = `${cidade}`;

        linha.appendChild(tdId);
        linha.appendChild(tdTemp);
        linha.appendChild(tdCondicao);
        linha.appendChild(tdLocation);

        tabela.appendChild(linha);
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

tempoReal();