"use strict";

/*==================================================
=                 ELEMENTOS DO DOM                  =
==================================================*/

const elements = {

    /*---------------- Header ----------------*/

    headerLogo: document.getElementById("headerLogo"),
    menu: document.getElementById("menu"),

    searchInput: document.getElementById("searchInput"),
    searchButton: document.getElementById("searchButton"),

    /*---------------- Hero ----------------*/

    heroBanner: document.getElementById("heroBanner"),

    /*---------------- Benefícios ----------------*/

    benefitsGrid: document.getElementById("benefitsGrid"),

    /*---------------- Categorias ----------------*/

    categoriesTitle: document.getElementById("categoriesTitle"),
    categoriesLink: document.getElementById("categoriesLink"),
    categoriesGrid: document.getElementById("categoriesGrid"),

    /*---------------- Oferta ----------------*/

    offerBanner: document.getElementById("offerBanner"),

    /*---------------- Produtos ----------------*/

    bestTitle: document.getElementById("bestTitle"),
    bestGrid: document.getElementById("bestGrid"),

    newTitle: document.getElementById("newTitle"),
    newGrid: document.getElementById("newGrid"),

    /*---------------- Newsletter ----------------*/

    newsletterInfo: document.getElementById("newsletterInfo"),

    /*---------------- Footer ----------------*/

    footerAbout: document.getElementById("footerAbout"),
    footerInstitutional: document.getElementById("footerInstitutional"),
    footerSupport: document.getElementById("footerSupport"),
    footerContact: document.getElementById("footerContact"),
    footerCopy: document.getElementById("footerCopy"),

    /*---------------- Extras ----------------*/

    backTop: document.getElementById("backTop")

};



/*==================================================
=                 BANCO DE DADOS                    =
==================================================*/

const database = {

    empresa: {

        nome: "GamesStart",

        slogan: "Seu mundo gamer começa aqui.",

        descricao:
            "Os melhores jogos, consoles, periféricos e acessórios para elevar sua experiência gamer.",

        ano: new Date().getFullYear()

    },



    menu: [

        {
            nome: "Home",
            link: "#",
            ativo: true
        },

        {
            nome: "Jogos",
            link: "#",
            ativo: false
        },

        {
            nome: "Consoles",
            link: "#",
            ativo: false
        },

        {
            nome: "PC Gamer",
            link: "#",
            ativo: false
        },

        {
            nome: "Periféricos",
            link: "#",
            ativo: false
        },

        {
            nome: "Promoções",
            link: "#",
            ativo: false
        },

        {
            nome: "Contato",
            link: "#",
            ativo: false
        }

    ],



    hero: {

        subtitulo: "NOVA GERAÇÃO",

        titulo: "PlayStation 5",

        descricao:
            "Conheça o novo console da Sony com gráficos incríveis, SSD ultrarrápido e uma nova experiência de jogo.",

        botaoPrincipal: "Comprar Agora",

        botaoSecundario: "Saiba Mais",

        imagem: "assets/banners/banner-hero.png"

    },



    beneficios: [

        {

            icone: "fa-solid fa-truck-fast",

            titulo: "Entrega Rápida",

            descricao: "Receba seus produtos rapidamente."

        },

        {

            icone: "fa-solid fa-shield-halved",

            titulo: "Compra Segura",

            descricao: "Pagamento 100% protegido."

        },

        {

            icone: "fa-solid fa-headset",

            titulo: "Suporte Especializado",

            descricao: "Atendimento para tirar suas dúvidas."

        }

    ],



    categorias: [

        {

            nome: "PlayStation",

            imagem: "../assets/categories/playstation.jpg"

        },

        {

            nome: "Xbox",

            imagem: "../assets/categories/xbox.jpg"

        },

        {

            nome: "Nintendo",

            imagem: "../assets/categories/nintendo.jpg"

        },

        {

            nome: "PC Gamer",

            imagem: "../assets/categories/pcgamer.jpg"

        }

    ]

};/*==================================================
=              DADOS DA HOME                        =
==================================================*/

Object.assign(database, {

    /*----------------------------------------
        Banner Promocional
    -----------------------------------------*/

    oferta: {

        subtitulo: "SUPER PROMOÇÃO",

        titulo: "Até 60% OFF",

        descricao:
            "Aproveite descontos exclusivos em jogos, consoles e acessórios por tempo limitado.",

        botao: "Ver Ofertas",

        imagem: "assets/banners/banner-oferta.jpg"

    },



    /*----------------------------------------
        Produtos Mais Vendidos
    -----------------------------------------*/

    maisVendidos: [

        {

            id: 1,

            categoria: "PlayStation",

            nome: "Controle DualSense",

            imagem: "../assets/products/dualsense.png",

            precoAntigo: "R$ 599,90",

            precoAtual: "R$ 449,90",

            desconto: "-25%",

            estrelas: 5

        },

        {

            id: 2,

            categoria: "Xbox",

            nome: "Xbox Series X",

            imagem: "../assets/products/xbox-series-x.png",

            precoAntigo: "R$ 5.299,90",

            precoAtual: "R$ 4.799,90",

            desconto: "-10%",

            estrelas: 5

        },

        {

            id: 3,

            categoria: "Nintendo",

            nome: "Nintendo Switch OLED",

            imagem: "assets/products/switch-oled.png",

            precoAntigo: "R$ 2.699,90",

            precoAtual: "R$ 2.299,90",

            desconto: "-15%",

            estrelas: 5

        },

        {

            id: 4,

            categoria: "PC Gamer",

            nome: "Headset Gamer RGB",

            imagem: "../assets/products/headset.png",

            precoAntigo: "R$ 399,90",

            precoAtual: "R$ 299,90",

            desconto: "-20%",

            estrelas: 4

        }

    ]

});





/*==================================================
=            DADOS DERIVADOS                        =
==================================================*/

/*
    Enquanto ainda não existe um banco de dados,
    vamos reutilizar os mesmos produtos na seção
    "Novidades".

    No futuro basta substituir por uma consulta
    à API.
*/

database.novidades = [...database.maisVendidos];/*==================================================
=                 RENDER LOGO                       =
==================================================*/

function renderLogo() {

    if (!elements.headerLogo) return;

    elements.headerLogo.innerHTML = `

        <a
            href="home.html"
            class="logo">

            <img
                src="../assets/logo.png"
                alt="${database.empresa.nome}">

        </a>

    `;

}/*==================================================
=                 RENDER MENU                       =
==================================================*/

function renderMenu() {

    if (!elements.menu) return;

    let html = "";

    database.menu.forEach(item => {

        html += `

            <li class="menu-item">

                <a
                    href="${item.link}"
                    class="${item.ativo ? "active" : ""}">

                    ${item.nome}

                </a>

            </li>

        `;

    });

    elements.menu.innerHTML = html;

}/*==================================================
=                 RENDER HERO                       =
==================================================*/

function renderHero() {

    if (!elements.heroBanner) return;

    const hero = database.hero;

    elements.heroBanner.innerHTML = `

        <img
            src="${hero.imagem}"
            alt="${hero.titulo}">

        <div class="hero-content">

            <span class="hero-subtitle">

                ${hero.subtitulo}

            </span>

            <h1 class="hero-title">

                ${hero.titulo}

            </h1>

            <p class="hero-text">

                ${hero.descricao}

            </p>

            <div class="hero-buttons">

                <button
                    class="hero-button primary">

                    ${hero.botaoPrincipal}

                </button>

                <button
                    class="hero-button secondary">

                    ${hero.botaoSecundario}

                </button>

            </div>

        </div>

    `;

}/*==================================================
=             GERAR ESTRELAS                        =
==================================================*/

function gerarEstrelas(quantidade) {

    let html = "";

    for (let i = 1; i <= 5; i++) {

        if (i <= quantidade) {

            html += `<i class="fa-solid fa-star"></i>`;

        } else {

            html += `<i class="fa-regular fa-star"></i>`;

        }

    }

    return html;

}





/*==================================================
=            RENDER BENEFÍCIOS                      =
==================================================*/

function renderBeneficios() {

    if (!elements.benefitsGrid) return;

    let html = "";

    database.beneficios.forEach(item => {

        html += `

            <article class="benefit-card">

                <div class="benefit-icon">

                    <i class="${item.icone}"></i>

                </div>

                <div class="benefit-info">

                    <h3 class="benefit-title">

                        ${item.titulo}

                    </h3>

                    <p class="benefit-text">

                        ${item.descricao}

                    </p>

                </div>

            </article>

        `;

    });

    elements.benefitsGrid.innerHTML = html;

}





/*==================================================
=            RENDER CATEGORIAS                      =
==================================================*/

function renderCategorias() {

    if (!elements.categoriesGrid) return;

    elements.categoriesTitle.textContent = "Categorias";

    elements.categoriesLink.textContent = "Ver Todas";

    elements.categoriesLink.href = "#";

    let html = "";

    database.categorias.forEach(categoria => {

        html += `

            <article class="category-card">

                <div class="category-image">

                    <img
                        src="${categoria.imagem}"
                        alt="${categoria.nome}">

                </div>

                <div class="category-content">

                    <h3 class="category-title">

                        ${categoria.nome}

                    </h3>

                    <a
                        href="#"
                        class="category-link">

                        Explorar

                        <i class="fa-solid fa-arrow-right"></i>

                    </a>

                </div>

            </article>

        `;

    });

    elements.categoriesGrid.innerHTML = html;

}





/*==================================================
=              RENDER OFERTA                        =
==================================================*/

function renderOferta() {

    if (!elements.offerBanner) return;

    const oferta = database.oferta;

    elements.offerBanner.innerHTML = `

        <img
            src="${oferta.imagem}"
            alt="${oferta.titulo}">

        <div class="offer-content">

            <span class="offer-subtitle">

                ${oferta.subtitulo}

            </span>

            <h2 class="offer-title">

                ${oferta.titulo}

            </h2>

            <p class="offer-text">

                ${oferta.descricao}

            </p>

            <button
                class="offer-button">

                ${oferta.botao}

            </button>

        </div>

    `;

}/*==================================================
=              RENDER PRODUTOS                      =
==================================================*/

function renderProdutos(container, titulo, produtos) {

    if (!container || !titulo) return;

    titulo.textContent = produtos === database.maisVendidos
        ? "Mais Vendidos"
        : "Novidades";

    let html = "";

    produtos.forEach(produto => {

        html += `

            <article
                class="product-card"
                data-id="${produto.id}">

                <span class="product-badge">

                    ${produto.desconto}

                </span>

                <div class="product-image">

                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}">

                </div>

                <div class="product-content">

                    <span class="product-category">

                        ${produto.categoria}

                    </span>

                    <h3 class="product-title">

                        ${produto.nome}

                    </h3>

                    <div class="product-rating">

                        ${gerarEstrelas(produto.estrelas)}

                    </div>

                    <div class="product-price">

                        <span class="old-price">

                            ${produto.precoAntigo}

                        </span>

                        <span class="current-price">

                            ${produto.precoAtual}

                        </span>

                    </div>

                    <button
                        class="product-button"
                        data-id="${produto.id}">

                        Comprar

                    </button>

                </div>

            </article>

        `;

    });

    container.innerHTML = html;

}/*==================================================
=             RENDER NEWSLETTER                     =
==================================================*/

function renderNewsletter() {

    if (!elements.newsletterInfo) return;

    elements.newsletterInfo.innerHTML = `

        <h2 class="newsletter-title">

            Receba nossas ofertas

        </h2>

        <p class="newsletter-text">

            Cadastre seu e-mail e receba novidades,
            promoções e lançamentos exclusivos.

        </p>

    `;

}/*==================================================
=               RENDER FOOTER                       =
==================================================*/

function renderFooter() {

    if (elements.footerAbout) {

        elements.footerAbout.innerHTML = `

            <h3>${database.empresa.nome}</h3>

            <p>

                ${database.empresa.descricao}

            </p>

        `;

    }



    if (elements.footerInstitutional) {

        elements.footerInstitutional.innerHTML = `

            <h3>Institucional</h3>

            <a href="#">Quem Somos</a>

            <a href="#">Política de Privacidade</a>

            <a href="#">Termos de Uso</a>

        `;

    }



    if (elements.footerSupport) {

        elements.footerSupport.innerHTML = `

            <h3>Atendimento</h3>

            <a href="#">Central de Ajuda</a>

            <a href="#">Trocas e Devoluções</a>

            <a href="#">Contato</a>

        `;

    }



    if (elements.footerContact) {

        elements.footerContact.innerHTML = `

            <h3>Redes Sociais</h3>

            <div class="social-links">

                <a href="#">

                    <i class="fab fa-facebook-f"></i>

                </a>

                <a href="#">

                    <i class="fab fa-instagram"></i>

                </a>

                <a href="#">

                    <i class="fab fa-youtube"></i>

                </a>

            </div>

        `;

    }



    if (elements.footerCopy) {

        elements.footerCopy.innerHTML = `

            © ${database.empresa.ano}
            ${database.empresa.nome}.

            Todos os direitos reservados.

        `;

    }

}/*==================================================
=               CONFIGURAR EVENTOS                 =
==================================================*/

function configurarEventos() {

    /*----------------------------------------
        Pesquisa
    -----------------------------------------*/

    if (elements.searchButton && elements.searchInput) {

        elements.searchButton.addEventListener("click", () => {

            const texto = elements.searchInput.value.trim();

            if (texto === "") {

                alert("Digite o que deseja pesquisar.");

                elements.searchInput.focus();

                return;

            }

            console.log("Pesquisar:", texto);

        });

        elements.searchInput.addEventListener("keydown", (event) => {

            if (event.key === "Enter") {

                elements.searchButton.click();

            }

        });

    }






    /*----------------------------------------
        Botões Comprar
    -----------------------------------------*/

    document.addEventListener("click", (event) => {

        const botao = event.target.closest(".product-button");

        if (!botao) return;

        const id = Number(botao.dataset.id);

        const produto = [

            ...database.maisVendidos,

            ...database.novidades

        ].find(item => item.id === id);

        if (!produto) return;

        console.log("Produto selecionado:", produto);

        // Futuramente:
        // adicionarAoCarrinho(produto);

    });






    /*----------------------------------------
        Botão Voltar ao Topo
    -----------------------------------------*/

    if (elements.backTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                elements.backTop.classList.add("show");

            } else {

                elements.backTop.classList.remove("show");

            }

        });

        elements.backTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

}/*==================================================
=                 INICIALIZAÇÃO                    =
==================================================*/

function init() {

    renderLogo();

    renderMenu();

    renderHero();

    renderBeneficios();

    renderCategorias();

    renderOferta();

    renderProdutos(

        elements.bestGrid,

        elements.bestTitle,

        database.maisVendidos

    );

    renderProdutos(

        elements.newGrid,

        elements.newTitle,

        database.novidades

    );

    renderNewsletter();

    renderFooter();

    configurarEventos();

}/*==================================================
=               DOM READY                          =
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    init();

});