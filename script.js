document.addEventListener('DOMContentLoaded', function() {
    // INICIALIZAÇÃO DO SIDENAV (MENU MÓVEL)
    var sidenav_elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav_elems);

    // Inicialização do Parallax
    var parallax_elems = document.querySelectorAll('.parallax');
    M.Parallax.init(parallax_elems);

    // --- DADOS DOS PRODUTOS COM PLACEHOLDER PARA IMAGENS ---
    const produtos = [
        { 
            id: 1, 
            nome: 'Teclado Mecânico Gamer', 
            preco: 350.00, 
            // ATUALIZADO: Indicação para sua URL de imagem
            imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSorOlxFsuS-FLPgLcV52sD7uxIqEQ0sEweOA&s' 
        },
        { 
            id: 2, 
            nome: 'Mouse Gamer RGB', 
            preco: 150.00, 
            // ATUALIZADO: Indicação para sua URL de imagem
            imagem: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRd7hHVswLbBLvvE1JMloQXIiqqjvMUeshexpQWql6vxmYyrasXl8X3E1_diu8J1ek1pYQfX7E70OPCejNM8cwFeTRGvQXDJO12YCcMqTCIJHmyeB4FrLDbiAsTPImcVif6VOATkek&usqp=CAc' 
        },
        { 
            id: 3, 
            nome: 'Headset Gamer 7.1', 
            preco: 450.00, 
            // ATUALIZADO: Indicação para sua URL de imagem
            imagem: 'https://cdn.iset.io/assets/00665/produtos/4394/fone-gamer-redragon-zeus-x-rgb-chroma-mk.ii-h510-rgb-usb-7.1-surround-01.jpg' 
        }
    ];
    // --- FIM DOS DADOS DOS PRODUTOS ---

    const listaProdutos = document.getElementById('lista-produtos');
    const itensCarrinho = document.getElementById('itens-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Funções de Renderização
    function renderProdutos() {
        if (!listaProdutos) return;
        listaProdutos.innerHTML = '';
        produtos.forEach(produto => {
            // ATUALIZADO: Classes da coluna para cards maiores (s12, m6, l4)
            const card = `
                <div class="col s12 m6 l4">
                    <div class="card">
                        <div class="card-image">
                            <img src="${produto.imagem}" alt="${produto.nome}">
                            <span class="card-title">${produto.nome}</span>
                        </div>
                        <div class="card-content">
                            <p>R$ ${produto.preco.toFixed(2)}</p>
                        </div>
                        <div class="card-action">
                            <a href="#" class="btn-outline waves-effect">Ver Detalhes</a>
                            <a href="#" class="btn" onclick="addAoCarrinho(${produto.id})">Adicionar</a>
                        </div>
                    </div>
                </div>
            `;
            listaProdutos.innerHTML += card;
        });
    }

    // O restante do seu script continua aqui (renderCarrinho, addAoCarrinho, etc.)
    // ... (cole o restante do script que você já tem a partir daqui)
    function renderCarrinho() {
        if (!itensCarrinho) return;
        itensCarrinho.innerHTML = '';
        let total = 0;
        carrinho.forEach(item => {
            const subtotal = item.preco * item.quantidade;
            total += subtotal;
            const tr = `
                <tr>
                    <td>${item.nome}</td>
                    <td>R$ ${item.preco.toFixed(2)}</td>
                    <td>
                        <button class="btn-small" onclick="diminuirQuantidade(${item.id})">-</button>
                        ${item.quantidade}
                        <button class="btn-small" onclick="aumentarQuantidade(${item.id})">+</button>
                    </td>
                    <td>R$ ${subtotal.toFixed(2)}</td>
                    <td><button class="btn-floating red" onclick="removerDoCarrinho(${item.id})"><i class="material-icons">delete</i></button></td>
                </tr>
            `;
            itensCarrinho.innerHTML += tr;
        });
        if (totalCarrinho) {
            totalCarrinho.innerText = `Total: R$ ${total.toFixed(2)}`;
        }
    }

    window.addAoCarrinho = function(id) {
        const produto = produtos.find(p => p.id === id);
        const itemNoCarrinho = carrinho.find(item => item.id === id);

        if (itemNoCarrinho) {
            itemNoCarrinho.quantidade++;
        } else {
            carrinho.push({ ...produto, quantidade: 1 });
        }
        salvarCarrinho();
        M.toast({html: 'Produto adicionado ao carrinho!', classes: 'green-toast'});
    }

    window.removerDoCarrinho = function(id) {
        carrinho = carrinho.filter(item => item.id !== id);
        salvarCarrinho();
        renderCarrinho();
        M.toast({html: 'Produto removido.', classes: 'red-toast'});
    }
    
    window.aumentarQuantidade = function(id) {
        const item = carrinho.find(i => i.id === id);
        if (item) {
            item.quantidade++;
        }
        salvarCarrinho();
        renderCarrinho();
    };

    window.diminuirQuantidade = function(id) {
        const item = carrinho.find(i => i.id === id);
        if (item && item.quantidade > 1) {
            item.quantidade--;
        } else {
             carrinho = carrinho.filter(i => i.id !== id);
        }
        salvarCarrinho();
        renderCarrinho();
    };

    function salvarCarrinho() {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    // Inicialização
    renderProdutos();
    renderCarrinho();
});