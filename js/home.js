"use strict";

/* ==========================================================
   HOME.JS

   Página Inicial da Loja de Games

   Responsável por:

   • Configurações da página
   • Dados da Home
   • Carregamento das imagens
   • Hero Banner
   • Categorias
   • Jogos
   • Promoções
   • Newsletter
   • Rodapé

========================================================== */


/* ==========================================================
   CONFIGURAÇÕES GERAIS

   Centraliza configurações utilizadas pela Home.
========================================================== */

const CONFIG = {

    moeda: "R$",

    idioma: "pt-BR",

    tema: "light"

};


/* ==========================================================
   DADOS DA HOME

   Todo o conteúdo da página ficará neste objeto.

   Futuramente poderá ser substituído por uma API
   sem alterar o restante do código.

========================================================== */

const HOME = {

    /* ==========================
       IMAGENS
    ========================== */

    imagens:{

        logo:"",

        heroBanner:"Banner.png",

        promotionBanner:"Banner2.png",

        searchIcon:"",

        notificationIcon:"",

        favoriteIcon:"",

        cartIcon:"",

        profileIcon:"",

        buyIcon:"",

        watchIcon:"",

        previousIcon:"",

        nextIcon:"",

        promotionButtonIcon:""

    },


    /* ==========================
       MENU
    ========================== */

    menu:[

        {

            texto:"",

            link:""

        }

    ],


    /* ==========================
       HERO BANNER
    ========================== */

    hero:{

        imagem:"",

        comprarTexto:"",

        comprarLink:"",

        trailerTexto:"",

        trailerLink:""

    },


    /* ==========================
       CATEGORIAS
    ========================== */

    categorias:[

        {

            id:1,

            nome:"",

            quantidade:"",

            icone:"",

            link:""

        }

    ],


    /* ==========================
       JOGOS

       Será preenchido na Parte 2.

    ========================== */

    jogos:[],


    /* ==========================
       PROMOÇÃO

       Será preenchido na Parte 2.

    ========================== */

    promocao:{},


    /* ==========================
       NEWSLETTER

       Será preenchido na Parte 2.

    ========================== */

    newsletter:{},


    /* ==========================
       RODAPÉ

       Será preenchido na Parte 2.

    ========================== */

    footer:{}

};


/* ==========================================================
   ELEMENTOS DA PÁGINA

   Centraliza todos os elementos do HTML para evitar
   chamadas repetidas ao DOM.

========================================================== */

const ELEMENTS = {

    /* Header */

    logo:

        document.getElementById("logo"),

    searchIcon:

        document.getElementById("searchIcon"),

    notificationIcon:

        document.getElementById("notificationIcon"),

    favoriteIcon:

        document.getElementById("favoriteIcon"),

    cartIcon:

        document.getElementById("cartIcon"),

    profileIcon:

        document.getElementById("profileIcon"),

    menu:

        document.getElementById("menu"),


    /* Hero */

    heroBanner:

        document.getElementById("heroBanner"),

    buyButton:

        document.getElementById("buyButton"),

    watchButton:

        document.getElementById("watchButton"),

    buyIcon:

        document.getElementById("buyIcon"),

    watchIcon:

        document.getElementById("watchIcon"),

    buyText:

        document.getElementById("buyText"),

    watchText:

        document.getElementById("watchText"),


    /* Categorias */

    categoriesContainer:

        document.getElementById("categoriesContainer"),

    categoriesTitle:

        document.getElementById("categoriesTitle"),

    categoriesLink:

        document.getElementById("categoriesLink")

};


/* ==========================================================
   FUNÇÕES AUXILIARES

========================================================== */

/**
 * Cria um novo elemento HTML.
 *
 * @param {String} tag
 * @param {String} className
 * @returns HTMLElement
 */

function createElement(tag, className = ""){

    const element = document.createElement(tag);

    if(className){

        element.className = className;

    }

    return element;

}


/**
 * Formata um valor monetário.
 *
 * @param {Number} valor
 * @returns String
 */

function formatPrice(valor){

    return valor.toLocaleString(

        CONFIG.idioma,

        {

            style:"currency",

            currency:"BRL"

        }

    );

}
/* ==========================================================
   DADOS DOS JOGOS

   Os cards serão criados automaticamente pelo JavaScript.

========================================================== */

HOME.jogos = [

    {

        id:1,

        nome:"",

        categoria:"",

        plataforma:"",

        preco:0,

        imagem:"",

        promocao:false,

        link:""

    }

];


/* ==========================================================
   PROMOÇÃO

========================================================== */

HOME.promocao = {

    imagem:"",

    botaoTexto:"",

    botaoLink:"",

    botaoIcone:""

};


/* ==========================================================
   NEWSLETTER

========================================================== */

HOME.newsletter = {

    titulo:"",

    descricao:"",

    placeholder:"",

    botao:""

};


/* ==========================================================
   REDES SOCIAIS

========================================================== */

HOME.footer = {

    descricao:"",

    copyright:"",


    /* ==========================
       REDES SOCIAIS
    ========================== */

    redes:[

        {

            nome:"",

            icone:"",

            link:""

        }

    ],


    /* ==========================
       PLATAFORMAS
    ========================== */

    plataformas:{

        titulo:"",

        links:[

            {

                texto:"",

                link:""

            }

        ]

    },


    /* ==========================
       SUPORTE
    ========================== */

    suporte:{

        titulo:"",

        links:[

            {

                texto:"",

                link:""

            }

        ]

    },


    /* ==========================
       MINHA CONTA
    ========================== */

    conta:{

        titulo:"",

        links:[

            {

                texto:"",

                link:""

            }

        ]

    }

};


/* ==========================================================
   ELEMENTOS DA PARTE INFERIOR DA HOME

========================================================== */

Object.assign(ELEMENTS,{


    /* ==========================
       Jogos
    ========================== */

    gamesTitle:

        document.getElementById("gamesTitle"),

    gamesContainer:

        document.getElementById("gamesContainer"),

    previousButton:

        document.getElementById("previousButton"),

    nextButton:

        document.getElementById("nextButton"),

    previousIcon:

        document.getElementById("previousIcon"),

    nextIcon:

        document.getElementById("nextIcon"),


    /* ==========================
       Promoção
    ========================== */

    promotionBanner:

        document.getElementById("promotionBanner"),

    promotionButton:

        document.getElementById("promotionButton"),

    promotionButtonText:

        document.getElementById("promotionButtonText"),

    promotionButtonIcon:

        document.getElementById("promotionButtonIcon"),


    /* ==========================
       Newsletter
    ========================== */

    newsletterTitle:

        document.getElementById("newsletterTitle"),

    newsletterDescription:

        document.getElementById("newsletterDescription"),

    newsletterEmail:

        document.getElementById("newsletterEmail"),

    newsletterButton:

        document.getElementById("newsletterButton"),

    newsletterButtonText:

        document.getElementById("newsletterButtonText"),


    /* ==========================
       Footer
    ========================== */

    footerLogo:

        document.getElementById("footerLogo"),

    footerDescription:

        document.getElementById("footerDescription"),

    socialContainer:

        document.getElementById("socialContainer"),

    platformsTitle:

        document.getElementById("platformsTitle"),

    platformsList:

        document.getElementById("platformsList"),

    supportTitle:

        document.getElementById("supportTitle"),

    supportList:

        document.getElementById("supportList"),

    accountTitle:

        document.getElementById("accountTitle"),

    accountList:

        document.getElementById("accountList"),

    copyright:

        document.getElementById("copyright")

});


/* ==========================================================
   UTILITÁRIO

   Remove todos os filhos de um elemento.

========================================================== */

function clearElement(element){

    while(element.firstChild){

        element.removeChild(

            element.firstChild

        );

    }

}


/* ==========================================================
   UTILITÁRIO

   Cria uma imagem HTML.

========================================================== */

function createImage(src,alt,className=""){

    const image=document.createElement("img");

    image.src=src;

    image.alt=alt;

    image.className=className;

    return image;

}


/* ==========================================================
   UTILITÁRIO

   Cria um link HTML.

========================================================== */

function createLink(texto,link){

    const a=document.createElement("a");

    a.textContent=texto;

    a.href=link;

    return a;

}
/* ==========================================================
   OBJETO PRINCIPAL DA HOME

   Responsável por montar toda a página.

========================================================== */

const App = {


    /* ======================================================
       CARREGA AS IMAGENS DO HEADER
    ====================================================== */

    carregarHeader(){

        ELEMENTS.logo.src = HOME.imagens.logo;

        ELEMENTS.searchIcon.src = HOME.imagens.searchIcon;

        ELEMENTS.notificationIcon.src =
            HOME.imagens.notificationIcon;

        ELEMENTS.favoriteIcon.src =
            HOME.imagens.favoriteIcon;

        ELEMENTS.cartIcon.src =
            HOME.imagens.cartIcon;

        ELEMENTS.profileIcon.src =
            HOME.imagens.profileIcon;

    },


    /* ======================================================
       MONTA O MENU SUPERIOR
    ====================================================== */

    carregarMenu(){

        clearElement(ELEMENTS.menu);

        HOME.menu.forEach(item=>{

            const link = createLink(

                item.texto,

                item.link

            );

            ELEMENTS.menu.appendChild(link);

        });

    },


    /* ======================================================
       CARREGA O HERO BANNER
    ====================================================== */

    carregarHero(){

        ELEMENTS.heroBanner.src =
            HOME.hero.imagem;

        ELEMENTS.buyIcon.src =
            HOME.imagens.buyIcon;

        ELEMENTS.watchIcon.src =
            HOME.imagens.watchIcon;

        ELEMENTS.buyText.textContent =
            HOME.hero.comprarTexto;

        ELEMENTS.watchText.textContent =
            HOME.hero.trailerTexto;

        ELEMENTS.buyButton.onclick=()=>{

            if(HOME.hero.comprarLink){

                location.href =
                    HOME.hero.comprarLink;

            }

        };

        ELEMENTS.watchButton.onclick=()=>{

            if(HOME.hero.trailerLink){

                window.open(

                    HOME.hero.trailerLink,

                    "_blank"

                );

            }

        };

    },


    /* ======================================================
       CRIA UM CARD DE CATEGORIA
    ====================================================== */

    criarCategoria(categoria){

        const card =
            createElement("div","categoryCard");


        const iconContainer =
            createElement("div","categoryIcon");


        const icon =
            createImage(

                categoria.icone,

                categoria.nome

            );


        iconContainer.appendChild(icon);


        const nome =
            createElement("h3","categoryName");

        nome.textContent =
            categoria.nome;


        const quantidade =
            createElement(

                "span",

                "categoryQuantity"

            );

        quantidade.textContent =
            categoria.quantidade;


        card.append(

            iconContainer,

            nome,

            quantidade

        );


        card.onclick=()=>{

            if(categoria.link){

                location.href =
                    categoria.link;

            }

        };


        return card;

    },


    /* ======================================================
       CARREGA TODAS AS CATEGORIAS
    ====================================================== */

    carregarCategorias(){

        clearElement(

            ELEMENTS.categoriesContainer

        );

        HOME.categorias.forEach(categoria=>{

            ELEMENTS.categoriesContainer.appendChild(

                this.criarCategoria(

                    categoria

                )

            );

        });

    },
        /* ======================================================
       CRIA UM CARD DE JOGO
    ====================================================== */

    criarJogo(jogo){

        const card = createElement("div","gameCard");

        const imagem = createImage(
            jogo.imagem,
            jogo.nome,
            "gameImage"
        );

        const content = createElement("div","gameContent");

        if(jogo.promocao){

            const badge = createElement("span","gameBadge");

            badge.textContent = "Promoção";

            content.appendChild(badge);

        }

        const titulo = createElement("h3","gameTitle");

        titulo.textContent = jogo.nome;

        const categoria = createElement("span","gameCategory");

        categoria.textContent = jogo.categoria;

        const footer = createElement("div","gameFooter");

        const preco = createElement("span","gamePrice");

        preco.textContent = formatPrice(jogo.preco);

        const botao = createElement("button","gameButton");

        const icone = createImage(

            HOME.imagens.buyIcon,

            "Comprar"

        );

        botao.appendChild(icone);

        botao.onclick=(e)=>{

            e.stopPropagation();

            if(jogo.link){

                location.href=jogo.link;

            }

        };

        footer.append(preco,botao);

        content.append(

            titulo,

            categoria,

            footer

        );

        card.append(

            imagem,

            content

        );

        card.onclick=()=>{

            if(jogo.link){

                location.href=jogo.link;

            }

        };

        return card;

    },


    /* ======================================================
       CARREGA JOGOS
    ====================================================== */

    carregarJogos(){

        clearElement(ELEMENTS.gamesContainer);

        HOME.jogos.forEach(jogo=>{

            ELEMENTS.gamesContainer.appendChild(

                this.criarJogo(jogo)

            );

        });

    },


    /* ======================================================
       CARREGA PROMOÇÃO
    ====================================================== */

    carregarPromocao(){

        ELEMENTS.promotionBanner.src =

            HOME.promocao.imagem;

        ELEMENTS.promotionButtonIcon.src =

            HOME.promocao.botaoIcone;

        ELEMENTS.promotionButtonText.textContent =

            HOME.promocao.botaoTexto;

        ELEMENTS.promotionButton.onclick=()=>{

            if(HOME.promocao.botaoLink){

                location.href=

                HOME.promocao.botaoLink;

            }

        };

    },


    /* ======================================================
       CARREGA NEWSLETTER
    ====================================================== */

    carregarNewsletter(){

        ELEMENTS.newsletterTitle.textContent=

            HOME.newsletter.titulo;

        ELEMENTS.newsletterDescription.textContent=

            HOME.newsletter.descricao;

        ELEMENTS.newsletterEmail.placeholder=

            HOME.newsletter.placeholder;

        ELEMENTS.newsletterButtonText.textContent=

            HOME.newsletter.botao;

    },


    /* ======================================================
       CARREGA RODAPÉ
    ====================================================== */

    carregarFooter(){

        ELEMENTS.footerLogo.src=

            HOME.imagens.logo;

        ELEMENTS.footerDescription.textContent=

            HOME.footer.descricao;

        ELEMENTS.platformsTitle.textContent=

            HOME.footer.plataformas.titulo;

        ELEMENTS.supportTitle.textContent=

            HOME.footer.suporte.titulo;

        ELEMENTS.accountTitle.textContent=

            HOME.footer.conta.titulo;

        ELEMENTS.copyright.textContent=

            HOME.footer.copyright;

        clearElement(ELEMENTS.socialContainer);

        HOME.footer.redes.forEach(rede=>{

            const link=createElement("a");

            link.href=rede.link;

            link.target="_blank";

            const img=createImage(

                rede.icone,

                rede.nome

            );

            link.appendChild(img);

            ELEMENTS.socialContainer.appendChild(link);

        });

        this.preencherLista(

            ELEMENTS.platformsList,

            HOME.footer.plataformas.links

        );

        this.preencherLista(

            ELEMENTS.supportList,

            HOME.footer.suporte.links

        );

        this.preencherLista(

            ELEMENTS.accountList,

            HOME.footer.conta.links

        );

    },


    /* ======================================================
       PREENCHE UMA LISTA
    ====================================================== */

    preencherLista(lista,dados){

        clearElement(lista);

        dados.forEach(item=>{

            const li=createElement("li");

            li.appendChild(

                createLink(

                    item.texto,

                    item.link

                )

            );

            lista.appendChild(li);

        });

    },


    /* ======================================================
       EVENTOS
    ====================================================== */

    eventos(){

        ELEMENTS.previousButton.onclick=()=>{

            console.log("Anterior");

        };

        ELEMENTS.nextButton.onclick=()=>{

            console.log("Próximo");

        };

        ELEMENTS.newsletterButton.onclick=()=>{

            console.log(

                ELEMENTS.newsletterEmail.value

            );

        };

    },


    /* ======================================================
       INICIALIZAÇÃO
    ====================================================== */

    iniciar(){

        this.carregarHeader();

        this.carregarMenu();

        this.carregarHero();

        this.carregarCategorias();

        this.carregarJogos();

        this.carregarPromocao();

        this.carregarNewsletter();

        this.carregarFooter();

        this.eventos();

    }

};


/* ==========================================================
   INICIALIZA A HOME

========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        App.iniciar();

    }

);
