const API_URL = "http://localhost:3000/api";
let carrinhoCount = 0;

document.addEventListener("DOMContentLoaded", () => {
    carregarBannersDoBanco();
    carregarCategorias();
    carregarProdutosMaisVendidos();
    carregarNovidades();
    configurarBusca();
    iniciarCronometroOferta();
});

// 1. CARREGAR BANNERS DO BANCO
async function carregarBannersDoBanco() {
    const heroSection = document.getElementById("heroBanner");
    const weekendOfferSection = document.getElementById("weekendOfferBanner");

    try {
        const response = await fetch(`${API_URL}/banners/visiveis`);
        const banners = await response.json();

        if (Array.isArray(banners) && banners.length > 0) {
            if (banners[0] && banners[0].imagem) {
                heroSection.style.backgroundImage = `url('${banners[0].imagem}')`;
            }
            if (banners[1] && banners[1].imagem) {
                weekendOfferSection.style.backgroundImage = `url('${banners[1].imagem}')`;
            }
        }
    } catch (error) {
        console.warn("API de banners falhou. Mantendo gradientes CSS de segurança.", error);
    }
}

// 2. CRONÔMETRO REGRESSIVO (Apenas Oferta de Fim de Semana)
function iniciarCronometroOferta() {
    let tempoRestante = 24 * 3600;
    const offerTimerEl = document.getElementById("offerTimer");

    setInterval(() => {
        if (tempoRestante <= 0) return;
        tempoRestante--;

        const horas = String(Math.floor(tempoRestante / 3600)).padStart(2, '0');
        const minutos = String(Math.floor((tempoRestante % 3600) / 60)).padStart(2, '0');
        const segundos = String(tempoRestante % 60).padStart(2, '0');

        if (offerTimerEl) {
            offerTimerEl.innerText = `${horas}h | ${minutos}m | ${segundos}s`;
        }
    }, 1000);
}

// 3. CARREGAR CATEGORIAS
async function carregarCategorias() {
    const categoryGrid = document.getElementById("categoryGrid");

    try {
        const response = await fetch(`${API_URL}/categorias`);
        const categorias = await response.json();

        if (Array.isArray(categorias) && categorias.length > 0) {
            categoryGrid.innerHTML = "";
            categorias.forEach(cat => {
                const card = document.createElement("div");
                card.classList.add("category-card");
                card.innerHTML = `
                    <div>
                        <h3>${cat.nome}</h3>
                        <a href="#" onclick="filtrarCategoria(${cat.id})">Explorar &rarr;</a>
                    </div>
                    <img src="${cat.imagem || 'https://via.placeholder.com/100x80?text=' + cat.nome}" alt="${cat.nome}">
                `;
                categoryGrid.appendChild(card);
            });
        }
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        if (categoryGrid) {
            categoryGrid.innerHTML = "<p>Nenhuma categoria disponível no momento.</p>";
        }
    }
}

// 4. CARREGAR PRODUTOS MAIS VENDIDOS
async function carregarProdutosMaisVendidos() {
    const grid = document.getElementById("bestSellersGrid");
    try {
        const response = await fetch(`${API_URL}/produtos/ativos`);
        const produtos = await response.json();

        grid.innerHTML = "";
        if (Array.isArray(produtos) && produtos.length > 0) {
            produtos.slice(0, 4).forEach(prod => grid.appendChild(criarCardProduto(prod)));
        } else {
            grid.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        }
    } catch (error) {
        grid.innerHTML = "<p>Erro ao carregar produtos.</p>";
    }
}

// 5. CARREGAR NOVIDADES
async function carregarNovidades() {
    const grid = document.getElementById("newArrivalsGrid");
    try {
        const response = await fetch(`${API_URL}/produtos`);
        const produtos = await response.json();

        grid.innerHTML = "";
        if (Array.isArray(produtos) && produtos.length > 0) {
            produtos.slice(0, 4).forEach(prod => grid.appendChild(criarCardProduto(prod, "Novo")));
        } else {
            grid.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        }
    } catch (error) {
        grid.innerHTML = "<p>Erro ao carregar novidades.</p>";
    }
}

// Função auxiliar para estruturar o visual dos cards de produto
function criarCardProduto(produto, badgeText = null) {
    const card = document.createElement("div");
    card.classList.add("product-card");
    const precoFormatado = Number(produto.preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    const imgUrl = produto.imagem || "https://via.placeholder.com/200x150?text=Sem+Foto";

    card.innerHTML = `
        ${badgeText ? `<span class="product-badge">${badgeText}</span>` : ""}
        <img src="${imgUrl}" alt="${produto.nome}">
        <div class="product-title">${produto.nome}</div>
        <div class="product-price">${precoFormatado}</div>
        <button class="btn-add" onclick="adicionarAoCarrinho(${produto.id})">
            <i class="fa-solid fa-cart-shopping"></i> Adicionar
        </button>
    `;
    return card;
}

// 6. FILTRO POR CATEGORIA
async function filtrarCategoria(idCategoria) {
    const bestSellersGrid = document.getElementById("bestSellersGrid");
    bestSellersGrid.innerHTML = "<p>Carregando produtos...</p>";

    try {
        const response = await fetch(`${API_URL}/produto-has-categorias/categoria/${idCategoria}/produtos`);
        const produtos = await response.json();

        bestSellersGrid.innerHTML = "";
        if (Array.isArray(produtos) && produtos.length > 0) {
            produtos.forEach(prod => bestSellersGrid.appendChild(criarCardProduto(prod)));
        } else {
            bestSellersGrid.innerHTML = "<p>Nenhum produto nesta categoria.</p>";
        }
    } catch (error) {
        console.error("Erro ao filtrar categoria:", error);
    }
}

// 7. BUSCA NO HEADER
function configurarBusca() {
    const form = document.getElementById("searchForm");
    const input = document.getElementById("searchInput");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const termo = input.value.trim();
        if (!termo) return;

        const grid = document.getElementById("bestSellersGrid");
        grid.innerHTML = "<p>Buscando...</p>";

        try {
            const response = await fetch(`${API_URL}/produtos/nome/${encodeURIComponent(termo)}`);
            const produtos = await response.json();

            grid.innerHTML = "";
            if (Array.isArray(produtos) && produtos.length > 0) {
                produtos.forEach(prod => grid.appendChild(criarCardProduto(prod)));
            } else {
                grid.innerHTML = "<p>Nenhum produto encontrado com este nome.</p>";
            }
        } catch (error) {
            grid.innerHTML = "<p>Falha na busca.</p>";
        }
    });
}

// 8. ADICIONAR ITEM AO CARRINHO (Com animação)
function adicionarAoCarrinho(idProduto) {
    carrinhoCount++;
    const cartCountElement = document.getElementById("cartCount");
    cartCountElement.innerText = carrinhoCount;
    cartCountElement.style.transform = "scale(1.3)";
    setTimeout(() => cartCountElement.style.transform = "scale(1)", 200);
}