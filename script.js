const valorInput = document.getElementById('valor-input');
const valorResultado = document.getElementById('valor-resultado');
const moedaOrigem = document.getElementById('moeda-origem');
const rateText = document.getElementById('rate-text');
const aiStatus = document.getElementById('ai-status');

const API_URL = "https://economia.awesomeapi.com.br/last/";

async function updateConversion() {
    const moeda = moedaOrigem.value;
    
    try {
        const response = await fetch(`${API_URL}${moeda}-BRL`);
        const data = await response.json();
        const cotacao = parseFloat(data[`${moeda}BRL`].bid);

        // Atualiza taxa live
        rateText.innerText = `R$ ${cotacao.toFixed(2)}`;

        // Calcula resultado
        if(valorInput.value) {
            const final = valorInput.value * cotacao;
            valorResultado.value = final.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }

        generateAIInsight(moeda, cotacao);

    } catch (error) {
        console.error("Erro na busca:", error);
    }
}

function generateAIInsight(moeda, valor) {
    // Simulação de IA analisando o valor (pode ser conectado a uma API de IA real no futuro)
    let insight = "";
    if (moeda === 'BTC') {
        insight = "Alta volatilidade detectada. O Bitcoin apresenta forte resistência técnica hoje.";
    } else if (valor > 5.50) {
        insight = "O Real está perdendo força frente a esta moeda. Momento de cautela para compras.";
    } else {
        insight = "Taxa estável. Ótima janela para operações de câmbio planejadas.";
    }
    aiStatus.innerText = insight;
}

valorInput.addEventListener('input', updateConversion);
moedaOrigem.addEventListener('change', updateConversion);

// Início
updateConversion();
