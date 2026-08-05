/* =====================================================
   PARTE 1 - CONFIGURAÇÕES E VARIÁVEIS GLOBAIS
=====================================================*/

// ===============================
// ELEMENTOS DA TABELA
// ===============================

const listaProdutos = document.getElementById("listaProdutos");
const contadorProdutos = document.getElementById("contadorProdutos");
const pagination = document.getElementById("pagination");

// ===============================
// FILTROS
// ===============================

const pesquisa = document.getElementById("pesquisa");
const categoria = document.getElementById("categoria");
const status = document.getElementById("status");
const limparFiltros = document.getElementById("limparFiltros");

// ===============================
// MODAL
// ===============================

const modal = document.getElementById("modalProduto");
const btnNovoProduto = document.getElementById("novoProduto");
const btnFecharModal = document.getElementById("fecharModal");
const formProduto = document.getElementById("formProduto");

// ===============================
// CAMPOS DO FORMULÁRIO
// ===============================

const nome = document.getElementById("nome");
const sku = document.getElementById("sku");
const categoriaProduto = document.getElementById("categoriaProduto");
const preco = document.getElementById("preco");
const estoque = document.getElementById("estoque");
const statusProduto = document.getElementById("statusProduto");
const imagem = document.getElementById("imagem");

// ===============================
// ARRAY PRINCIPAL
// Todos os produtos ficarão aqui
// ===============================

let produtos = [];

// ===============================
// CONTROLE DE EDIÇÃO
// ===============================

let produtoEditando = null;

// ===============================
// PAGINAÇÃO
// ===============================

let paginaAtual = 1;
const produtosPorPagina = 4;

// ===============================
// FILTROS ATUAIS
// ===============================

let filtroPesquisa = "";
let filtroCategoria = "";
let filtroStatus = "";

// ===============================
// PRODUTOS APÓS FILTROS
// ===============================

let produtosFiltrados = [];

// ===============================
// CHAVE DO LOCAL STORAGE
// ===============================

const STORAGE_KEY = "gamesstart_produtos";

// ===============================
// CONFIGURAÇÕES
// ===============================

const STATUS_ATIVO = "Ativo";
const STATUS_INATIVO = "Inativo";

// ===============================
// ÍCONES DOS BOTÕES
// ===============================

const ICONE_EDITAR = `
<i class="fa-solid fa-pen-to-square"></i>
`;

const ICONE_EXCLUIR = `
<i class="fa-solid fa-trash"></i>
`;/* =====================================================
   PARTE 2 - INICIALIZAÇÃO DO SISTEMA
=====================================================*/

// Inicializa o sistema quando a página terminar de carregar
document.addEventListener("DOMContentLoaded", iniciarSistema);

// =====================================================
// FUNÇÃO PRINCIPAL
// =====================================================

function iniciarSistema() {

    carregarLocalStorage();

    atualizarCategorias();

    aplicarFiltros();

    atualizarContador();

}

// =====================================================
// CARREGA OS PRODUTOS DO LOCAL STORAGE
// =====================================================

// =====================================================
// CARREGA OS PRODUTOS DO LOCAL STORAGE
// =====================================================

function carregarLocalStorage() {

    try {

        const dados =
            localStorage.getItem(STORAGE_KEY);


        if (!dados) {

            criarProdutosIniciais();

            return;

        }


        produtos = JSON.parse(dados);


        validarProdutos();


    } catch (erro) {

        console.error(
            "Erro ao carregar produtos:",
            erro
        );


        produtos = [];

        criarProdutosIniciais();

    }

}

// =====================================================
// SALVA TODOS OS PRODUTOS
// =====================================================

function salvarLocalStorage() {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(produtos)

    );

}

// =====================================================
// ATUALIZA O SELECT DE CATEGORIAS
// =====================================================

function atualizarCategorias() {

    categoria.innerHTML = `
        <option value="">Categoria</option>
    `;

    const categorias = [];

    produtos.forEach(produto => {

        if (!categorias.includes(produto.categoria)) {

            categorias.push(produto.categoria);

        }

    });

    categorias.sort();

    categorias.forEach(nomeCategoria => {

        categoria.innerHTML += `
            <option value="${nomeCategoria}">
                ${nomeCategoria}
            </option>
        `;

    });

}

// =====================================================
// ATUALIZA O CONTADOR
// =====================================================

function atualizarContador() {

    contadorProdutos.textContent =
        `Mostrando ${produtosFiltrados.length} produto(s)`;

}/* =====================================================
   PARTE 3 - CADASTRO DE PRODUTOS
=====================================================*/

// ===============================
// ABRIR MODAL
// ===============================

btnNovoProduto.addEventListener("click", abrirModal);

function abrirModal() {

    modal.style.display = "flex";

    formProduto.reset();

    produtoEditando = null;

    nome.focus();

}

// ===============================
// FECHAR MODAL
// ===============================

btnFecharModal.addEventListener("click", fecharModal);

function fecharModal() {

    modal.style.display = "none";

}

// Fecha ao clicar fora da caixa

window.addEventListener("click", function (event) {

    if (event.target === modal) {

        fecharModal();

    }

});

// ===============================
// CADASTRO
// ===============================

formProduto.addEventListener("submit", cadastrarProduto);

function cadastrarProduto(event) {

    event.preventDefault();

    if (
        nome.value.trim() === "" ||
        sku.value.trim() === "" ||
        categoriaProduto.value.trim() === "" ||
        preco.value === "" ||
        estoque.value === ""
    ) {

        alert("Preencha todos os campos obrigatórios.");

        return;

    }

    const novoProduto = {

        id: Date.now(),

        nome: nome.value.trim(),

        sku: sku.value.trim(),

        categoria: categoriaProduto.value.trim(),

        preco: Number(preco.value),

        estoque: Number(estoque.value),

        status: statusProduto.value,

        imagem:
            imagem.value.trim() ||
            "img/sem-imagem.png"

    };

    produtos.push(novoProduto);

    salvarLocalStorage();

    atualizarSistema();

fecharModal();
// ======================================
// GERA SKU AUTOMATICAMENTE PELO NOME
// ======================================

function gerarSKU(nomeProduto) {


    // Remove acentos e caracteres especiais

    let nomeLimpo = nomeProduto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9 ]/g, "");


    // Divide o nome em palavras

    let palavras = nomeLimpo.split(" ");


    // Pega até 3 letras das palavras principais

    let sigla = palavras
        .filter(palavra => palavra.length > 0)
        .map(palavra => palavra.substring(0, 3))
        .join("")
        .toUpperCase();



    // Limita o tamanho da sigla

    sigla = sigla.substring(0, 6);



    // Gera números aleatórios

    let numero = Math.floor(
        100 + Math.random() * 900
    );



    return `${sigla}-${numero}`;

}// ======================================
// PREENCHE SKU AO DIGITAR O NOME
// ======================================

nome.addEventListener("input", () => {


    // Só gera se o campo SKU estiver vazio

    if (sku.value.trim() === "") {


        sku.value = gerarSKU(nome.value);


    }


});

}/* =====================================================
   PARTE 4 - RENDERIZAÇÃO DA TABELA
=====================================================*/

// ======================================
// APLICA TODOS OS FILTROS
// ======================================

function aplicarFiltros() {

    produtosFiltrados = produtos.filter(produto => {

        const pesquisaOK = correspondePesquisa(produto);

        const categoriaOK =
            filtroCategoria === "" ||
            produto.categoria === filtroCategoria;

        const statusOK =
            filtroStatus === "" ||
            produto.status === filtroStatus;

        return pesquisaOK && categoriaOK && statusOK;

    });

    paginaAtual = 1;

    renderizarTabela();

    atualizarContador();

    criarPaginacao();

}

// ======================================
// RENDERIZA A TABELA
// ======================================

function renderizarTabela() {

    listaProdutos.innerHTML = "";

    if (produtosFiltrados.length === 0) {

        listaProdutos.innerHTML = `

            <tr>

                <td colspan="7" class="sem-produtos">

                    Nenhum produto encontrado.

                </td>

            </tr>

        `;

        return;

    }

    const inicio = (paginaAtual - 1) * produtosPorPagina;

    const fim = inicio + produtosPorPagina;

    const produtosPagina = produtosFiltrados.slice(inicio, fim);

    produtosPagina.forEach(produto => {

        listaProdutos.innerHTML += criarLinha(produto);

    });

}

// ======================================
// CRIA UMA LINHA DA TABELA
// ======================================

function criarLinha(produto) {

    return `

        <tr data-id="${produto.id}">

            <td>

                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                    class="produto-img">

            </td>

            <td>

                <strong>${produto.nome}</strong>

                <br>

                <small>SKU: ${produto.sku}</small>

            </td>

            <td>

                ${produto.categoria}

            </td>

            <td>

                ${produto.preco.toLocaleString("pt-BR",{

                    style:"currency",

                    currency:"BRL"

                })}

            </td>

            <td>

                ${produto.estoque}

            </td>

            <td>

                <span class="status ${produto.status.toLowerCase()}">

                    ${produto.status}

                </span>

            </td>

            <td class="acoes">

                <button
                    class="editar"
                    data-id="${produto.id}">

                    ${ICONE_EDITAR}

                </button>

                <button
                    class="excluir"
                    data-id="${produto.id}">

                    ${ICONE_EXCLUIR}

                </button>

            </td>

        </tr>

    `;

}

// ======================================
// CRIA A PAGINAÇÃO
// ======================================

function criarPaginacao() {

    pagination.innerHTML = "";

    const totalPaginas = Math.ceil(

        produtosFiltrados.length /

        produtosPorPagina

    );

    if (totalPaginas <= 1) {

        return;

    }

    for (let i = 1; i <= totalPaginas; i++) {

        pagination.innerHTML += `

            <button
                class="pagina ${i === paginaAtual ? "ativa" : ""}"
                data-pagina="${i}">

                ${i}

            </button>

        `;

    }

}/* =====================================================
   PARTE 5 - PESQUISA
=====================================================*/

// ======================================
// EVENTO DA PESQUISA
// ======================================

pesquisa.addEventListener("input", () => {

    filtroPesquisa = pesquisa.value
        .trim()
        .toLowerCase();

    aplicarFiltros();

});

// ======================================
// VERIFICA SE O PRODUTO CORRESPONDE
// À PESQUISA
// ======================================

function correspondePesquisa(produto) {

    // Se a pesquisa estiver vazia,
    // todos os produtos serão exibidos.

    if (filtroPesquisa === "") {

        return true;

    }

    return [

        produto.nome,
        produto.sku,
        produto.categoria

    ].some(campo =>

        campo
            .toLowerCase()
            .includes(filtroPesquisa)

    );

}/* =====================================================
   PARTE 6 - FILTROS
=====================================================*/

// ======================================
// FILTRO POR CATEGORIA
// ======================================

categoria.addEventListener("change", () => {

    filtroCategoria = categoria.value;

    aplicarFiltros();

});

// ======================================
// FILTRO POR STATUS
// ======================================

status.addEventListener("change", () => {

    filtroStatus = status.value;

    aplicarFiltros();

});

// ======================================
// LIMPAR TODOS OS FILTROS
// ======================================

limparFiltros.addEventListener("click", limparTodosFiltros);

function limparTodosFiltros() {

    filtroPesquisa = "";
    filtroCategoria = "";
    filtroStatus = "";

    pesquisa.value = "";
    categoria.value = "";
    status.value = "";

    paginaAtual = 1;

    aplicarFiltros();

}/* =====================================================
   PARTE 7 - PAGINAÇÃO
=====================================================*/

// ======================================
// EVENTO DOS BOTÕES DA PAGINAÇÃO
// ======================================

pagination.addEventListener("click", (event) => {

    const botao = event.target.closest(".pagina");

    if (!botao) {

        return;

    }

    paginaAtual = Number(botao.dataset.pagina);
renderizarTabela();

criarPaginacao();

});

// ======================================
// ATUALIZA O BOTÃO DA PÁGINA ATIVA
// ======================================

function atualizarBotoesPaginacao() {

    const botoes = pagination.querySelectorAll(".pagina");

    botoes.forEach(botao => {

        botao.classList.remove("ativa");

        if (Number(botao.dataset.pagina) === paginaAtual) {

            botao.classList.add("ativa");

        }

    });

}
/* =====================================================
   PARTE 8 - EDITAR PRODUTO
=====================================================*/


// ======================================
// CLIQUE NO BOTÃO EDITAR
// ======================================

listaProdutos.addEventListener("click", (event) => {


    const botaoEditar = event.target.closest(".editar");


    if (!botaoEditar) {

        return;

    }


    const id = Number(botaoEditar.dataset.id);


    abrirEdicaoProduto(id);


});



// ======================================
// ABRE MODAL COM DADOS DO PRODUTO
// ======================================

function abrirEdicaoProduto(id) {


    const produto = produtos.find(item => item.id === id);


    if (!produto) {

        return;

    }


    produtoEditando = id;


    nome.value = produto.nome;

    sku.value = produto.sku;

    categoriaProduto.value = produto.categoria;

    preco.value = produto.preco;

    estoque.value = produto.estoque;

    statusProduto.value = produto.status;

    imagem.value = produto.imagem;


    modal.style.display = "flex";


    nome.focus();


}


// ======================================
// ALTERA O CADASTRO PARA EDIÇÃO
// ======================================

formProduto.addEventListener("submit", function(event){


    if(produtoEditando === null){

        return;

    }


    event.preventDefault();


    const produto = produtos.find(
        item => item.id === produtoEditando
    );


    if(!produto){

        return;

    }



    produto.nome = nome.value.trim();

    produto.sku = sku.value.trim();

    produto.categoria = categoriaProduto.value.trim();

    produto.preco = Number(preco.value);

    produto.estoque = Number(estoque.value);

    produto.status = statusProduto.value;

    produto.imagem =
        imagem.value.trim() ||
        "img/sem-imagem.png";



   salvarLocalStorage();

atualizarSistema();

fecharModal();

    produtoEditando = null;



});/* =====================================================
   PARTE 9 - EXCLUIR PRODUTO
=====================================================*/


// ======================================
// CLIQUE NO BOTÃO EXCLUIR
// ======================================

listaProdutos.addEventListener("click", (event) => {


    const botaoExcluir = event.target.closest(".excluir");


    if (!botaoExcluir) {

        return;

    }


    const id = Number(botaoExcluir.dataset.id);


    excluirProduto(id);


});



// ======================================
// REMOVE PRODUTO
// ======================================

function excluirProduto(id) {


    const produto = produtos.find(
        item => item.id === id
    );


    if (!produto) {

        return;

    }



    const confirmar = confirm(

        `Deseja excluir o produto "${produto.nome}"?`

    );



    if (!confirmar) {

        return;

    }



    produtos = produtos.filter(

        item => item.id !== id

    );



   salvarLocalStorage();

atualizarSistema();


}/* =====================================================
   PARTE 10 - ATUALIZAÇÕES AUTOMÁTICAS DO SISTEMA
=====================================================*/


// ======================================
// ATUALIZA TODOS OS COMPONENTES DA TELA
// ======================================

function atualizarSistema() {


    atualizarCategorias();


    aplicarFiltros();


    atualizarContador();


    criarPaginacao();


}



// ======================================
// CORRIGE PÁGINA QUANDO PRODUTOS SÃO REMOVIDOS
// ======================================

function verificarPaginaAtual() {


    const totalPaginas = Math.ceil(

        produtosFiltrados.length /

        produtosPorPagina

    );


    if (

        paginaAtual > totalPaginas

        && totalPaginas > 0

    ) {

        paginaAtual = totalPaginas;

    }


    if (totalPaginas === 0) {

        paginaAtual = 1;

    }


}



// ======================================
// ATUALIZA CONTADOR COMPLETO
// ======================================

function atualizarContador() {


    const total = produtosFiltrados.length;


    if(total === 0){

        contadorProdutos.textContent =
            "Nenhum produto encontrado";

        return;

    }


    const inicio =
        ((paginaAtual - 1) * produtosPorPagina) + 1;


    let fim =
        paginaAtual * produtosPorPagina;


    if(fim > total){

        fim = total;

    }


    contadorProdutos.textContent =

        `Mostrando ${inicio}-${fim} de ${total} produtos`;



}/* =====================================================
   PARTE 11 - LOCALSTORAGE AVANÇADO
=====================================================*/


// ======================================
// CARREGAMENTO SEGURO DOS PRODUTOS
// ======================================

function carregarLocalStorage() {


    try {


        const dados =
            localStorage.getItem(STORAGE_KEY);



        if (!dados) {


            criarProdutosIniciais();


            return;


        }



        produtos = JSON.parse(dados);



        validarProdutos();



    } catch (erro) {


        console.error(
            "Erro ao carregar produtos:",
            erro
        );


        produtos = [];


        criarProdutosIniciais();



    }


}



// ======================================
// VALIDA OS DADOS DOS PRODUTOS
// ======================================

function validarProdutos() {


    produtos = produtos.filter(produto => {


        return (

            produto.id &&

            produto.nome &&

            produto.sku &&

            produto.categoria

        );


    });


    salvarLocalStorage();


}



// ======================================
// CRIA PRODUTOS DE EXEMPLO
// PRIMEIRA UTILIZAÇÃO
// ======================================

function criarProdutosIniciais() {


    produtos = [

        {

            id: 1,

            nome: "PlayStation 5 Digital Edition",

            sku: "PS5-DE-001",

            categoria: "Consoles",

            preco: 4299,

            estoque: 12,

            status: "Ativo",

            imagem: "img/ps5.png"

        },


        {

            id: 2,

            nome: "Controle DualSense Branco",

            sku: "DS5-WH-002",

            categoria: "Acessórios",

            preco: 399,

            estoque: 25,

            status: "Ativo",

            imagem: "img/dualsense.png"

        },


        {

            id: 3,

            nome: "God of War Ragnarok",

            sku: "GOW-R-003",

            categoria: "Jogos",

            preco: 299,

            estoque: 8,

            status: "Inativo",

            imagem: "img/gow.png"

        }


    ];


    salvarLocalStorage();


}/* =====================================================
   PARTE 12 - ORGANIZAÇÃO FINAL DOS EVENTOS
=====================================================*/


// ======================================
// AÇÕES DA TABELA
// EDITAR / EXCLUIR
// ======================================

/* =====================================================
   PARTE 12 - ORGANIZAÇÃO FINAL DOS EVENTOS
=====================================================*/


listaProdutos.addEventListener("click", (event) => {


    const botaoEditar =
        event.target.closest(".editar");


    const botaoExcluir =
        event.target.closest(".excluir");



    if(botaoEditar){


        const id =
            Number(botaoEditar.dataset.id);


        abrirEdicaoProduto(id);


        return;

    }



    if(botaoExcluir){


        const id =
            Number(botaoExcluir.dataset.id);


        excluirProduto(id);


    }


});



// ======================================
// ENVIO ÚNICO DO FORMULÁRIO
// CADASTRO OU EDIÇÃO
// ======================================

formProduto.addEventListener("submit", function(event){


    event.preventDefault();



    if(produtoEditando !== null){


        salvarEdicaoProduto();


    }else{


        cadastrarProduto();


    }


});



// ======================================
// FECHAR MODAL COM ESC
// ======================================

document.addEventListener("keydown", (event)=>{


    if(event.key === "Escape"){

        fecharModal();

    }


});