/* =====================================================
   GAMESSTART - GERENCIAMENTO DE PRODUTOS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // --- ESTADO DA APLICAÇÃO ---
    let produtos = JSON.parse(localStorage.getItem("gamesstart_produtos")) || [];
    let categorias = JSON.parse(localStorage.getItem("gamesstart_categorias")) || [];

    let paginaAtual = 1;
    const itensPorPagina = 5;
    let produtoEdicaoId = null;
    let skuEditadoManualmente = false;

    // --- ELEMENTOS DO DOM ---
    const tabelaCorpo = document.getElementById("listaProdutos");
    const contadorProdutos = document.getElementById("contadorProdutos");
    const paginacaoContainer = document.getElementById("pagination");

    // Filtros
    const inputPesquisa = document.getElementById("pesquisa");
    const selectCategoriaFiltro = document.getElementById("categoria");
    const selectStatusFiltro = document.getElementById("status");
    const btnLimparFiltros = document.getElementById("limparFiltros");

    // Modais e Form
    const modalProduto = document.getElementById("modalProduto");
    const modalCategoria = document.getElementById("modalCategoria");
    const formProduto = document.getElementById("formProduto");
    const formCategoria = document.getElementById("formCategoria");
    const tituloModalProduto = document.getElementById("tituloModalProduto");

    // Inputs do Formulário
    const inputNome = document.getElementById("nome");
    const inputSku = document.getElementById("sku");
    const selectCategoriaProduto = document.getElementById("categoriaProduto");

    // --- MOCKS INICIAIS (Primeiro Acesso) ---
    if (categorias.length === 0) {
        categorias = ["Consoles", "Jogos", "Acessórios"];
        salvarCategorias();
    }

    if (produtos.length === 0) {
        produtos = [
            { id: 1, nome: "PlayStation 5", sku: "PS5-001", categoria: "Consoles", precoAntigo: 4499.00, precoPromocional: 3999.00, estoque: 12, status: "Ativo", imagem: "https://via.placeholder.com/50" },
            { id: 2, nome: "Controle DualSense", sku: "ACC-002", categoria: "Acessórios", precoAntigo: 450.00, precoPromocional: 399.00, estoque: 25, status: "Ativo", imagem: "https://via.placeholder.com/50" },
            { id: 3, nome: "Elden Ring PS5", sku: "GME-003", categoria: "Jogos", precoAntigo: 299.00, precoPromocional: 249.00, estoque: 0, status: "Inativo", imagem: "https://via.placeholder.com/50" }
        ];
        salvarProdutos();
    }

    // --- PERSISTÊNCIA ---
    function salvarProdutos() {
        localStorage.setItem("gamesstart_produtos", JSON.stringify(produtos));
    }

    function salvarCategorias() {
        localStorage.setItem("gamesstart_categorias", JSON.stringify(categorias));
    }

    // --- SITEMA DE NOTIFICAÇÃO (TOAST) ---
    function mostrarToast(mensagem, tipo = "sucesso") {
        const container = document.getElementById("toastContainer");
        if (!container) return;

        const toast = document.createElement("div");
        toast.className = `toast ${tipo}`;
        toast.innerHTML = `
            <i class="fa-solid ${tipo === 'sucesso' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
            <span>${mensagem}</span>
        `;

        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // --- CARREGAR SELECTS DE CATEGORIA ---
    function carregarSelectsCategoria() {
        const optionsHTML = '<option value="">Todas as Categorias</option>' + 
            categorias.map(cat => `<option value="${cat}">${cat}</option>`).join("");
        selectCategoriaFiltro.innerHTML = optionsHTML;

        const optionsFormHTML = '<option value="">Selecione uma categoria</option>' + 
            categorias.map(cat => `<option value="${cat}">${cat}</option>`).join("");
        selectCategoriaProduto.innerHTML = optionsFormHTML;
    }

    // --- RENDERIZAÇÃO DA TABELA ---
    function renderizarTabela() {
        const termo = inputPesquisa.value.toLowerCase();
        const catFiltro = selectCategoriaFiltro.value;
        const statusFiltro = selectStatusFiltro.value;

        // Filtragem
        const produtosFiltrados = produtos.filter(prod => {
            const bateNomeOuSku = prod.nome.toLowerCase().includes(termo) || prod.sku.toLowerCase().includes(termo);
            const bateCategoria = catFiltro === "" || prod.categoria === catFiltro;
            const bateStatus = statusFiltro === "" || prod.status === statusFiltro;
            return bateNomeOuSku && bateCategoria && bateStatus;
        });

        // Paginação
        const totalItens = produtosFiltrados.length;
        const totalPaginas = Math.ceil(totalItens / itensPorPagina) || 1;

        if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;

        const inicio = (paginaAtual - 1) * itensPorPagina;
        const fim = inicio + itensPorPagina;
        const produtosPaginados = produtosFiltrados.slice(inicio, fim);

        // Renderiza Linhas
        if (produtosPaginados.length === 0) {
            tabelaCorpo.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align:center; padding: 30px;">
                        Nenhum produto encontrado.
                    </td>
                </tr>`;
        } else {
            tabelaCorpo.innerHTML = produtosPaginados.map(prod => `
                <tr>
                    <td>
                        <img src="${prod.imagem || 'https://via.placeholder.com/50'}" alt="${prod.nome}" class="produto-img">
                    </td>
                    <td>
                        <strong>${prod.nome}</strong>
                        <small>SKU: ${prod.sku}</small>
                    </td>
                    <td>${prod.categoria}</td>
                    <td>
                        <span class="preco-antigo">R$ ${Number(prod.precoAntigo).toFixed(2)}</span>
                        <span class="preco-promocional">R$ ${Number(prod.precoPromocional).toFixed(2)}</span>
                    </td>
                    <td><strong>${prod.estoque} un</strong></td>
                    <td>
                        <span class="status ${prod.status.toLowerCase()}">${prod.status}</span>
                    </td>
                    <td>
                        <div class="acoes">
                            <button type="button" class="editar" data-id="${prod.id}" title="Editar">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button type="button" class="excluir" data-id="${prod.id}" title="Excluir">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join("");
        }

        // Contador e Controles de Paginação
        contadorProdutos.textContent = `Mostrando ${produtosPaginados.length} de ${totalItens} produtos`;
        renderizarPaginacao(totalPaginas);
    }

    function renderizarPaginacao(totalPaginas) {
        let botoes = "";
        for (let i = 1; i <= totalPaginas; i++) {
            botoes += `<button type="button" class="${i === paginaAtual ? 'ativa' : ''}" data-pagina="${i}">${i}</button>`;
        }
        paginacaoContainer.innerHTML = botoes;
    }

    // --- EVENTOS DO FORMULÁRIO (GERAÇÃO DE SKU AUTOMÁTICA) ---
    inputNome.addEventListener("input", () => {
        if (!skuEditadoManualmente && !produtoEdicaoId) {
            inputSku.value = inputNome.value
                .toUpperCase()
                .replace(/[^A-Z0-9\s]/g, "")
                .trim()
                .replace(/\s+/g, "-")
                .slice(0, 10);
        }
    });

    inputSku.addEventListener("input", () => {
        skuEditadoManualmente = true;
    });

    // --- MODAIS ---
    function abrirModal(modal) {
        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
    }

    function fecharModais() {
        modalProduto.style.display = "none";
        modalCategoria.style.display = "none";
        modalProduto.setAttribute("aria-hidden", "true");
        modalCategoria.setAttribute("aria-hidden", "true");
        
        formProduto.reset();
        formCategoria.reset();
        produtoEdicaoId = null;
        skuEditadoManualmente = false;
    }

    document.getElementById("novoProduto").addEventListener("click", () => {
        tituloModalProduto.textContent = "Novo Produto";
        abrirModal(modalProduto);
    });

    document.getElementById("novaCategoria").addEventListener("click", () => {
        abrirModal(modalCategoria);
    });

    document.getElementById("fecharModal").addEventListener("click", fecharModais);
    document.getElementById("fecharCategoria").addEventListener("click", fecharModais);

    window.addEventListener("click", (e) => {
        if (e.target === modalProduto || e.target === modalCategoria) fecharModais();
    });

    // --- SALVAR PRODUTO ---
    formProduto.addEventListener("submit", (e) => {
        e.preventDefault();

        const novoProduto = {
            id: produtoEdicaoId ? produtoEdicaoId : Date.now(),
            nome: inputNome.value.trim(),
            sku: inputSku.value.trim(),
            categoria: selectCategoriaProduto.value,
            precoAntigo: parseFloat(document.getElementById("precoAntigo").value),
            precoPromocional: parseFloat(document.getElementById("precoPromocional").value),
            estoque: parseInt(document.getElementById("estoque").value, 10),
            status: document.getElementById("statusProduto").value,
            imagem: document.getElementById("imagem").value.trim() || "https://via.placeholder.com/50"
        };

        if (produtoEdicaoId) {
            const index = produtos.findIndex(p => p.id === produtoEdicaoId);
            if (index !== -1) produtos[index] = novoProduto;
            mostrarToast("Produto atualizado com sucesso!");
        } else {
            produtos.push(novoProduto);
            mostrarToast("Produto cadastrado com sucesso!");
        }

        salvarProdutos();
        fecharModais();
        renderizarTabela();
    });

    // --- SALVAR CATEGORIA ---
    formCategoria.addEventListener("submit", (e) => {
        e.preventDefault();
        const nomeCat = document.getElementById("nomeCategoria").value.trim();

        if (categorias.some(c => c.toLowerCase() === nomeCat.toLowerCase())) {
            mostrarToast("Esta categoria já existe!", "erro");
            return;
        }

        categorias.push(nomeCat);
        salvarCategorias();
        carregarSelectsCategoria();
        fecharModais();
        mostrarToast("Categoria criada com sucesso!");
    });

    // --- AÇÕES NA TABELA (DELEGATION) ---
    tabelaCorpo.addEventListener("click", (e) => {
        const btnEditar = e.target.closest(".editar");
        const btnExcluir = e.target.closest(".excluir");

        if (btnEditar) {
            const id = Number(btnEditar.dataset.id);
            const produto = produtos.find(p => p.id === id);

            if (produto) {
                produtoEdicaoId = produto.id;
                tituloModalProduto.textContent = "Editar Produto";

                inputNome.value = produto.nome;
                inputSku.value = produto.sku;
                selectCategoriaProduto.value = produto.categoria;
                document.getElementById("precoAntigo").value = produto.precoAntigo;
                document.getElementById("precoPromocional").value = produto.precoPromocional;
                document.getElementById("estoque").value = produto.estoque;
                document.getElementById("statusProduto").value = produto.status;
                document.getElementById("imagem").value = produto.imagem;

                abrirModal(modalProduto);
            }
        }

        if (btnExcluir) {
            const id = Number(btnExcluir.dataset.id);
            if (confirm("Tem certeza que deseja excluir este produto?")) {
                produtos = produtos.filter(p => p.id !== id);
                salvarProdutos();
                renderizarTabela();
                mostrarToast("Produto excluído com sucesso!", "erro");
            }
        }
    });

    // --- PAGINAÇÃO E FILTROS ---
    paginacaoContainer.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            paginaAtual = Number(e.target.dataset.pagina);
            renderizarTabela();
        }
    });

    inputPesquisa.addEventListener("input", () => { paginaAtual = 1; renderizarTabela(); });
    selectCategoriaFiltro.addEventListener("change", () => { paginaAtual = 1; renderizarTabela(); });
    selectStatusFiltro.addEventListener("change", () => { paginaAtual = 1; renderizarTabela(); });

    btnLimparFiltros.addEventListener("click", () => {
        inputPesquisa.value = "";
        selectCategoriaFiltro.value = "";
        selectStatusFiltro.value = "";
        paginaAtual = 1;
        renderizarTabela();
    });

    // --- INICIALIZAÇÃO ---
    carregarSelectsCategoria();
    renderizarTabela();
});