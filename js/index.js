const API_URL = "http://localhost:3000";

let carrinhoCount = 0;

document.addEventListener("DOMContentLoaded", () => {

    carregarBannersDoBanco();
    carregarCategorias();
    carregarProdutosMaisVendidos();
    carregarNovidades();
    configurarBusca();
    iniciarCronometroOferta();

});


// =====================================================
// 1. CARREGAR BANNERS
// =====================================================

async function carregarBannersDoBanco() {

    const heroSection =
        document.getElementById("heroBanner");

    const weekendOfferSection =
        document.getElementById("weekendOfferBanner");


    if (!heroSection || !weekendOfferSection) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/banners/visiveis`
            );


        if (!response.ok) {
            throw new Error("Erro ao carregar banners.");
        }


        const banners =
            await response.json();


        if (
            Array.isArray(banners) &&
            banners.length > 0
        ) {

            if (
                banners[0] &&
                banners[0].imagem
            ) {

                heroSection.style.backgroundImage =
                    `url("${banners[0].imagem}")`;

            }


            if (
                banners[1] &&
                banners[1].imagem
            ) {

                weekendOfferSection.style.backgroundImage =
                    `url("${banners[1].imagem}")`;

            }

        }


    } catch (error) {

        console.warn(
            "Não foi possível carregar os banners do banco.",
            error
        );


        // Mantém o banner existente em assets
        // caso a API ainda não esteja disponível.

        heroSection.style.backgroundImage =
            `url("../assets/banner.png")`;

    }

}


// =====================================================
// 2. CRONÔMETRO
// =====================================================

function iniciarCronometroOferta() {

    let tempoRestante =
        24 * 3600;


    const offerTimerEl =
        document.getElementById(
            "offerTimer"
        );


    if (!offerTimerEl) {
        return;
    }


    setInterval(() => {

        if (tempoRestante <= 0) {
            return;
        }


        tempoRestante--;


        const horas =
            String(
                Math.floor(
                    tempoRestante / 3600
                )
            ).padStart(2, "0");


        const minutos =
            String(
                Math.floor(
                    (tempoRestante % 3600) / 60
                )
            ).padStart(2, "0");


        const segundos =
            String(
                tempoRestante % 60
            ).padStart(2, "0");


        offerTimerEl.innerText =
            `${horas}h | ${minutos}m | ${segundos}s`;

    }, 1000);

}


// =====================================================
// 3. CARREGAR CATEGORIAS
// =====================================================

async function carregarCategorias() {

    const navList =
        document.getElementById(
            "mainNavList"
        );


    const categoryGrid =
        document.getElementById(
            "categoryGrid"
        );


    if (!categoryGrid) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/categorias`
            );


        if (!response.ok) {
            throw new Error(
                "Erro ao carregar categorias."
            );
        }


        const categorias =
            await response.json();


        if (
            !Array.isArray(categorias) ||
            categorias.length === 0
        ) {

            categoryGrid.innerHTML =
                "<p>Nenhuma categoria disponível no momento.</p>";

            return;

        }


        // -------------------------------------------------
        // MENU SUPERIOR
        // -------------------------------------------------

        if (navList) {

            const promoLink =
                navList.querySelector(
                    ".promo-link"
                );


            categorias
                .slice(0, 5)
                .forEach(categoria => {

                    const li =
                        document.createElement(
                            "li"
                        );


                    li.innerHTML = `

                        <a
                            href="#"
                            data-categoria-id="${categoria.id_categorias}"
                        >

                            ${categoria.nome}

                        </a>

                    `;


                    const link =
                        li.querySelector("a");


                    link.addEventListener(
                        "click",
                        event => {

                            event.preventDefault();

                            filtrarCategoria(
                                categoria.id_categorias
                            );

                        }
                    );


                    if (
                        promoLink &&
                        promoLink.parentElement
                    ) {

                        navList.insertBefore(
                            li,
                            promoLink.parentElement
                        );

                    } else {

                        navList.appendChild(li);

                    }

                });

        }


        // -------------------------------------------------
        // GRID DE CATEGORIAS
        // -------------------------------------------------

        categoryGrid.innerHTML = "";


        categorias.forEach(
            categoria => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.classList.add(
                    "category-card"
                );


                const imagem =
                    categoria.imagem ||
                    "../assets/banner.png";


                card.innerHTML = `

                    <div>

                        <h3>
                            ${escapeHtml(
                                categoria.nome
                            )}
                        </h3>

                        <a
                            href="#"
                            class="category-explore"
                        >
                            Explorar &rarr;
                        </a>

                    </div>


                    <img
                        src="${imagem}"
                        alt="${escapeHtml(
                            categoria.nome
                        )}"
                    >

                `;


                const explore =
                    card.querySelector(
                        ".category-explore"
                    );


                explore.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        filtrarCategoria(
                            categoria.id_categorias
                        );

                    }
                );


                categoryGrid.appendChild(
                    card
                );

            }
        );


    } catch (error) {

        console.error(
            "Erro ao buscar categorias:",
            error
        );


        categoryGrid.innerHTML =
            "<p>Nenhuma categoria disponível no momento.</p>";

    }

}


// =====================================================
// 4. CARREGAR MAIS VENDIDOS
// =====================================================

async function carregarProdutosMaisVendidos() {

    const grid =
        document.getElementById(
            "bestSellersGrid"
        );


    if (!grid) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/produtos/ativos`
            );


        if (!response.ok) {
            throw new Error(
                "Erro ao carregar produtos."
            );
        }


        const produtos =
            await response.json();


        grid.innerHTML = "";


        if (
            !Array.isArray(produtos) ||
            produtos.length === 0
        ) {

            grid.innerHTML =
                "<p>Nenhum produto cadastrado.</p>";

            return;

        }


        produtos
            .slice(0, 4)
            .forEach(
                produto => {

                    grid.appendChild(
                        criarCardProduto(
                            produto
                        )
                    );

                }
            );


    } catch (error) {

        console.error(
            "Erro ao carregar produtos mais vendidos:",
            error
        );


        grid.innerHTML =
            "<p>Erro ao carregar produtos.</p>";

    }

}


// =====================================================
// 5. CARREGAR NOVIDADES
// =====================================================

async function carregarNovidades() {

    const grid =
        document.getElementById(
            "newArrivalsGrid"
        );


    if (!grid) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/produtos`
            );


        if (!response.ok) {
            throw new Error(
                "Erro ao carregar novidades."
            );
        }


        const produtos =
            await response.json();


        grid.innerHTML = "";


        if (
            !Array.isArray(produtos) ||
            produtos.length === 0
        ) {

            grid.innerHTML =
                "<p>Nenhum produto cadastrado.</p>";

            return;

        }


        produtos
            .slice(0, 4)
            .forEach(
                produto => {

                    grid.appendChild(
                        criarCardProduto(
                            produto,
                            "Novo"
                        )
                    );

                }
            );


    } catch (error) {

        console.error(
            "Erro ao carregar novidades:",
            error
        );


        grid.innerHTML =
            "<p>Erro ao carregar novidades.</p>";

    }

}


// =====================================================
// 6. CRIAR CARD DO PRODUTO
// =====================================================

function criarCardProduto(
    produto,
    badgeText = null
) {

    const card =
        document.createElement(
            "div"
        );


    card.classList.add(
        "product-card"
    );


    // -------------------------------------------------
    // ID REAL DO BANCO
    // -------------------------------------------------

    const idProduto =
        produto.id_produto;


    // -------------------------------------------------
    // NOME REAL DO BANCO
    // -------------------------------------------------

    const nome =
        produto.nome || "Produto";


    // -------------------------------------------------
    // PREÇO
    //
    // O banco possui:
    //
    // preco_antigo
    // preco_promocional
    //
    // -------------------------------------------------

    let preco = 0;


    if (
        produto.preco_promocional !== null &&
        produto.preco_promocional !== undefined &&
        produto.preco_promocional !== "" &&
        Number(produto.preco_promocional) > 0
    ) {

        preco =
            Number(
                produto.preco_promocional
            );

    } else {

        preco =
            Number(
                produto.preco_antigo || 0
            );

    }


    const precoFormatado =
        preco.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );


    // -------------------------------------------------
    // IMAGEM
    //
    // Alguns endpoints podem devolver
    // a imagem diretamente.
    //
    // Caso não devolvam, usamos o fallback.
    // -------------------------------------------------

    const imgUrl =
        produto.imagem ||
        produto.arquivo ||
        "../assets/banner.png";


    card.innerHTML = `

        ${
            badgeText
                ? `
                    <span class="product-badge">
                        ${badgeText}
                    </span>
                `
                : ""
        }


        <img
            src="${imgUrl}"
            alt="${escapeHtml(nome)}"
            onerror="
                this.onerror=null;
                this.src='../assets/banner.png';
            "
        >


        <div class="product-title">

            ${escapeHtml(nome)}

        </div>


        <div class="product-price">

            ${precoFormatado}

        </div>


        <button
            class="btn-add"
            type="button"
            data-product-id="${idProduto}"
        >

            <i class="fa-solid fa-cart-shopping"></i>

            Adicionar

        </button>

    `;


    const botao =
        card.querySelector(
            ".btn-add"
        );


    if (botao) {

        botao.addEventListener(
            "click",
            () => {

                adicionarAoCarrinho(
                    idProduto
                );

            }
        );

    }


    return card;

}


// =====================================================
// 7. FILTRAR POR CATEGORIA
// =====================================================

async function filtrarCategoria(
    idCategoria
) {

    const bestSellersGrid =
        document.getElementById(
            "bestSellersGrid"
        );


    if (!bestSellersGrid) {
        return;
    }


    bestSellersGrid.innerHTML =
        "<p>Carregando produtos...</p>";


    try {

        const response =
            await fetch(

                `${API_URL}/produto-has-categorias/categoria/${idCategoria}/produtos`

            );


        if (!response.ok) {

            throw new Error(
                "Erro ao buscar produtos da categoria."
            );

        }


        const produtos =
            await response.json();


        bestSellersGrid.innerHTML = "";


        if (
            Array.isArray(produtos) &&
            produtos.length > 0
        ) {

            produtos.forEach(
                produto => {

                    bestSellersGrid.appendChild(
                        criarCardProduto(
                            produto
                        )
                    );

                }
            );

        } else {

            bestSellersGrid.innerHTML =
                "<p>Nenhum produto nesta categoria.</p>";

        }


    } catch (error) {

        console.error(
            "Erro ao filtrar categoria:",
            error
        );


        bestSellersGrid.innerHTML =
            "<p>Erro ao carregar produtos da categoria.</p>";

    }

}


// =====================================================
// 8. BUSCA
// =====================================================

function configurarBusca() {

    const form =
        document.getElementById(
            "searchForm"
        );


    const input =
        document.getElementById(
            "searchInput"
        );


    if (!form || !input) {
        return;
    }


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const termo =
                input.value
                    .trim();


            if (!termo) {
                return;
            }


            const grid =
                document.getElementById(
                    "bestSellersGrid"
                );


            if (!grid) {
                return;
            }


            grid.innerHTML =
                "<p>Buscando...</p>";


            try {

                const response =
                    await fetch(

                        `${API_URL}/produtos/nome/${encodeURIComponent(
                            termo
                        )}`

                    );


                if (!response.ok) {

                    throw new Error(
                        "Falha na busca."
                    );

                }


                const produtos =
                    await response.json();


                grid.innerHTML = "";


                if (
                    Array.isArray(produtos) &&
                    produtos.length > 0
                ) {

                    produtos.forEach(
                        produto => {

                            grid.appendChild(
                                criarCardProduto(
                                    produto
                                )
                            );

                        }
                    );

                } else {

                    grid.innerHTML =
                        "<p>Nenhum produto encontrado com este nome.</p>";

                }


            } catch (error) {

                console.error(
                    "Erro na busca:",
                    error
                );


                grid.innerHTML =
                    "<p>Falha na busca.</p>";

            }

        }
    );

}


// =====================================================
// 9. CARRINHO
// =====================================================

function adicionarAoCarrinho(
    idProduto
) {

    carrinhoCount++;


    const cartCountElement =
        document.getElementById(
            "cartCount"
        );


    if (!cartCountElement) {
        return;
    }


    cartCountElement.innerText =
        carrinhoCount;


    cartCountElement.style.transform =
        "scale(1.3)";


    setTimeout(
        () => {

            cartCountElement.style.transform =
                "scale(1)";

        },
        200
    );

}


// =====================================================
// 10. ESCAPAR HTML
// =====================================================

function escapeHtml(valor) {

    return String(valor)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}