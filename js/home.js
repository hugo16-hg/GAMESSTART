/* ==========================================================
   DADOS DA HOME
========================================================== */

const dadosHome = {

    logoTexto:"GamesStart",

    pesquisaPlaceholder:"Pesquisar produtos...",

    usuario:{

        nome:"João Pedro",

        tipo:"Cliente",

        foto:"../assets/img/usuarios/usuario.png"

    },

    menu:[

        "Home",

        "Consoles",

        "PC Gamer",

        "Periféricos",

        "Jogos",

        "Promoções"

    ],

    banner:{

        subtitulo:"A NOVA GERAÇÃO CHEGOU",

        titulo:"PlayStation 5 Slim",

        descricao:"Descubra uma nova geração de jogos com gráficos incríveis, carregamento ultrarrápido e experiências imersivas.",

        botaoPrimario:"Comprar Agora",

        botaoSecundario:"Ver Produtos",

        imagem:"../assets/img/banner/banner-home.png"

    }

};

/* ==========================================================
   HEADER
========================================================== */

function carregarHeader(){

    document.getElementById("textoLogo").textContent =
    dadosHome.logoTexto;

    document.getElementById("inputPesquisa").placeholder =
    dadosHome.pesquisaPlaceholder;

    document.getElementById("imagemUsuario").src =
    dadosHome.usuario.foto;

    document.getElementById("nomeUsuario").textContent =
    dadosHome.usuario.nome;

    document.getElementById("tipoUsuario").textContent =
    dadosHome.usuario.tipo;

}

/* ==========================================================
   MENU
========================================================== */

function carregarMenu(){

    document.getElementById("linkHome").textContent =
    dadosHome.menu[0];

    document.getElementById("linkConsoles").textContent =
    dadosHome.menu[1];

    document.getElementById("linkPC").textContent =
    dadosHome.menu[2];

    document.getElementById("linkPerifericos").textContent =
    dadosHome.menu[3];

    document.getElementById("linkJogos").textContent =
    dadosHome.menu[4];

    document.getElementById("linkPromocoes").textContent =
    dadosHome.menu[5];

}

/* ==========================================================
   BANNER PRINCIPAL
========================================================== */

function carregarBanner(){

    document.getElementById("subtituloBanner").textContent =
    dadosHome.banner.subtitulo;

    document.getElementById("tituloBanner").textContent =
    dadosHome.banner.titulo;

    document.getElementById("descricaoBanner").textContent =
    dadosHome.banner.descricao;

    document.getElementById("botaoBannerPrimario").textContent =
    dadosHome.banner.botaoPrimario;

    document.getElementById("botaoBannerSecundario").textContent =
    dadosHome.banner.botaoSecundario;

    document.getElementById("imagemBanner").src =
    dadosHome.banner.imagem;

}

/* ==========================================================
   EVENTOS HEADER
========================================================== */

function configurarHeader(){

    document
    .getElementById("botaoPesquisar")
    .addEventListener("click",()=>{

        const pesquisa =
        document.getElementById("inputPesquisa").value;

        console.log("Pesquisar:",pesquisa);

    });

    document
    .getElementById("botaoCarrinho")
    .addEventListener("click",()=>{

        console.log("Carrinho");

    });

    document
    .getElementById("botaoNotificacao")
    .addEventListener("click",()=>{

        console.log("Notificações");

    });

}

/* ==========================================================
   EVENTOS BANNER
========================================================== */

function configurarBanner(){

    document
    .getElementById("botaoBannerPrimario")
    .addEventListener("click",()=>{

        console.log("Comprar");

    });

    document
    .getElementById("botaoBannerSecundario")
    .addEventListener("click",()=>{

        console.log("Ver Produtos");

    });

}

/* ==========================================================
   INICIALIZAÇÃO PARTE 1
========================================================== */

carregarHeader();

carregarMenu();

carregarBanner();

configurarHeader();

configurarBanner();/* ==========================================================
   BENEFÍCIOS
========================================================== */

const beneficios = [

    {

        titulo:"Frete Grátis",

        descricao:"Entrega para todo o Brasil.",

        icone:"fa-truck-fast"

    },

    {

        titulo:"Parcelamento",

        descricao:"Até 12x sem juros.",

        icone:"fa-credit-card"

    },

    {

        titulo:"Garantia",

        descricao:"Produtos originais com garantia.",

        icone:"fa-shield-halved"

    }

];

/* ==========================================================
   CATEGORIAS
========================================================== */

const categorias = [

    {

        id:1,

        nome:"PlayStation",

        descricao:"Consoles, jogos e acessórios.",

        imagem:"../assets/img/categorias/playstation.png",

        botao:"Ver Categoria"

    },

    {

        id:2,

        nome:"Xbox",

        descricao:"Tudo para Xbox Series.",

        imagem:"../assets/img/categorias/xbox.png",

        botao:"Ver Categoria"

    },

    {

        id:3,

        nome:"Nintendo",

        descricao:"Nintendo Switch e jogos.",

        imagem:"../assets/img/categorias/nintendo.png",

        botao:"Ver Categoria"

    },

    {

        id:4,

        nome:"PC Gamer",

        descricao:"Hardware e periféricos.",

        imagem:"../assets/img/categorias/pc.png",

        botao:"Ver Categoria"

    }

];

/* ==========================================================
   CARREGAR BENEFÍCIOS
========================================================== */

function carregarBeneficios(){

    document.getElementById("tituloFrete").textContent =
    beneficios[0].titulo;

    document.getElementById("descricaoFrete").textContent =
    beneficios[0].descricao;

    document
    .querySelector("#iconeFrete i")
    .className = "fa-solid " + beneficios[0].icone;

    document.getElementById("tituloParcelamento").textContent =
    beneficios[1].titulo;

    document.getElementById("descricaoParcelamento").textContent =
    beneficios[1].descricao;

    document
    .querySelector("#iconeParcelamento i")
    .className = "fa-regular " + beneficios[1].icone;

    document.getElementById("tituloGarantia").textContent =
    beneficios[2].titulo;

    document.getElementById("descricaoGarantia").textContent =
    beneficios[2].descricao;

    document
    .querySelector("#iconeGarantia i")
    .className = "fa-solid " + beneficios[2].icone;

}

/* ==========================================================
   TÍTULO CATEGORIAS
========================================================== */

function carregarTituloCategorias(){

    document.getElementById("tituloCategorias").textContent =
    "Categorias";

    document.getElementById("linkVerTodasCategorias").textContent =
    "Ver todas";

}

/* ==========================================================
   CARD CATEGORIA
========================================================== */

function criarCardCategoria(categoria){

    return `

        <div
            id="cardCategoria${categoria.id}"
            class="card-categoria">

            <div
                id="imagemCategoria${categoria.id}"
                class="imagem-categoria">

                <img
                    id="imgCategoria${categoria.id}"
                    class="img-categoria"
                    src="${categoria.imagem}"
                    alt="${categoria.nome}">

            </div>

            <div
                id="infoCategoria${categoria.id}"
                class="info-categoria">

                <h3
                    id="nomeCategoria${categoria.id}"
                    class="nome-categoria">

                    ${categoria.nome}

                </h3>

                <p
                    id="descricaoCategoria${categoria.id}"
                    class="descricao-categoria">

                    ${categoria.descricao}

                </p>

                <button
                    id="botaoCategoria${categoria.id}"
                    class="botao-categoria">

                    ${categoria.botao}

                </button>

            </div>

        </div>

    `;

}

/* ==========================================================
   CARREGAR CATEGORIAS
========================================================== */

function carregarCategorias(){

    const container =
    document.getElementById("containerCategorias");

    container.innerHTML = "";

    categorias.forEach(categoria=>{

        container.innerHTML +=
        criarCardCategoria(categoria);

    });

}

/* ==========================================================
   EVENTOS CATEGORIAS
========================================================== */

function configurarCategorias(){

    categorias.forEach(categoria=>{

        document
        .getElementById("botaoCategoria"+categoria.id)
        .addEventListener("click",()=>{

            console.log(

                "Categoria:",

                categoria.nome

            );

        });

    });

}

/* ==========================================================
   INICIALIZAÇÃO PARTE 2
========================================================== */

carregarBeneficios();

carregarTituloCategorias();

carregarCategorias();

configurarCategorias();