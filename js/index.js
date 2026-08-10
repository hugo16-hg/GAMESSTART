/* =========================================================
   GAMESSTART - HOME
========================================================= */


/* =========================================================
   PRODUTOS - MAIS VENDIDOS
========================================================= */

const bestProducts = [

    {
        id: 1,

        nome: "Controle Sem Fio DualSense PlayStation 5",

        preco: "R$ 449,90",

        imagem: "./img/produtos/dualsense.png",

        tag: "",

        // IMAGEM: adicionar posteriormente
    },

    {
        id: 2,

        nome: "Processador AMD Ryzen 7 7800X3D",

        preco: "R$ 2.899,00",

        imagem: "./img/produtos/ryzen7.png",

        tag: "",

        // IMAGEM: adicionar posteriormente
    },

    {
        id: 3,

        nome: "Headset HyperX Cloud III",

        preco: "R$ 699,00",

        imagem: "./img/produtos/headset.png",

        tag: "",

        // IMAGEM: adicionar posteriormente
    },

    {
        id: 4,

        nome: "Elden Ring Shadow of the Erdtree",

        preco: "R$ 314,10",

        imagem: "./img/produtos/eldenring.png",

        tag: "PROMOÇÃO",

        // IMAGEM: adicionar posteriormente
    }

];


/* =========================================================
   PRODUTOS - NOVIDADES
========================================================= */

const newProducts = [

    {
        id: 5,

        nome: "Monitor Gamer OLED 240Hz",

        preco: "R$ 6.199,00",

        imagem: "./img/produtos/monitor.png",

        tag: "NOVO",

        // IMAGEM: adicionar posteriormente
    },

    {
        id: 6,

        nome: "Headset Astro A50",

        preco: "R$ 1.999,00",

        imagem: "./img/produtos/astro.png",

        tag: "NOVO",

        // IMAGEM: adicionar posteriormente
    },

    {
        id: 7,

        nome: "Final Fantasy VII Rebirth",

        preco: "R$ 349,00",

        imagem: "./img/produtos/finalfantasy.png",

        tag: "NOVO",

        // IMAGEM: adicionar posteriormente
    },

    {
        id: 8,

        nome: "Intel Core i9 14900K",

        preco: "R$ 4.299,00",

        imagem: "./img/produtos/i9.png",

        tag: "NOVO",

        // IMAGEM: adicionar posteriormente
    }

];


/* =========================================================
   CARRINHO
========================================================= */

let cart = [];


/* =========================================================
   ELEMENTOS DO HTML
========================================================= */

const bestProductsContainer =
    document.getElementById("bestProducts");

const newProductsContainer =
    document.getElementById("newProducts");

const cartCount =
    document.getElementById("cartCount");

const cartButton =
    document.getElementById("cartButton");


/* =========================================================
   CRIAR CARD DO PRODUTO
========================================================= */

function criarCard(produto) {

    const card = document.createElement("article");

    card.classList.add("product-card");


    /* TAG */

    let tagHTML = "";

    if (produto.tag) {

        tagHTML = `
            <span class="product-tag">
                ${produto.tag}
            </span>
        `;

    }


    /* CARD */

    card.innerHTML = `

        <div class="product-image">

            ${tagHTML}

            <!-- IMAGEM: adicionar posteriormente -->

            <img
                src="${produto.imagem}"
                alt="${produto.nome}"
                loading="lazy"
            >

        </div>


        <div class="product-info">

            <h3 class="product-name">
                ${produto.nome}
            </h3>


            <div class="product-price">

                ${produto.preco}

            </div>


            <button
                type="button"
                class="product-btn"
                data-product-id="${produto.id}"
            >

                <i class="fa-solid fa-cart-shopping"></i>

                Adicionar

            </button>

        </div>

    `;


    /* BOTÃO ADICIONAR */

    const button =
        card.querySelector(".product-btn");


    button.addEventListener("click", () => {

        adicionarAoCarrinho(produto);

    });


    return card;

}


/* =========================================================
   RENDERIZAR PRODUTOS
========================================================= */

function renderizarProdutos(lista, container) {

    if (!container) {
        return;
    }


    container.innerHTML = "";


    lista.forEach(produto => {

        const card = criarCard(produto);

        container.appendChild(card);

    });

}


/* =========================================================
   RENDERIZAR HOME
========================================================= */

function carregarProdutos() {

    renderizarProdutos(
        bestProducts,
        bestProductsContainer
    );


    renderizarProdutos(
        newProducts,
        newProductsContainer
    );

}


/* =========================================================
   ADICIONAR AO CARRINHO
========================================================= */

function adicionarAoCarrinho(produto) {

    cart.push(produto);

    atualizarContadorCarrinho();

    console.log(
        "Produto adicionado:",
        produto.nome
    );

}


/* =========================================================
   ATUALIZAR CONTADOR DO CARRINHO
========================================================= */

function atualizarContadorCarrinho() {

    if (!cartCount) {
        return;
    }


    cartCount.textContent = cart.length;

}


/* =========================================================
   BOTÃO DO CARRINHO
========================================================= */

if (cartButton) {

    cartButton.addEventListener("click", () => {

        console.log("Carrinho:", cart);

    });

}


/* =========================================================
   PESQUISA
========================================================= */

const searchForm =
    document.getElementById("searchForm");

const searchInput =
    document.getElementById("searchInput");


if (searchForm) {

    searchForm.addEventListener("submit", event => {

        event.preventDefault();

        pesquisarProdutos();

    });

}


function pesquisarProdutos() {

    if (!searchInput) {
        return;
    }


    const termo =
        searchInput.value
            .trim()
            .toLowerCase();


    if (termo === "") {

        carregarProdutos();

        return;

    }


    const todosProdutos = [

        ...bestProducts,

        ...newProducts

    ];


    const resultados =
        todosProdutos.filter(produto =>

            produto.nome
                .toLowerCase()
                .includes(termo)

        );


    renderizarProdutos(
        resultados,
        bestProductsContainer
    );


    if (newProductsContainer) {

        newProductsContainer.innerHTML = "";

    }

}


/* =========================================================
   CONTADOR DA OFERTA
========================================================= */

let tempoRestante =
    (24 * 60 * 60) +
    (15 * 60) +
    42;


const countdown =
    document.getElementById("countdown");


function atualizarCountdown() {

    if (!countdown) {
        return;
    }


    if (tempoRestante <= 0) {

        countdown.textContent =
            "Oferta encerrada";

        return;

    }


    const horas =
        Math.floor(
            tempoRestante / 3600
        );


    const minutos =
        Math.floor(
            (tempoRestante % 3600) / 60
        );


    const segundos =
        tempoRestante % 60;


    countdown.textContent =

        `${String(horas).padStart(2, "0")}h : ` +
        `${String(minutos).padStart(2, "0")}m : ` +
        `${String(segundos).padStart(2, "0")}s`;


    tempoRestante--;

}


atualizarCountdown();


setInterval(
    atualizarCountdown,
    1000
);


/* =========================================================
   BOTÕES DOS BANNERS
========================================================= */

const heroOfferButton =
    document.getElementById("heroOfferButton");

const heroInfoButton =
    document.getElementById("heroInfoButton");

const offerButton =
    document.getElementById("offerButton");


/* BOTÃO "CONFIRA" */

if (heroOfferButton) {

    heroOfferButton.addEventListener("click", () => {

        const products =
            document.getElementById("products");


        if (products) {

            products.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


/* BOTÃO "SAIBA MAIS" */

if (heroInfoButton) {

    heroInfoButton.addEventListener("click", () => {

        const categories =
            document.getElementById("categories");


        if (categories) {

            categories.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


/* BOTÃO DA OFERTA */

if (offerButton) {

    offerButton.addEventListener("click", () => {

        const products =
            document.getElementById("products");


        if (products) {

            products.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


/* =========================================================
   NEWSLETTER
========================================================= */

const newsletterForm =
    document.getElementById("newsletterForm");


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const emailInput =
                newsletterForm.querySelector(
                    'input[type="email"]'
                );


            if (!emailInput) {
                return;
            }


            const email =
                emailInput.value.trim();


            if (email === "") {
                return;
            }


            console.log(
                "E-mail cadastrado:",
                email
            );


            emailInput.value = "";


            alert(
                "E-mail cadastrado com sucesso!"
            );

        }
    );

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarProdutos();

        atualizarContadorCarrinho();

        console.log(
            "GamesStart - Home carregada."
        );

    }
);