// Alterna a visibilidade do menu
document.getElementById('menu_toggle').addEventListener('click', () => {
    document.getElementById('nav_list').classList.toggle('show');
});

// Validação do formulário
document.querySelector('.newsletter_form').addEventListener('submit', function (e) {
    const email = document.querySelector('.newsletter_input--email').value;
    if (!email.includes('@') || !email.includes('.')) {
        alert('Por favor, insira um endereço de e-mail válido.');
        e.preventDefault();
    }
});

// Formatar preço
const precoFormatado = valor => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Carregar produtos do JSON
fetch('data/produtos.json')
    .then(res => res.json())
    .then(produtos => {
        const cardContainer = document.getElementById('card_container');
        produtos.forEach(product => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            // Calcular o preço com 5% de desconto
            const precoComDesconto = product.preco * 0.95;

            // Calcular o parcelamento sem juros (12x)
            const precoParcelado = precoFormatado(product.preco / 12); // Formatar a parcela

            // Criar o link para a imagem e o título
            const productLink = document.createElement('a');
            productLink.href = `pages/produto.html?id=${product.id}`;

            // Adicionar a imagem e o título dentro do link
            const productImage = document.createElement('img');
            productImage.src = product.imagem;
            productImage.alt = product.nome;
            productImage.classList.add('product-image');

            const productTitle = document.createElement('h3');
            productTitle.textContent = product.nome;

            productLink.appendChild(productImage);
            productLink.appendChild(productTitle);

            // Adicionar o preço com desconto e informações de pagamento fora do link
            const productInfo = document.createElement('div');
            productInfo.classList.add ('product_info')
            productInfo.innerHTML = `
                <span class="produto_preco">${precoFormatado(precoComDesconto)}</span>
                <span class="produto_pagamento"> à vista</span>
                <br>
                <span>12x</span>
                <small>de</small>
                <span>${precoFormatado(precoParcelado)}</span>
                <small> sem juros</small>
                <br>
                <button class="btn-carrinho-card" >
                    <svg class="svg_icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                </button>
            `;

            // Adicionar o link e as informações ao card
            cardDiv.appendChild(productLink);
            cardDiv.appendChild(productInfo);

            // Adicionar o card ao container
            cardContainer.appendChild(cardDiv);
        });
    })
    .catch(error => console.error('Erro ao carregar os produtos:', error));

// Página de detalhes do produto
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch('../data/produtos.json')
    .then(res => res.json())
    .then(produtos => {
        const produto = produtos.find(p => p.id == productId);
        const produtoDetalhes = document.getElementById('produto-detalhes');
        if (produto) {
            produtoDetalhes.innerHTML = `
                <h1>${produto.nome}</h1>
                <img src="${produto.imagem}" alt="${produto.nome}" class="product-image">
                <p>${produto.descricao}</p>
                <p>${precoFormatado(produto.preco)}</p> <!-- Preço original formatado -->
                <button id="adicionar-carrinho" data-id="${produto.id}" data-nome="${produto.nome}" data-preco="${produto.preco}" data-imagem="${produto.imagem}">Adicionar ao Carrinho</button>
            `;
        } else {
            produtoDetalhes.innerHTML = '<p>Produto não encontrado.</p>';
        }
    })
    .catch(() => {
        document.getElementById('produto-detalhes').innerHTML = '<p>Erro ao carregar o produto.</p>';
    });

// Manipulação do carrinho de forma unificada
let produtosNoCarrinho = carregarCarrinho();

function adicionarAoCarrinho(produto) {
    const existente = produtosNoCarrinho.find(p => p.id === produto.id);
    if (existente) existente.quantidade++;
    else produtosNoCarrinho.push({ ...produto, quantidade: 1 });
    salvarCarrinho(produtosNoCarrinho);
    renderizarCarrinho();
}

document.getElementById('produto-detalhes').addEventListener('click', function (e) {
    if (e.target.id === 'adicionar-carrinho') {
        const produto = {
            id: e.target.getAttribute('data-id'),
            nome: e.target.getAttribute('data-nome'),
            preco: parseFloat(e.target.getAttribute('data-preco')),
            imagem: e.target.getAttribute('data-imagem')
        };
        adicionarAoCarrinho(produto);
        alert(`${produto.nome} foi adicionado ao carrinho.`);
    }
});

renderizarCarrinho();
