 // Alterna a visibilidade do menu
 document.getElementById('menu_toggle').addEventListener('click', function() {
  const navList = document.getElementById('nav_list');
  navList.classList.toggle('show');
});
  
// Form Validation
document.querySelector('.newsletter_form').addEventListener('submit', function(e) {
  let email = document.querySelector('.newsletter_input--email').value;
  if (!email.includes('@')) {
      alert('Please enter a valid email address');
      e.preventDefault();
  }
});

const precoFormatado = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

// Função para carregar os produtos do JSON e gerar os cards
fetch('data/produtos.json')
  .then(response => response.json())
  .then(produtos => {
    const container = document.getElementById('card_container');
    produtos.forEach(produto => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
        <a href="#" class="product_link">
          <h2>${produto.nome}</h2>
          <span class="produto_preco">${produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          <span class="produto_pagamento">à vista</span>
        </a>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => console.error('Erro ao carregar os produtos:', error));
