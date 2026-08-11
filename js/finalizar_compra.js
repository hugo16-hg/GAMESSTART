/* ==========================================================
   DADOS DA PÁGINA
========================================================== */

const dadosCheckout = {

    sistema: "GamesStart",

    textoEtapaCarrinho: "Carrinho",

    textoEtapaDadosPagamento: "Dados e Pagamento",

   textoEtapaDadosPagamento: "Finalização da compra",

textoEtapaFinalizacao: "Confirmação",

    tituloDadosCliente: "1. Dados do Cliente",

    tituloEndereco: "2. Endereço de Entrega",

    tituloEntrega: "3. Método de Entrega",

    tituloPagamento: "4. Pagamento",

    tituloResumo: "Resumo do Pedido",

    labelNome: "Nome completo",

    labelEmail: "E-mail",

    labelTelefone: "Telefone",

    labelCpf: "CPF",

    labelCep: "CEP",

    labelRua: "Rua / Logradouro",

    labelNumero: "Número",

    labelComplemento: "Complemento",

    labelBairro: "Bairro",

    labelCidade: "Cidade",

    labelEstado: "Estado",

    placeholderCep: "00000-000",

    textoBuscarCep: "Buscar",

    textoConfirmarEndereco: "Confirmar endereço",

    textoCartao: "Cartão de Crédito",

    textoPix: "Pix",

    textoBoleto: "Boleto",

    labelNumeroCartao: "Número do Cartão",

    labelNomeCartao: "Nome impresso no Cartão",

    labelValidadeCartao: "Validade (MM/AA)",

    labelCvvCartao: "CVV",

    placeholderNumeroCartao: "0000 0000 0000 0000",

    placeholderNomeCartao: "NOME IMPRESSO NO CARTÃO",

    placeholderValidadeCartao: "MM/AA",

    placeholderCvvCartao: "000",

    tituloPix: "Pagamento via Pix",

    descricaoPix:
        "Após finalizar a compra, o código Pix será gerado para pagamento.",

    tituloBoleto: "Pagamento via Boleto",

    descricaoBoleto:
        "Após finalizar a compra, o boleto será gerado para pagamento.",

    textoPagamentoSeguro:
        "Pagamento 100% criptografado e seguro",

    labelDesconto: "Descontos aplicados",

    labelFrete: "Frete",

    labelTotal: "Total Final",

    textoFinalizarCompra: "Finalizar Compra",

    textoVoltarCarrinho: "Voltar ao carrinho",

    textoCompraSegura: "Compra 100% Segura",

    textoCarrinho: "Carrinho",

    textoWhatsapp: "WhatsApp",

    textoInstagram: "Instagram",

    textoFacebook: "Facebook",

    direitosAutorais:
        "© 2026 GamesStart Store. Todos os direitos reservados."

};


/* ==========================================================
   OPÇÕES DE ENTREGA
========================================================== */

const opcoesEntrega = {

    economica: {

        titulo: "Econômico",

        prazo: "Até 8 dias úteis",

        preco: 0

    },

    padrao: {

        titulo: "Padrão",

        prazo: "Até 4 dias úteis",

        preco: 19.90

    },

    expresso: {

        titulo: "Expresso",

        prazo: "Até 24 horas",

        preco: 45.00

    }

};


/* ==========================================================
   ESTADO
========================================================== */

let pedidoCheckout = null;

let entregaSelecionada = "economica";

let pagamentoSelecionado = "cartao";

let enderecoConfirmado = false;

let pedidoFinalizado = false;

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

    if (!carregarPedidoCheckout()) {
        return;
    }

    preencherTextos();

    preencherDadosCliente();

    configurarEventos();

    selecionarEntrega("economica");

    selecionarPagamento("cartao");

    renderizarResumo();

}


/* ==========================================================
   PEDIDO RECEBIDO DO CARRINHO
========================================================== */

function carregarPedidoCheckout() {

    try {

        const pedidoSalvo = sessionStorage.getItem("pedidoCheckout");

        if (!pedidoSalvo) {

            window.location.href = "carrinho.html";

            return false;

        }

        const pedido = JSON.parse(pedidoSalvo);

        if (!pedido || !Array.isArray(pedido.produtos)) {

            window.location.href = "carrinho.html";

            return false;

        }

        const produtosValidos = pedido.produtos
            .map(normalizarProduto)
            .filter(function (produto) {

                return produto !== null;

            });

        if (produtosValidos.length === 0) {

            window.location.href = "carrinho.html";

            return false;

        }

        pedidoCheckout = {

            produtos: produtosValidos,

            desconto: Math.max(0, Number(pedido.desconto) || 0)

        };

        return true;

    } catch (erro) {

        window.location.href = "carrinho.html";

        return false;

    }

}


/* ==========================================================
   TEXTOS
========================================================== */

function preencherTextos() {

    document.title = `${dadosCheckout.sistema} | Finalizar Compra`;

    definirTexto("nomeSistema", dadosCheckout.sistema);

    definirTexto("nomeSistemaRodape", dadosCheckout.sistema);

    definirTexto(
        "textoEtapaCarrinho",
        dadosCheckout.textoEtapaCarrinho
    );

    definirTexto(
        "textoEtapaDadosPagamento",
        dadosCheckout.textoEtapaDadosPagamento
    );

    definirTexto(
        "textoEtapaFinalizacao",
        dadosCheckout.textoEtapaFinalizacao
    );

    definirTexto("tituloCheckout", dadosCheckout.tituloCheckout);

    definirTexto(
        "tituloDadosCliente",
        dadosCheckout.tituloDadosCliente
    );

    definirTexto(
        "tituloEndereco",
        dadosCheckout.tituloEndereco
    );

    definirTexto(
        "tituloEntrega",
        dadosCheckout.tituloEntrega
    );

    definirTexto(
        "tituloPagamento",
        dadosCheckout.tituloPagamento
    );

    definirTexto("tituloResumo", dadosCheckout.tituloResumo);

    definirTexto("labelNome", dadosCheckout.labelNome);

    definirTexto("labelEmail", dadosCheckout.labelEmail);

    definirTexto("labelTelefone", dadosCheckout.labelTelefone);

    definirTexto("labelCpf", dadosCheckout.labelCpf);

    definirTexto("labelCep", dadosCheckout.labelCep);

    definirTexto("labelRua", dadosCheckout.labelRua);

    definirTexto("labelNumero", dadosCheckout.labelNumero);

    definirTexto(
        "labelComplemento",
        dadosCheckout.labelComplemento
    );

    definirTexto("labelBairro", dadosCheckout.labelBairro);

    definirTexto("labelCidade", dadosCheckout.labelCidade);

    definirTexto("labelEstado", dadosCheckout.labelEstado);

    document.getElementById("inputCep").placeholder =
        dadosCheckout.placeholderCep;

    definirTexto("btnBuscarCep", dadosCheckout.textoBuscarCep);

    document.getElementById("inputRua").placeholder =
    "Preenchido ao buscar CEP";

document.getElementById("inputNumero").placeholder =
    "Ex.: 123";

document.getElementById("inputComplemento").placeholder =
    "Apto. 42, bloco B (opcional)";

document.getElementById("inputBairro").placeholder =
    "Preenchido ao buscar CEP";

document.getElementById("inputCidade").placeholder =
    "Preenchido ao buscar CEP";

document.getElementById("inputEstado").placeholder =
    "UF";

    definirTexto(
        "btnConfirmarEndereco",
        dadosCheckout.textoConfirmarEndereco
    );

    definirTexto(
        "textoPagamentoCartao",
        dadosCheckout.textoCartao
    );

    definirTexto("textoPagamentoPix", dadosCheckout.textoPix);

    definirTexto(
        "textoPagamentoBoleto",
        dadosCheckout.textoBoleto
    );

    definirTexto(
        "labelNumeroCartao",
        dadosCheckout.labelNumeroCartao
    );

    definirTexto(
        "labelNomeCartao",
        dadosCheckout.labelNomeCartao
    );

    definirTexto(
        "labelValidadeCartao",
        dadosCheckout.labelValidadeCartao
    );

    definirTexto(
        "labelCvvCartao",
        dadosCheckout.labelCvvCartao
    );

    document.getElementById("inputNumeroCartao").placeholder =
        dadosCheckout.placeholderNumeroCartao;

    document.getElementById("inputNomeCartao").placeholder =
        dadosCheckout.placeholderNomeCartao;

    document.getElementById("inputValidadeCartao").placeholder =
        dadosCheckout.placeholderValidadeCartao;

    document.getElementById("inputCvvCartao").placeholder =
        dadosCheckout.placeholderCvvCartao;

    definirTexto("tituloPix", dadosCheckout.tituloPix);

    definirTexto("descricaoPix", dadosCheckout.descricaoPix);

    definirTexto("tituloBoleto", dadosCheckout.tituloBoleto);

    definirTexto("descricaoBoleto", dadosCheckout.descricaoBoleto);

    definirTexto(
        "textoPagamentoSeguro",
        dadosCheckout.textoPagamentoSeguro
    );

    definirTexto("labelDesconto", dadosCheckout.labelDesconto);

    definirTexto("labelFrete", dadosCheckout.labelFrete);

    definirTexto("labelTotal", dadosCheckout.labelTotal);

    definirTexto(
        "textoFinalizarCompra",
        dadosCheckout.textoFinalizarCompra
    );

    definirTexto(
        "linkVoltarCarrinho",
        dadosCheckout.textoVoltarCarrinho
    );

    definirTexto(
        "textoCompraSegura",
        dadosCheckout.textoCompraSegura
    );

    definirTexto("textoCarrinho", dadosCheckout.textoCarrinho);

    definirTexto("textoWhatsapp", dadosCheckout.textoWhatsapp);

    definirTexto("textoInstagram", dadosCheckout.textoInstagram);

    definirTexto("textoFacebook", dadosCheckout.textoFacebook);

    definirTexto(
        "textoDireitosAutorais",
        dadosCheckout.direitosAutorais
    );

    preencherTextosEntrega();

}


/* ==========================================================
   DADOS DO CLIENTE
========================================================== */

function preencherDadosCliente() {

    document.getElementById("inputNome").value = "";

    document.getElementById("inputEmail").value = "";

    document.getElementById("inputTelefone").value = "";

    document.getElementById("inputCpf").value = "";

    document.getElementById("inputNome").placeholder =
        "Digite seu nome completo";

    document.getElementById("inputEmail").placeholder =
        "Digite seu e-mail";

    document.getElementById("inputTelefone").placeholder =
        "(00) 00000-0000";

    document.getElementById("inputCpf").placeholder =
        "000.000.000-00";

    document.getElementById("nomeUsuario").textContent =
        "Olá, usuário";

}

/* ==========================================================
   EVENTOS
========================================================== */

function configurarEventos() {

    document.getElementById("formCheckout")
        .addEventListener("submit", finalizarCompra);

    document.getElementById("btnBuscarCep")
        .addEventListener("click", buscarCep);

    document.getElementById("btnConfirmarEndereco")
        .addEventListener("click", confirmarEndereco);

    document.getElementById("inputCep")
        .addEventListener("input", mascaraCep);

    document.getElementById("inputTelefone")
        .addEventListener("input", mascaraTelefone);

    document.getElementById("inputCpf")
        .addEventListener("input", mascaraCpf);

    document.getElementById("inputNumeroCartao")
        .addEventListener("input", mascaraNumeroCartao);

    document.getElementById("inputValidadeCartao")
        .addEventListener("input", mascaraValidadeCartao);

    document.getElementById("inputCvvCartao")
        .addEventListener("input", mascaraCvv);

    document.querySelectorAll(
        "input[name='metodoEntrega']"
    ).forEach(function (input) {

        input.addEventListener("change", function () {

            selecionarEntrega(input.value);

        });

    });

    document.querySelectorAll(
        "input[name='metodoPagamento']"
    ).forEach(function (input) {

        input.addEventListener("change", function () {

            selecionarPagamento(input.value);

        });

    });

    const camposEndereco = [

        "inputCep",
        "inputRua",
        "inputNumero",
        "inputComplemento",
        "inputBairro",
        "inputCidade",
        "inputEstado"

    ];

    camposEndereco.forEach(function (id) {

        document.getElementById(id)
            .addEventListener("input", function () {

                enderecoConfirmado = false;

            });

    });

}


/* ==========================================================
   ENTREGA
========================================================== */

function preencherTextosEntrega() {

    definirTexto(
        "tituloEntregaEconomica",
        opcoesEntrega.economica.titulo
    );

    definirTexto(
        "prazoEntregaEconomica",
        opcoesEntrega.economica.prazo
    );

    definirTexto(
        "precoEntregaEconomica",
        "Grátis"
    );

    definirTexto(
        "tituloEntregaPadrao",
        opcoesEntrega.padrao.titulo
    );

    definirTexto(
        "prazoEntregaPadrao",
        opcoesEntrega.padrao.prazo
    );

    definirTexto(
        "precoEntregaPadrao",
        formatarMoeda(opcoesEntrega.padrao.preco)
    );

    definirTexto(
        "tituloEntregaExpresso",
        opcoesEntrega.expresso.titulo
    );

    definirTexto(
        "prazoEntregaExpresso",
        opcoesEntrega.expresso.prazo
    );

    definirTexto(
        "precoEntregaExpresso",
        formatarMoeda(opcoesEntrega.expresso.preco)
    );

}

function selecionarEntrega(metodo) {

    if (!opcoesEntrega[metodo]) {
        return;
    }

    entregaSelecionada = metodo;

    document.querySelectorAll(
        "input[name='metodoEntrega']"
    ).forEach(function (input) {

        const card = input.closest(".card-opcao");

        const selecionado = input.value === metodo;

        input.checked = selecionado;

        card.classList.toggle(
            "card-opcao-selecionada",
            selecionado
        );

        const icone = card.querySelector(".icone-selecao");

        icone.className = selecionado
            ? "fa-solid fa-circle-check icone-selecao"
            : "fa-regular fa-circle icone-selecao";

    });

    renderizarResumo();

}


/* ==========================================================
   PAGAMENTO
========================================================== */

function selecionarPagamento(metodo) {

    const metodosValidos = ["cartao", "pix", "boleto"];

    if (!metodosValidos.includes(metodo)) {
        return;
    }

    pagamentoSelecionado = metodo;

    document.querySelectorAll(
        "input[name='metodoPagamento']"
    ).forEach(function (input) {

        const card = input.closest(".metodo-pagamento");

        const selecionado = input.value === metodo;

        input.checked = selecionado;

        card.classList.toggle(
            "metodo-pagamento-ativo",
            selecionado
        );

    });

    const formCartao = document.getElementById("formCartao");

    const painelPix = document.getElementById("painelPix");

    const painelBoleto = document.getElementById("painelBoleto");

    formCartao.hidden = metodo !== "cartao";

    painelPix.hidden = metodo !== "pix";

    painelBoleto.hidden = metodo !== "boleto";

    const camposCartao = [

        "inputNumeroCartao",
        "inputNomeCartao",
        "inputValidadeCartao",
        "inputCvvCartao"

    ];

    camposCartao.forEach(function (id) {

        document.getElementById(id).required =
            metodo === "cartao";

    });

    document.getElementById("mensagemPagamento").textContent = "";

}


/* ==========================================================
   CEP
========================================================== */

async function buscarCep() {

    const inputCep = document.getElementById("inputCep");

    const mensagem = document.getElementById("mensagemCep");

    const cep = inputCep.value.replace(/\D/g, "");

    mensagem.textContent = "";

    if (cep.length !== 8) {

        exibirMensagem(
            mensagem,
            "Informe um CEP válido.",
            "erro"
        );

        return;

    }

    const botao = document.getElementById("btnBuscarCep");

    botao.disabled = true;

    botao.textContent = "...";

    try {

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        if (!resposta.ok) {
            throw new Error("Não foi possível consultar o CEP.");
        }

        const endereco = await resposta.json();

        if (endereco.erro) {
            throw new Error("CEP não encontrado.");
        }

        document.getElementById("inputRua").value =
            endereco.logradouro || "";

        document.getElementById("inputBairro").value =
            endereco.bairro || "";

        document.getElementById("inputCidade").value =
            endereco.localidade || "";

        document.getElementById("inputEstado").value =
            endereco.uf || "";

        if (endereco.complemento) {

            document.getElementById("inputComplemento").value =
                endereco.complemento;

        }

        enderecoConfirmado = false;

        document.getElementById("inputNumero").focus();

        exibirMensagem(
            mensagem,
            "Endereço encontrado. Informe o número e confirme.",
            "sucesso"
        );

    } catch (erro) {

        exibirMensagem(
            mensagem,
            erro.message || "Erro ao buscar o CEP.",
            "erro"
        );

    } finally {

        botao.disabled = false;

        botao.textContent = dadosCheckout.textoBuscarCep;

    }

}

function confirmarEndereco() {

    const mensagem = document.getElementById("mensagemCep");

    if (!validarEndereco()) {

        exibirMensagem(
            mensagem,
            "Preencha todos os campos obrigatórios do endereço.",
            "erro"
        );

        return;

    }

    enderecoConfirmado = true;

    exibirMensagem(
        mensagem,
        "Endereço confirmado com sucesso.",
        "sucesso"
    );

}


/* ==========================================================
   RESUMO DO PEDIDO
========================================================== */

function renderizarResumo() {

    const lista = document.getElementById("listaResumoProdutos");

    const template = document.getElementById("templateResumoProduto");

    lista.replaceChildren();

    const fragmentoLista = document.createDocumentFragment();

    pedidoCheckout.produtos.forEach(function (produto) {

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

    const desconto = Math.min(
        pedidoCheckout.desconto,
        subtotal
    );

    const frete = opcoesEntrega[entregaSelecionada].preco;

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
        "textoParcelamento",
        `10x de ${formatarMoeda(total / 10)} sem juros`
    );

}


/* ==========================================================
   FINALIZAR COMPRA
========================================================== */

function finalizarCompra(event) {

    event.preventDefault();

    if (pedidoFinalizado) {
        return;
    }

    const form = document.getElementById("formCheckout");

    if (!form.reportValidity()) {
        mostrarNotificacao(
            "Preencha os campos obrigatórios para continuar.",
            "erro"
        );

        return;
    }

    if (!validarCpf(document.getElementById("inputCpf").value)) {

        mostrarNotificacao("Informe um CPF válido.", "erro");

        document.getElementById("inputCpf").focus();

        return;

    }

    if (!enderecoConfirmado) {

        mostrarNotificacao(
            "Confirme seu endereço antes de finalizar.",
            "erro"
        );

        document.getElementById("btnConfirmarEndereco").focus();

        return;

    }

    if (
        pagamentoSelecionado === "cartao" &&
        !validarDadosCartao()
    ) {
        return;
    }

    const pedidoFinal = criarPedidoFinal();

    /*
       Aqui entrará a integração com o seu Node.js.

       Exemplo futuro:
       fetch("http://localhost:3000/pedidos", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(pedidoFinal)
       })
    */

   sessionStorage.setItem(
    "pedidoProntoParaEnvio",
    JSON.stringify(pedidoFinal)
);

window.location.href = "confirmacao.html";

    pedidoFinalizado = true;

    document.getElementById("btnFinalizarCompra").disabled = true;

    document.getElementById("etapaDadosPagamento")
        .classList.remove("etapa-ativa");

    document.getElementById("etapaFinalizacao")
        .classList.add("etapa-ativa");

    mostrarNotificacao(
        "Dados validados. Pedido pronto para ser enviado ao servidor.",
        "sucesso"
    );

}


/* ==========================================================
   VALIDAÇÕES
========================================================== */

function validarEndereco() {

    const campos = [

        "inputCep",
        "inputRua",
        "inputNumero",
        "inputBairro",
        "inputCidade",
        "inputEstado"

    ];

    return campos.every(function (id) {

        return document.getElementById(id).value.trim() !== "";

    });

}

function validarCpf(valor) {

    const cpf = valor.replace(/\D/g, "");

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }

    let soma = 0;

    for (let i = 0; i < 9; i++) {
        soma += Number(cpf.charAt(i)) * (10 - i);
    }

    let primeiroDigito = (soma * 10) % 11;

    if (primeiroDigito === 10) {
        primeiroDigito = 0;
    }

    if (primeiroDigito !== Number(cpf.charAt(9))) {
        return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
        soma += Number(cpf.charAt(i)) * (11 - i);
    }

    let segundoDigito = (soma * 10) % 11;

    if (segundoDigito === 10) {
        segundoDigito = 0;
    }

    return segundoDigito === Number(cpf.charAt(10));

}

function validarDadosCartao() {

    const numeroCartao = document.getElementById(
        "inputNumeroCartao"
    ).value;

    const validade = document.getElementById(
        "inputValidadeCartao"
    ).value;

    const cvv = document.getElementById(
        "inputCvvCartao"
    ).value;

    const mensagem = document.getElementById(
        "mensagemPagamento"
    );

    if (!validarNumeroCartao(numeroCartao)) {

        exibirMensagem(
            mensagem,
            "Informe um número de cartão válido.",
            "erro"
        );

        return false;

    }

    if (!validarValidadeCartao(validade)) {

        exibirMensagem(
            mensagem,
            "Informe uma validade válida.",
            "erro"
        );

        return false;

    }

    if (!/^\d{3,4}$/.test(cvv)) {

        exibirMensagem(
            mensagem,
            "Informe um CVV válido.",
            "erro"
        );

        return false;

    }

    mensagem.textContent = "";

    return true;

}

function validarNumeroCartao(valor) {

    const numero = valor.replace(/\D/g, "");

    if (numero.length < 13 || numero.length > 19) {
        return false;
    }

    let soma = 0;

    let deveDobrar = false;

    for (let i = numero.length - 1; i >= 0; i--) {

        let digito = Number(numero.charAt(i));

        if (deveDobrar) {

            digito *= 2;

            if (digito > 9) {
                digito -= 9;
            }

        }

        soma += digito;

        deveDobrar = !deveDobrar;

    }

    return soma % 10 === 0;

}

function validarValidadeCartao(valor) {

    const partes = valor.split("/");

    if (partes.length !== 2) {
        return false;
    }

    const mes = Number(partes[0]);

    const ano = Number(partes[1]);

    if (mes < 1 || mes > 12 || !Number.isInteger(ano)) {
        return false;
    }

    const agora = new Date();

    const anoAtual = Number(
        String(agora.getFullYear()).slice(-2)
    );

    const mesAtual = agora.getMonth() + 1;

    return ano > anoAtual ||
        (ano === anoAtual && mes >= mesAtual);

}


/* ==========================================================
   MÁSCARAS
========================================================== */

function mascaraCep(event) {

    let valor = event.target.value.replace(/\D/g, "");

    valor = valor.substring(0, 8);

    valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");

    event.target.value = valor;

}

function mascaraTelefone(event) {

    let valor = event.target.value.replace(/\D/g, "");

    valor = valor.substring(0, 11);

    if (valor.length <= 10) {

        valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");

        valor = valor.replace(/(\d{4})(\d)/, "$1-$2");

    } else {

        valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");

        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

    }

    event.target.value = valor;

}

function mascaraCpf(event) {

    let valor = event.target.value.replace(/\D/g, "");

    valor = valor.substring(0, 11);

    valor = valor.replace(/^(\d{3})(\d)/, "$1.$2");

    valor = valor.replace(
        /^(\d{3})\.(\d{3})(\d)/,
        "$1.$2.$3"
    );

    valor = valor.replace(
        /\.(\d{3})(\d{1,2})$/,
        ".$1-$2"
    );

    event.target.value = valor;

}

function mascaraNumeroCartao(event) {

    let valor = event.target.value.replace(/\D/g, "");

    valor = valor.substring(0, 19);

    valor = valor.replace(/(\d{4})(?=\d)/g, "$1 ");

    event.target.value = valor.trim();

}

function mascaraValidadeCartao(event) {

    let valor = event.target.value.replace(/\D/g, "");

    valor = valor.substring(0, 4);

    valor = valor.replace(/^(\d{2})(\d)/, "$1/$2");

    event.target.value = valor;

}

function mascaraCvv(event) {

    event.target.value = event.target.value
        .replace(/\D/g, "")
        .substring(0, 4);

}


/* ==========================================================
   PEDIDO FINAL
========================================================== */

function criarPedidoFinal() {

    const subtotal = calcularSubtotal();

    const desconto = Math.min(
        pedidoCheckout.desconto,
        subtotal
    );

    const frete = opcoesEntrega[entregaSelecionada].preco;

    return {

        cliente: {

            nome: document.getElementById("inputNome").value.trim(),

            email: document.getElementById("inputEmail").value.trim(),

            telefone: document.getElementById("inputTelefone").value
                .replace(/\D/g, ""),

            cpf: document.getElementById("inputCpf").value
                .replace(/\D/g, "")

        },

        endereco: {

            cep: document.getElementById("inputCep").value
                .replace(/\D/g, ""),

            rua: document.getElementById("inputRua").value.trim(),

            numero: document.getElementById("inputNumero").value.trim(),

            complemento: document.getElementById(
                "inputComplemento"
            ).value.trim(),

            bairro: document.getElementById("inputBairro").value.trim(),

            cidade: document.getElementById("inputCidade").value.trim(),

            estado: document.getElementById("inputEstado").value
                .trim()
                .toUpperCase()

        },

        produtos: pedidoCheckout.produtos,

        entrega: {

            tipo: entregaSelecionada,

            preco: frete

        },

        pagamento: {

            metodo: pagamentoSelecionado

        },

        valores: {

            subtotal: subtotal,

            desconto: desconto,

            frete: frete,

            total: subtotal - desconto + frete

        }

    };

}


/* ==========================================================
   CLIENTE LOCAL
========================================================== */

function carregarClienteLocal() {

    const clientePadrao = {

        nome: "João Silva Santos",

        primeiroNome: "Olá, João",

        email: "joao.santos@exemplo.com",

        telefone: "(11) 99999-9999",

        cpf: "529.982.247-25"

    };

    try {

        const clienteSalvo = localStorage.getItem(
            "gamesStartUsuario"
        );

        if (!clienteSalvo) {
            return clientePadrao;
        }

        const cliente = JSON.parse(clienteSalvo);

        return {

            nome: cliente.nome || clientePadrao.nome,

            primeiroNome: cliente.primeiroNome ||
                `Olá, ${(cliente.nome || "Usuário").split(" ")[0]}`,

            email: cliente.email || clientePadrao.email,

            telefone: cliente.telefone || clientePadrao.telefone,

            cpf: cliente.cpf || clientePadrao.cpf

        };

    } catch (erro) {

        return clientePadrao;

    }

}


/* ==========================================================
   NOTIFICAÇÃO
========================================================== */

function mostrarNotificacao(mensagem, tipo) {

    const notificacao = document.getElementById("notificacao");

    definirTexto("textoNotificacao", mensagem);

    notificacao.classList.remove(
        "notificacao-erro",
        "notificacao-sucesso"
    );

    notificacao.classList.add(
        tipo === "erro"
            ? "notificacao-erro"
            : "notificacao-sucesso"
    );

    notificacao.hidden = false;

    clearTimeout(temporizadorNotificacao);

    temporizadorNotificacao = setTimeout(function () {

        notificacao.hidden = true;

    }, 5000);

}

function exibirMensagem(elemento, mensagem, tipo) {

    elemento.textContent = mensagem;

    elemento.style.color =
        tipo === "erro"
            ? "#ef4444"
            : "#16a34a";

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

function normalizarProduto(produto) {

    if (
        !produto ||
        typeof produto !== "object" ||
        !Number.isFinite(Number(produto.id)) ||
        !Number.isFinite(Number(produto.preco)) ||
        typeof produto.nome !== "string"
    ) {
        return null;
    }

    return {

        id: Number(produto.id),

        nome: produto.nome,

        preco: Math.max(0, Number(produto.preco)),

        quantidade: Math.max(
            1,
            Number.parseInt(produto.quantidade, 10) || 1
        ),

        imagem:
            typeof produto.imagem === "string"
                ? produto.imagem
                : "../assets/produto-sem-imagem.png"

    };

}

function calcularSubtotal() {

    return pedidoCheckout.produtos.reduce(
        function (total, produto) {

            return total + (
                produto.preco * produto.quantidade
            );

        },
        0
    );

}

function quantidadeProdutos() {

    return pedidoCheckout.produtos.reduce(
        function (total, produto) {

            return total + produto.quantidade;

        },
        0
    );

}

function formatarMoeda(valor) {

    return new Intl.NumberFormat("pt-BR", {

        style: "currency",

        currency: "BRL"

    }).format(valor);

}