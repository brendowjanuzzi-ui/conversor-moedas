const usdInput = document.getElementById('usd');
const brlInput = document.getElementById('brl');
const cotacaoTexto = document.getElementById('cotacao-atual');

async function buscarCotacao() {
    try {
        // Buscando dados da API em tempo real
        const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
        const data = await response.json();
        
        const cotacao = parseFloat(data.USDBRL.bid);
        
        cotacaoTexto.innerText = `Cotação Atual: R$ ${cotacao.toFixed(2)}`;
        
        // Função para converter quando digitar
        usdInput.addEventListener('input', () => {
            const valorConvertido = usdInput.value * cotacao;
            brlInput.value = valorConvertido.toFixed(2);
        });

    } catch (error) {
        cotacaoTexto.innerText = "Erro ao carregar cotação.";
        console.error("Erro na API:", error);
    }
}

// Inicia buscando a cotação
buscarCotacao();
