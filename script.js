const inputValor = document.getElementById('input-valor');
const brlResult = document.getElementById('brl-result');
const moedaSelect = document.getElementById('moeda-select');
const cotacaoTexto = document.getElementById('cotacao-atual');

async function converter() {
    const moedaEstrangeira = moedaSelect.value;
    const url = `https://economia.awesomeapi.com.br/last/${moedaEstrangeira}-BRL`;

    try {
        cotacaoTexto.innerText = "Atualizando...";
        
        const response = await fetch(url);
        const data = await response.json();
        
        // A API retorna objetos como USDBRL, EURBRL, etc.
        const parMoedas = `${moedaEstrangeira}BRL`;
        const cotacao = parseFloat(data[parMoedas].bid);
        
        // Formata a exibição da cotação (Bitcoin precisa de mais decimais)
        const decimais = moedaEstrangeira === 'BTC' ? 3 : 2;
        cotacaoTexto.innerText = `1 ${moedaEstrangeira} = R$ ${cotacao.toLocaleString('pt-BR', { minimumFractionDigits: decimais })}`;

        // Realiza o cálculo se houver valor no input
        if (inputValor.value > 0) {
            const resultado = inputValor.value * cotacao;
            brlResult.value = resultado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        } else {
            brlResult.value = "";
        }

    } catch (error) {
        cotacaoTexto.innerText = "Erro ao conectar com a API.";
        console.error("Erro na requisição:", error);
    }
}

// Evento: Converte enquanto o usuário digita
inputValor.addEventListener('input', converter);

// Evento: Converte quando o usuário troca a moeda no select
moedaSelect.addEventListener('change', () => {
    inputValor.value = ""; // Limpa o input para uma nova conversão
    brlResult.value = "";
    converter();
});

// Inicializa a cotação ao abrir a página
converter();
