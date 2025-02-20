// Função para carregar o carrinho do localStorage
function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
}

// Função para salvar o carrinho no localStorage
function salvarCarrinho(produtosNoCarrinho) {
    localStorage.setItem('carrinho', JSON.stringify(produtosNoCarrinho));
}

// Função para renderizar o carrinho
function renderizarCarrinho() {
    const produtosNoCarrinho = carregarCarrinho();
    const tabelaCarrinho = document.getElementById('tabela-carrinho').getElementsByTagName('tbody')[0];
    tabelaCarrinho.innerHTML = '';
    let total = 0;

    if (produtosNoCarrinho.length === 0) {
        tabelaCarrinho.innerHTML = '<tr><td colspan="5">Seu carrinho está vazio.</td></tr>';
    } else {
        produtosNoCarrinho.forEach(produto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${produto.nome}</td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
                <td>
                    <button class="alterar-quantidade" data-id="${produto.id}" data-acao="decrease">-</button>
                    ${produto.quantidade}
                    <button class="alterar-quantidade" data-id="${produto.id}" data-acao="increase">+</button>
                </td>
                <td>R$ ${(produto.preco * produto.quantidade).toFixed(2)}</td>
                <td><button class="remover-produto" data-id="${produto.id}">Remover</button></td>
            `;
            tabelaCarrinho.appendChild(tr);
            total += produto.preco * produto.quantidade;
        });
    }
    document.getElementById('total-preco').textContent = `R$ ${total.toFixed(2)}`;
}

// Função para alterar a quantidade de um produto
function alterarQuantidade(id, acao) {
    let produtosNoCarrinho = carregarCarrinho();
    const produto = produtosNoCarrinho.find(p => p.id == id);

    if (produto) {
        if (acao === 'increase') produto.quantidade++;
        else if (acao === 'decrease' && produto.quantidade > 1) produto.quantidade--;
        salvarCarrinho(produtosNoCarrinho);
        renderizarCarrinho();
    }
}

// Função para remover um produto do carrinho
function removerProduto(id) {
    let produtosNoCarrinho = carregarCarrinho();
    produtosNoCarrinho = produtosNoCarrinho.filter(p => p.id != id);
    salvarCarrinho(produtosNoCarrinho);
    renderizarCarrinho();
}

// Delegação de eventos para o carrinho
document.getElementById('tabela-carrinho').addEventListener('click', function (e) {
    const id = e.target.getAttribute('data-id');
    if (e.target.classList.contains('alterar-quantidade')) {
        alterarQuantidade(id, e.target.getAttribute('data-acao'));
    } else if (e.target.classList.contains('remover-produto')) {
        removerProduto(id);
    }
});

renderizarCarrinho();