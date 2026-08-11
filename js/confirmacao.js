/* ==========================================================
   DADOS DA PÁGINA
========================================================== */

const dadosConfirmacao = {

    sistema: "GamesStart",

    textoEtapaCarrinho: "Carrinho",

    textoEtapaFinalizacao: "Finalização da compra",

    textoEtapaConfirmacao: "Confirmação",

    tituloSucesso: "Pedido confirmado!",

    descricaoSucesso:
        "Recebemos seu pedido e enviaremos todas as atualizações para seu e-mail.",

    tituloInformacoesPedido: "Informações do Pedido",

    labelNumeroPedido: "Número do pedido",

    labelDataPedido: "Data da compra",

    labelEmailConfirmacao: "Confirmação enviada para",

    tituloEntrega: "Entrega",

    labelPrevisaoEntrega: "Previsão de entrega",

    labelEnderecoEntrega: "Endereço de entrega",

    tituloProximosPassos: "Próximos passos",

    passoUm:
        "Seu pagamento será analisado e confirmado.",

    passoDois:
        "Você receberá atualizações por e-mail.",

    passoTres:
        "Quando seu pedido for enviado, você receberá o código de rastreio.",

    tituloResumo: "Resumo do Pedido",

    labelDesconto: "Descontos aplicados",

    labelFrete: "Frete",

    labelTotal: "Total pago",

    textoMeusPedidos: "Ver meus pedidos",

    textoContinuarComprando: "Continuar comprando",

    textoCompraSegura: "Compra 100% segura",

    textoCarrinho: "Carrinho",

    textoWhatsapp: "WhatsApp",

    textoInstagram: "Instagram",

    textoFacebook: "Facebook",

    direitosAutorais:
        "© 2026 GamesStart Store. Todos os direitos reservados."

};


/* ==========================================================
   CONFIGURAÇÕES E ESTADO
========================================================== */

const CHAVE_PEDIDO = "pedidoProntoParaEnvio";

const CHAVE_CONFIRMACAO = "gamesStartConfirmacao";

let pedido = null;

let confirmacao = null;

let temporizadorNotificacao = null;


/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", iniciarPagina);

} else {

    iniciarPagina();

}

function iniciarPagina() {

    if (!carregarPedido()) {
        return;
    }

    criarOuCarregarConfirmacao();

    preencherTextos();

    preencherInformacoesPedido();

    renderizarResumo();

    adicionarEventos();

}


/* ==========================================================
   PEDIDO
========================================================== */

function carregarPedido() {

    try {

        const pedidoSalvo = sessionStorage.getItem(CHAVE_PEDIDO);

        if (!pedidoSalvo) {

            window.location.href = "carrinho.html";

            return false;

        }

        const dadosPedido = JSON.parse(pedidoSalvo);

        if (
            !dadosPedido ||
            !Array.isArray(dadosPedido.produtos) ||
            dadosPedido.produtos.length === 0
        ) {

            window.location.href = "carrinho.html";

            return false;

        }

        pedido = {

            cliente: dadosPedido.cliente || {},

            endereco: dadosPedido.endereco || {},

            entrega: dadosPedido.entrega || {},

            pagamento: dadosPedido.pagamento || {},

            produtos: dadosPedido.produtos
                .map(normalizarProduto)
                .filter(function (produto) {

                    return produto !== null;

                }),

            valores: dadosPedido.valores || {}

        };

        if (pedido.produtos.length === 0) {

            window.location.href = "carrinho.html";

            return false;

        }

        return true;

    } catch (erro) {

        window.location.href = "carrinho.html";

        return false;

    }

}


/* ==========================================================
   CONFIRMAÇÃO
========================================================== */

function criarOuCarregarConfirmacao() {

    try {

        const confirmacaoSalva = sessionStorage.getItem(
            CHAVE_CONFIRMACAO
        );

        if (confirmacaoSalva) {

            confirmacao = JSON.parse(confirmacaoSalva);

            return;

        }

    } catch (erro) {

        sessionStorage.removeItem(CHAVE_CONFIRMACAO);

    }

    const dataPedido = new Date();

    confirmacao = {

        numero: gerarNumeroPedido(),

        data: dataPedido.toISOString(),

        previsao: calcularPrevisaoEntrega(
            pedido.entrega.tipo,
            dataPedido
        )

    };

    sessionStorage.setItem(

        CHAVE_CONFIRMACAO,

        JSON.stringify(confirmacao)

    );

}

function gerarNumeroPedido() {

    const data = new Date();

    const ano = data.getFullYear();

    const mes = String(data.getMonth() + 1).padStart(2, "0");

    const dia = String(data.getDate()).padStart(2, "0");

    const aleatorio = Math.floor(
        10000 + Math.random() * 90000
    );

    return `GS-${ano}${mes}${dia}-${aleatorio}`;

}

function calcularPrevisaoEntrega(tipo, dataPedido) {

    const diasPorEntrega = {

        economica: 8,

        padrao: 4,

        expresso: 1

    };

    const dias = diasPorEntrega[tipo] || 8;

    const dataPrevisao = new Date(dataPedido);

    let diasAdicionados = 0;

    while (diasAdicionados < dias) {

        dataPrevisao.setDate(
            dataPrevisao.getDate() + 1
        );

        const diaSemana = dataPrevisao.getDay();

        if (diaSemana !== 0 && diaSemana !== 6) {
            diasAdicionados++;
        }

    }

    return dataPrevisao.toISOString();

}


/* ==========================================================
   TEXTOS
========================================================== */

function preencherTextos() {

    document.title = `${dadosConfirmacao.sistema} | Pedido Confirmado`;

    definirTexto("nomeSistema", dadosConfirmacao.sistema);

    definirTexto("nomeSistemaRodape", dadosConfirmacao.sistema);

    definirTexto(
        "textoEtapaCarrinho",
        dadosConfirmacao.textoEtapaCarrinho
    );

    definirTexto(
        "textoEtapaFinalizacao",
        dadosConfirmacao.textoEtapaFinalizacao
    );

    definirTexto(
        "textoEtapaConfirmacao",
        dadosConfirmacao.textoEtapaConfirmacao
    );

    definirTexto("tituloSucesso", dadosConfirmacao.tituloSucesso);

    definirTexto(
        "descricaoSucesso",
        dadosConfirmacao.descricaoSucesso
    );

    definirTexto(
        "tituloInformacoesPedido",
        dadosConfirmacao.tituloInformacoesPedido
    );

    definirTexto(
        "labelNumeroPedido",
        dadosConfirmacao.labelNumeroPedido
    );

    definirTexto(
        "labelDataPedido",
        dadosConfirmacao.labelDataPedido
    );

    definirTexto(
        "labelEmailConfirmacao",
        dadosConfirmacao.labelEmailConfirmacao
    );

    definirTexto("tituloEntrega", dadosConfirmacao.tituloEntrega);

    definirTexto(
        "labelPrevisaoEntrega",
        dadosConfirmacao.labelPrevisaoEntrega
    );

    definirTexto(
        "labelEnderecoEntrega",
        dadosConfirmacao.labelEnderecoEntrega
    );

    definirTexto(
        "tituloProximosPassos",
        dadosConfirmacao.tituloProximosPassos
    );

    definirTexto("passoUm", dadosConfirmacao.passoUm);

    definirTexto("passoDois", dadosConfirmacao.passoDois);

    definirTexto("passoTres", dadosConfirmacao.passoTres);

    definirTexto("tituloResumo", dadosConfirmacao.tituloResumo);

    definirTexto("labelDesconto", dadosConfirmacao.labelDesconto);

    definirTexto("labelFrete", dadosConfirmacao.labelFrete);

    definirTexto("labelTotal", dadosConfirmacao.labelTotal);

    definirTexto(
        "textoMeusPedidos",
        dadosConfirmacao.textoMeusPedidos
    );

    definirTexto(
        "textoContinuarComprando",
        dadosConfirmacao.textoContinuarComprando
    );

    definirTexto(
        "textoCompraSegura",
        dadosConfirmacao.textoCompraSegura
    );

    definirTexto("textoCarrinho", dadosConfirmacao.textoCarrinho);

    definirTexto("textoWhatsapp", dadosConfirmacao.textoWhatsapp);

    definirTexto("textoInstagram", dadosConfirmacao.textoInstagram);

    definirTexto("textoFacebook", dadosConfirmacao.textoFacebook);

    definirTexto(
        "textoDireitosAutorais",
        dadosConfirmacao.direitosAutorais
    );

}


/* ==========================================================
   INFORMAÇÕES DO PEDIDO
========================================================== */

function preencherInformacoesPedido() {

    const nomeCliente = pedido.cliente.nome || "Cliente";

    const primeiroNome = nomeCliente.split(" ")[0];

    definirTexto("nomeUsuario", `Olá, ${primeiroNome}`);

    definirTexto("contadorCarrinho", "0");

    definirTexto("numeroPedido", confirmacao.numero);

    definirTexto(
        "dataPedido",
        formatarData(confirmacao.data)
    );

    definirTexto(
        "emailConfirmacao",
        pedido.cliente.email || ""
    );

    definirTexto(
        "previsaoEntrega",
        formatarData(confirmacao.previsao)
    );

    definirTexto(
        "textoEnderecoEntrega",
        formatarEndereco()
    );

}


/* ==========================================================
   RESUMO
========================================================== */

function renderizarResumo() {

    const lista = document.getElementById("listaResumoProdutos");

    const template = document.getElementById("templateResumoProduto");

    lista.replaceChildren();

    const fragmentoLista = document.createDocumentFragment();

    pedido.produtos.forEach(function (produto) {

        const fragmento = template.content.cloneNode(true);

        const imagem = fragmento.querySelector(
            ".imagem-resumo-produto"
        );

        const nome = fragmento.querySelector(
            ".nome-resumo-produto"
        );

        const quantidade = fragmento.querySelector(
            ".quantidade-resumo-produto"
        );

        const preco = fragmento.querySelector(
            ".preco-resumo-produto"
        );

        imagem.src = produto.imagem;

        imagem.alt = produto.nome;

        imagem.addEventListener("error", function () {

            imagem.src = "../assets/produto-sem-imagem.png";

        }, { once: true });

        nome.textContent = produto.nome;

        quantidade.textContent =
            `Qtd: ${produto.quantidade}`;

        preco.textContent = formatarMoeda(
            produto.preco * produto.quantidade
        );

        fragmentoLista.appendChild(fragmento);

    });

    lista.appendChild(fragmentoLista);

    const subtotal = calcularSubtotal();

    const desconto = Math.max(
        0,
        Number(pedido.valores.desconto) || 0
    );

    const frete = Math.max(
        0,
        Number(pedido.valores.frete) || 0
    );

    const total = subtotal - desconto + frete;

    definirTexto(
        "labelSubtotal",
        `Subtotal (${quantidadeProdutos()} itens)`
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
        "textoFormaPagamento",
        `Pagamento via ${formatarMetodoPagamento()}`
    );

}


/* ==========================================================
   EVENTOS
========================================================== */

function adicionarEventos() {

    document.getElementById("linkMeusPedidos")
        .addEventListener("click", function (event) {

            event.preventDefault();

            mostrarNotificacao(
                "A tela de pedidos será criada em breve."
            );

        });

}


/* ==========================================================
   FORMATAÇÕES
========================================================== */

function formatarEndereco() {

    const endereco = pedido.endereco;

    const primeiraLinha = [

        endereco.rua,

        endereco.numero

    ].filter(Boolean).join(", ");

    const segundaLinha = [

        endereco.complemento,

        endereco.bairro

    ].filter(Boolean).join(" - ");

    const terceiraLinha = [

        endereco.cidade,

        endereco.estado

    ].filter(Boolean).join(" - ");

    const cep = endereco.cep
        ? formatarCep(endereco.cep)
        : "";

    return [

        primeiraLinha,

        segundaLinha,

        terceiraLinha,

        cep

    ].filter(Boolean).join(" | ");

}

function formatarMetodoPagamento() {

    const metodos = {

        cartao: "Cartão de crédito",

        pix: "Pix",

        boleto: "Boleto"

    };

    return metodos[pedido.pagamento.metodo] || "Pagamento";

}

function formatarData(data) {

    return new Intl.DateTimeFormat("pt-BR", {

        day: "2-digit",

        month: "long",

        year: "numeric"

    }).format(new Date(data));

}

function formatarCep(cep) {

    const numeros = String(cep).replace(/\D/g, "");

    return numeros.replace(/^(\d{5})(\d{3})$/, "$1-$2");

}


/* ==========================================================
   NOTIFICAÇÃO
========================================================== */

function mostrarNotificacao(mensagem) {

    const notificacao = document.getElementById("notificacao");

    definirTexto("textoNotificacao", mensagem);

    notificacao.hidden = false;

    clearTimeout(temporizadorNotificacao);

    temporizadorNotificacao = setTimeout(function () {

        notificacao.hidden = true;

    }, 4000);

}


/* ==========================================================
   UTILITÁRIOS
========================================================== */

function normalizarProduto(produto) {

    if (
        !produto ||
        typeof produto !== "object" ||
        !Number.isFinite(Number(produto.preco)) ||
        !Number.isFinite(Number(produto.quantidade)) ||
        typeof produto.nome !== "string"
    ) {
        return null;
    }

    return {

        nome: produto.nome,

        preco: Math.max(0, Number(produto.preco)),

        quantidade: Math.max(
            1,
            Number.parseInt(produto.quantidade, 10)
        ),

        imagem:
            typeof produto.imagem === "string"
                ? produto.imagem
                : "../assets/produto-sem-imagem.png"

    };

}

function calcularSubtotal() {

    return pedido.produtos.reduce(
        function (total, produto) {

            return total + (
                produto.preco * produto.quantidade
            );

        },
        0
    );

}

function quantidadeProdutos() {

    return pedido.produtos.reduce(
        function (total, produto) {

            return total + produto.quantidade;

        },
        0
    );

}

function definirTexto(id, texto) {

    const elemento = document.getElementById(id);

    if (elemento) {
        elemento.textContent = texto;
    }

}

function formatarMoeda(valor) {

    return new Intl.NumberFormat("pt-BR", {

        style: "currency",

        currency: "BRL"

    }).format(valor);

}