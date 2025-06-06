document.addEventListener('DOMContentLoaded', function() {
    // Supondo que você pega o ID do produto pela URL, ex: detalhes.html?id=3
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = parseInt(urlParams.get('id'));

    // Carrega os dados do produto
    fetch('assets/dados.json')
        .then(res => res.json())
        .then(data => {
            const produto = data.produtos.find(p => p.id === produtoId);
            if (!produto) return;

            // Preenche os campos da página
            document.getElementById('produto-imagem').src = produto.imagem;
            document.getElementById('produto-imagem').alt = produto.nome;
            document.getElementById('produto-nome').textContent = produto.nome;
            document.getElementById('produto-categoria').textContent = produto.categoria || '';
            document.getElementById('produto-preco').textContent = 'R$ ' + produto.preco.toFixed(2);
            document.getElementById('produto-descricao').textContent = produto.descricao;

            // Armazena o ID no botão para uso no clique
            const btnAdicionar = document.getElementById('adicionar-carrinho');
            btnAdicionar.setAttribute('data-id', produto.id);
        });

    // Evento do botão "Adicionar ao Carrinho"
    const btnAdicionar = document.getElementById('adicionar-carrinho');
    btnAdicionar.addEventListener('click', function() {
        // Pega o ID do produto do atributo data-id
        const id = parseInt(btnAdicionar.getAttribute('data-id'));
        // Pega a quantidade escolhida (ou 1 se não existir)
        const quantidade = parseInt(document.getElementById('produto-quantidade').value) || 1;

        if (window.carrinho && typeof window.carrinho.adicionarAoCarrinho === 'function') {
            window.carrinho.adicionarAoCarrinho(id, quantidade);

            // Mostra alerta de sucesso
            const alerta = document.getElementById('adicionado-sucesso');
            if (alerta) {
                alerta.style.display = 'block';
                setTimeout(() => alerta.style.display = 'none', 1500);
            }
        }
    });
});