/* ==========================================================
   DADOS DA PÁGINA
========================================================== */

const dadosCarrinho = {

    sistema: "GamesStart",

    tituloCarrinho: "Meu Carrinho",

    textoSelecionarTodos: "Selecionar todos",

    textoRemoverTodos: "Remover todos",

    tituloResumo: "Resumo do Pedido",

    labelDesconto: "Descontos aplicados",

    labelFrete: "Frete estimado",

    labelCep: "Calcule o frete pelo CEP",

    placeholderCep: "00000-000",

    textoCalcularFrete: "Calcular",

    labelTotal: "Total Final",

    textoFinalizarCompra: "Finalizar Compra",

    textoContinuarComprando: "Continuar Comprando",

    textoCompraSegura: "Compra 100% Segura",

    tituloCupom: "Tem um cupom de desconto?",

    descricaoCupom:
        "Aplique seu código para economizar em sua compra.",

    placeholderCupom: "Código",

    textoAplicarCupom: "Aplicar",

    tituloCarrinhoVazio: "Seu carrinho está vazio",

    descricaoCarrinhoVazio:
        "Adicione alguns produtos para continuar sua compra.",

    textoContinuarComprandoVazio: "Continuar Comprando",

    textoFavoritos: "Favoritos",

    textoCarrinho: "Carrinho",

    textoWhatsapp: "WhatsApp",

    textoInstagram: "Instagram",

    textoFacebook: "Facebook",

    textoFecharModal: "Fechar",

    textoCancelar: "Cancelar",

    textoDesfazer: "Desfazer",

    direitosAutorais:
        "© 2026 GamesStart Store. Todos os direitos reservados."

};


/* ==========================================================
   CONFIGURAÇÕES
========================================================== */

const CHAVE_CARRINHO = "gamesStartCarrinho";

const ROTA_FINALIZACAO = "finalizar_compra.html";


/* ==========================================================
   PRODUTOS DE EXEMPLO
   Depois você trocará pelos produtos vindos da API/banco.
========================================================== */

const itensIniciais = [

    {
        id: 1,
        nome: "Console Nintendo Switch OLED",
        variacao: "64GB - White Edition",
        preco: 2499.00,
        quantidade: 1,
        selecionado: true,
        imagem: "../assets/nintendo-switch-oled.png"
    },

    {
        id: 2,
        nome: "Controle DualSense PS5",
        variacao: "Galactic Purple",
        preco: 424.15,
        quantidade: 1,
        selecionado: true,
        imagem: "../assets/controle-dualsense.png"
    },

    {
        id: 3,
        nome: "The Legend of Zelda: TOTK",
        variacao: "Switch - Physical Edition",
        preco: 329.90,
        quantidade: 1,
        selecionado: true,
        imagem: "../assets/zelda-totk.png"
    }

];


/* ==========================================================
   ESTADO
========================================================== */

let itensCarrinho = copiarItens(itensIniciais);

let percentualDesconto = 0;

let frete = 0;

let acaoPendente = null;

let itensRemovidos = [];

let temporizadorDesfazer = null;

let paginaIniciada = false;


/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", iniciarPagina);

} else {

    iniciarPagina();

}

function iniciarPagina() {

    if (paginaIniciada) {
        return;
    }

    paginaIniciada = true;

    carregarCarrinhoLocal();

    preencherTextos();

    adicionarEventos();

    renderizarCarrinho();

}


/* ==========================================================
   TEXTOS FIXOS
========================================================== */

function preencherTextos() {

    document.title = `${dadosCarrinho.sistema} | Carrinho`;

    definirTexto("nomeSistema", dadosCarrinho.sistema);

    definirTexto("nomeSistemaRodape", dadosCarrinho.sistema);

    definirTexto("tituloCarrinho", dadosCarrinho.tituloCarrinho);

    definirTexto(
        "textoSelecionarTodos",
        dadosCarrinho.textoSelecionarTodos
    );

    definirTexto(
        "textoRemoverTodos",
        dadosCarrinho.textoRemoverTodos
    );

    definirTexto("tituloResumo", dadosCarrinho.tituloResumo);

    definirTexto("labelDesconto", dadosCarrinho.labelDesconto);

    definirTexto("labelFrete", dadosCarrinho.labelFrete);

    definirTexto("labelCep", dadosCarrinho.labelCep);

    document.getElementById("inputCep").placeholder =
        dadosCarrinho.placeholderCep;

    definirTexto(
        "btnCalcularFrete",
        dadosCarrinho.textoCalcularFrete
    );

    definirTexto("labelTotal", dadosCarrinho.labelTotal);

    definirTexto(
        "textoFinalizarCompra",
        dadosCarrinho.textoFinalizarCompra
    );

    definirTexto(
        "linkContinuarComprando",
        dadosCarrinho.textoContinuarComprando
    );

    definirTexto(
        "textoCompraSegura",
        dadosCarrinho.textoCompraSegura
    );

    definirTexto("tituloCupom", dadosCarrinho.tituloCupom);

    definirTexto(
        "descricaoCupom",
        dadosCarrinho.descricaoCupom
    );

    document.getElementById("inputCupom").placeholder =
        dadosCarrinho.placeholderCupom;

    definirTexto(
        "btnAplicarCupom",
        dadosCarrinho.textoAplicarCupom
    );

    definirTexto(
        "tituloCarrinhoVazio",
        dadosCarrinho.tituloCarrinhoVazio
    );

    definirTexto(
        "descricaoCarrinhoVazio",
        dadosCarrinho.descricaoCarrinhoVazio
    );

    definirTexto(
        "linkContinuarComprandoVazio",
        dadosCarrinho.textoContinuarComprandoVazio
    );

    definirTexto("textoFavoritos", dadosCarrinho.textoFavoritos);

    definirTexto("textoCarrinho", dadosCarrinho.textoCarrinho);

    definirTexto("textoWhatsapp", dadosCarrinho.textoWhatsapp);

    definirTexto("textoInstagram", dadosCarrinho.textoInstagram);

    definirTexto("textoFacebook", dadosCarrinho.textoFacebook);

    definirTexto(
        "textoFecharModal",
        dadosCarrinho.textoFecharModal
    );

    definirTexto(
        "btnCancelarModal",
        dadosCarrinho.textoCancelar
    );

    definirTexto("btnDesfazer", dadosCarrinho.textoDesfazer);

    definirTexto(
        "textoDireitosAutorais",
        dadosCarrinho.direitosAutorais
    );

}


/* ==========================================================
   EVENTOS
========================================================== */

function adicionarEventos() {

    document.getElementById("checkSelecionarTodos")
        .addEventListener("change", selecionarTodos);

    document.getElementById("btnRemoverTodos")
        .addEventListener("click", solicitarRemocaoTodos);

    document.getElementById("btnAplicarCupom")
        .addEventListener("click", aplicarCupom);

    document.getElementById("btnCalcularFrete")
        .addEventListener("click", calcularFrete);

    document.getElementById("inputCep")
        .addEventListener("input", mascaraCep);

    document.getElementById("btnFinalizarCompra")
        .addEventListener("click", finalizarCompra);

    document.getElementById("btnCancelarModal")
        .addEventListener("click", fecharModal);

    document.getElementById("btnFecharModal")
        .addEventListener("click", fecharModal);

    document.getElementById("btnConfirmarModal")
        .addEventListener("click", executarAcaoPendente);

    document.getElementById("btnDesfazer")
        .addEventListener("click", desfazerRemocao);

    document.getElementById("modalConfirmacao")
        .addEventListener("click", function (event) {

            if (event.target.id === "modalConfirmacao") {
                fecharModal();
            }

        });

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            fecharModal();
        }

    });

}


/* ==========================================================
   RENDERIZAÇÃO
========================================================== */

function renderizarCarrinho() {

    const lista = document.getElementById("listaItensCarrinho");

    const template = document.getElementById("templateItemCarrinho");

    const carrinhoVazio = document.getElementById("carrinhoVazio");

    const cupomContainer = document.getElementById("cupomContainer");

    const acoesSelecao = document.getElementById("acoesSelecao");

    lista.replaceChildren();

    if (itensCarrinho.length === 0) {

        carrinhoVazio.hidden = false;

        cupomContainer.hidden = true;

        acoesSelecao.hidden = true;

        atualizarResumo();

        return;

    }

    carrinhoVazio.hidden = true;

    cupomContainer.hidden = false;

    acoesSelecao.hidden = false;

    const fragmentoLista = document.createDocumentFragment();

    itensCarrinho.forEach(function (produto) {

        const fragmentoItem = template.content.cloneNode(true);

        const item = fragmentoItem.querySelector(".item-carrinho");

        const checkbox = fragmentoItem.querySelector(".check-item");

        const imagem = fragmentoItem.querySelector(".imagem-produto");

        const nome = fragmentoItem.querySelector(".nome-produto");

        const variacao = fragmentoItem.querySelector(".variacao-produto");

        const precoUnitario = fragmentoItem.querySelector(".preco-unitario");

        const quantidade = fragmentoItem.querySelector(".quantidade-produto");

        const precoTotal = fragmentoItem.querySelector(".preco-total-item");

        const btnDiminuir = fragmentoItem.querySelector(
            ".btn-diminuir-quantidade"
        );

        const btnAumentar = fragmentoItem.querySelector(
            ".btn-aumentar-quantidade"
        );

        const btnRemover = fragmentoItem.querySelector(
            ".btn-remover-item"
        );

        item.dataset.id = produto.id;

        checkbox.checked = produto.selecionado;

        checkbox.setAttribute(
            "aria-label",
            `Selecionar ${produto.nome}`
        );

        imagem.src = produto.imagem;

        imagem.alt = produto.nome;

        imagem.addEventListener("error", function () {

            imagem.src = "../assets/produto-sem-imagem.png";

        }, { once: true });

        nome.textContent = produto.nome;

        variacao.textContent = produto.variacao;

        precoUnitario.textContent = formatarMoeda(produto.preco);

        quantidade.textContent = produto.quantidade;

        precoTotal.textContent = formatarMoeda(
            produto.preco * produto.quantidade
        );

        btnDiminuir.setAttribute(
            "aria-label",
            `Diminuir quantidade de ${produto.nome}`
        );

        btnAumentar.setAttribute(
            "aria-label",
            `Aumentar quantidade de ${produto.nome}`
        );

        btnRemover.setAttribute(
            "aria-label",
            `Remover ${produto.nome}`
        );

        checkbox.addEventListener("change", function () {

            alterarSelecaoProduto(produto.id, checkbox.checked);

        });

        btnDiminuir.addEventListener("click", function () {

            alterarQuantidade(produto.id, -1);

        });

        btnAumentar.addEventListener("click", function () {

            alterarQuantidade(produto.id, 1);

        });

        btnRemover.addEventListener("click", function () {

            solicitarRemocaoProduto(produto.id);

        });

        fragmentoLista.appendChild(fragmentoItem);

    });

    lista.appendChild(fragmentoLista);

    atualizarResumo();

}


/* ==========================================================
   SELEÇÃO
========================================================== */

function selecionarTodos(event) {

    const selecionar = event.target.checked;

    itensCarrinho.forEach(function (produto) {

        produto.selecionado = selecionar;

    });

    salvarCarrinhoLocal();

    renderizarCarrinho();

}

function alterarSelecaoProduto(idProduto, selecionado) {

    const produto = encontrarProduto(idProduto);

    if (!produto) {
        return;
    }

    produto.selecionado = selecionado;

    salvarCarrinhoLocal();

    atualizarResumo();

}


/* ==========================================================
   QUANTIDADE
========================================================== */

function alterarQuantidade(idProduto, alteracao) {

    const produto = encontrarProduto(idProduto);

    if (!produto) {
        return;
    }

    const novaQuantidade = produto.quantidade + alteracao;

    if (novaQuantidade < 1) {
        return;
    }

    produto.quantidade = novaQuantidade;

    salvarCarrinhoLocal();

    renderizarCarrinho();

}


/* ==========================================================
   REMOÇÃO
========================================================== */

function solicitarRemocaoProduto(idProduto) {

    const produto = encontrarProduto(idProduto);

    if (!produto) {
        return;
    }

    abrirModal(
        "Remover produto",
        `Deseja remover "${produto.nome}" do carrinho?`,
        "Remover",
        function () {

            itensRemovidos = [produto];

            itensCarrinho = itensCarrinho.filter(function (item) {

                return item.id !== idProduto;

            });

            percentualDesconto = 0;

            salvarCarrinhoLocal();

            renderizarCarrinho();

            mostrarNotificacao("Produto removido do carrinho.");

        }
    );

}

function solicitarRemocaoTodos() {

    if (itensCarrinho.length === 0) {
        return;
    }

    abrirModal(
        "Remover todos os produtos",
        "Deseja remover todos os produtos do carrinho?",
        "Remover todos",
        function () {

            itensRemovidos = copiarItens(itensCarrinho);

            itensCarrinho = [];

            percentualDesconto = 0;

            salvarCarrinhoLocal();

            renderizarCarrinho();

            mostrarNotificacao(
                "Todos os produtos foram removidos."
            );

        }
    );

}


/* ==========================================================
   NOTIFICAÇÃO E DESFAZER
========================================================== */

function mostrarNotificacao(mensagem) {

    const notificacao = document.getElementById("notificacao");

    definirTexto("textoNotificacao", mensagem);

    notificacao.hidden = false;

    clearTimeout(temporizadorDesfazer);

    temporizadorDesfazer = setTimeout(function () {

        notificacao.hidden = true;

        itensRemovidos = [];

    }, 5000);

}

function desfazerRemocao() {

    if (itensRemovidos.length === 0) {
        return;
    }

    const idsExistentes = new Set(

        itensCarrinho.map(function (produto) {
            return produto.id;
        })

    );

    const produtosParaRestaurar = itensRemovidos.filter(function (produto) {

        return !idsExistentes.has(produto.id);

    });

    itensCarrinho = [
        ...itensCarrinho,
        ...produtosParaRestaurar
    ];

    itensRemovidos = [];

    clearTimeout(temporizadorDesfazer);

    document.getElementById("notificacao").hidden = true;

    salvarCarrinhoLocal();

    renderizarCarrinho();

}


/* ==========================================================
   CUPOM
========================================================== */

function aplicarCupom() {

    const inputCupom = document.getElementById("inputCupom");

    const mensagem = document.getElementById("mensagemCupom");

    const cupom = inputCupom.value.trim().toUpperCase();

    mensagem.textContent = "";

    if (cupom === "") {

        percentualDesconto = 0;

        mensagem.style.color = "#ef4444";

        mensagem.textContent = "Digite um cupom para aplicar.";

        atualizarResumo();

        return;

    }

    if (cupom === "GAMES10") {

        percentualDesconto = 10;

        mensagem.style.color = "#16a34a";

        mensagem.textContent =
            "Cupom de 10% aplicado com sucesso.";

        atualizarResumo();

        return;

    }

    percentualDesconto = 0;

    mensagem.style.color = "#ef4444";

    mensagem.textContent = "Cupom inválido ou expirado.";

    atualizarResumo();

}


/* ==========================================================
   FRETE
========================================================== */

function mascaraCep(event) {

    let valor = event.target.value.replace(/\D/g, "");

    valor = valor.substring(0, 8);

    valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");

    event.target.value = valor;

}

function calcularFrete() {

    const cep = document.getElementById("inputCep").value;

    const mensagem = document.getElementById("mensagemFrete");

    const cepNumerico = cep.replace(/\D/g, "");

    mensagem.textContent = "";

    if (cepNumerico.length !== 8) {

        frete = 0;

        mensagem.style.color = "#ef4444";

        mensagem.textContent = "Informe um CEP válido.";

        atualizarResumo();

        return;

    }

    /*
       Futuramente, consulte sua API de frete aqui.
       Este exemplo usa frete grátis.
    */

    frete = 0;

    mensagem.style.color = "#16a34a";

    mensagem.textContent =
        "Frete grátis disponível para este CEP.";

    atualizarResumo();

}


/* ==========================================================
   RESUMO DO PEDIDO
========================================================== */

function atualizarResumo() {

    const produtosSelecionados = itensCarrinho.filter(function (produto) {

        return produto.selecionado;

    });

    const quantidadeTotal = itensCarrinho.reduce(
        function (total, produto) {

            return total + produto.quantidade;

        },
        0
    );

    const quantidadeSelecionada = produtosSelecionados.reduce(
        function (total, produto) {

            return total + produto.quantidade;

        },
        0
    );

    const subtotal = calcularSubtotal(produtosSelecionados);

    const desconto = subtotal * (percentualDesconto / 100);

    const total = Math.max(0, subtotal - desconto + frete);

    definirTexto("contadorCarrinho", quantidadeTotal);

    definirTexto(
        "labelSubtotal",
        `Subtotal (${quantidadeSelecionada} item${quantidadeSelecionada !== 1 ? "s" : ""} selecionado${quantidadeSelecionada !== 1 ? "s" : ""})`
    );

    definirTexto("valorSubtotal", formatarMoeda(subtotal));

    definirTexto(
        "valorDesconto",
        desconto > 0
            ? `- ${formatarMoeda(desconto)}`
            : formatarMoeda(0)
    );

    definirTexto(
        "valorFrete",
        frete === 0 ? "Grátis" : formatarMoeda(frete)
    );

    definirTexto("valorTotal", formatarMoeda(total));

    definirTexto(
        "textoParcelamento",
        total > 0
            ? `ou em até 10x de ${formatarMoeda(total / 10)} sem juros`
            : ""
    );

    document.getElementById("btnFinalizarCompra").disabled =
        produtosSelecionados.length === 0;

    atualizarCheckboxSelecionarTodos();

}

function atualizarCheckboxSelecionarTodos() {

    const checkbox = document.getElementById("checkSelecionarTodos");

    const quantidadeSelecionada = itensCarrinho.filter(function (produto) {

        return produto.selecionado;

    }).length;

    checkbox.checked =
        itensCarrinho.length > 0 &&
        quantidadeSelecionada === itensCarrinho.length;

    checkbox.indeterminate =
        quantidadeSelecionada > 0 &&
        quantidadeSelecionada < itensCarrinho.length;

}


/* ==========================================================
   FINALIZAÇÃO
========================================================== */

function finalizarCompra() {

    const produtosSelecionados = itensCarrinho.filter(function (produto) {

        return produto.selecionado;

    });

    if (produtosSelecionados.length === 0) {
        return;
    }

    const subtotal = calcularSubtotal(produtosSelecionados);

    const desconto = subtotal * (percentualDesconto / 100);

    const total = Math.max(0, subtotal - desconto + frete);

    const pedido = {

        produtos: produtosSelecionados,

        subtotal: subtotal,

        desconto: desconto,

        frete: frete,

        total: total

    };

    try {

        sessionStorage.setItem(
            "pedidoCheckout",
            JSON.stringify(pedido)
        );

        window.location.href = ROTA_FINALIZACAO;

    } catch (erro) {

        mostrarNotificacao(
            "Não foi possível preparar o pedido. Tente novamente."
        );

    }

}


/* ==========================================================
   MODAL
========================================================== */

function abrirModal(titulo, descricao, textoConfirmar, acao) {

    definirTexto("tituloModal", titulo);

    definirTexto("descricaoModal", descricao);

    definirTexto("btnConfirmarModal", textoConfirmar);

    acaoPendente = acao;

    document.getElementById("modalConfirmacao").hidden = false;

}

function fecharModal() {

    document.getElementById("modalConfirmacao").hidden = true;

    acaoPendente = null;

}

function executarAcaoPendente() {

    const acao = acaoPendente;

    fecharModal();

    if (typeof acao === "function") {
        acao();
    }

}


/* ==========================================================
   LOCAL STORAGE
========================================================== */

function salvarCarrinhoLocal() {

    try {

        localStorage.setItem(
            CHAVE_CARRINHO,
            JSON.stringify(itensCarrinho)
        );

    } catch (erro) {

        console.error("Não foi possível salvar o carrinho.", erro);

    }

}

function carregarCarrinhoLocal() {

    try {

        const carrinhoSalvo = localStorage.getItem(CHAVE_CARRINHO);

        if (carrinhoSalvo === null) {
            return;
        }

        const dados = JSON.parse(carrinhoSalvo);

        if (!Array.isArray(dados)) {

            localStorage.removeItem(CHAVE_CARRINHO);

            return;

        }

        itensCarrinho = dados
            .map(normalizarProduto)
            .filter(function (produto) {

                return produto !== null;

            });

    } catch (erro) {

        localStorage.removeItem(CHAVE_CARRINHO);

        itensCarrinho = copiarItens(itensIniciais);

    }

}


/* ==========================================================
   UTILITÁRIOS
========================================================== */

function definirTexto(id, texto) {

    const elemento = document.getElementById(id);

    if (elemento) {
        elemento.textContent = texto;
    }

}

function encontrarProduto(idProduto) {

    return itensCarrinho.find(function (produto) {

        return produto.id === idProduto;

    });

}

function calcularSubtotal(produtos) {

    return produtos.reduce(function (total, produto) {

        return total + (produto.preco * produto.quantidade);

    }, 0);

}

function copiarItens(itens) {

    return itens.map(function (produto) {

        return { ...produto };

    });

}

function normalizarProduto(produto) {

    if (
        !produto ||
        typeof produto !== "object" ||
        !Number.isFinite(Number(produto.id)) ||
        typeof produto.nome !== "string" ||
        !Number.isFinite(Number(produto.preco))
    ) {
        return null;
    }

    return {

        id: Number(produto.id),

        nome: produto.nome,

        variacao:
            typeof produto.variacao === "string"
                ? produto.variacao
                : "",

        preco: Math.max(0, Number(produto.preco)),

        quantidade: Math.max(
            1,
            Number.parseInt(produto.quantidade, 10) || 1
        ),

        selecionado:
            typeof produto.selecionado === "boolean"
                ? produto.selecionado
                : true,

        imagem:
            typeof produto.imagem === "string"
                ? produto.imagem
                : "../assets/produto-sem-imagem.png"

    };

}

function formatarMoeda(valor) {

    return new Intl.NumberFormat("pt-BR", {

        style: "currency",

        currency: "BRL"

    }).format(valor);

}