document.addEventListener("DOMContentLoaded", () => {
    
    const usuarioLogado = {
        nome: "Lojista",
        cargo: "Admin Master",
        avatar: "https://ui-avatars.com/api/?name=Admin+Master&background=random"
    };

    const menuItens = [
        { icone: "fa-solid fa-chart-line", nome: "Dashboard", link: "#" },
        { icone: "fa-solid fa-cart-shopping", nome: "Pedidos", link: "#" },
        { icone: "fa-solid fa-box", nome: "Produtos", link: "#", ativo: true },
        { icone: "fa-solid fa-users", nome: "Clientes", link: "#" },
        { icone: "fa-solid fa-file-lines", nome: "Relatórios", link: "#" }
    ];

    let categorias = ["Consoles", "Acessórios", "Móveis"];

    let produtos = [
        { id: 1, imagem: "https://m.media-amazon.com/images/I/51r26kX+r7L._AC_SX679_.jpg", nome: "PlayStation 5 Digital Edition", sku: "PS5-DE-001", categoria: "Consoles", precoOriginal: 4500.00, precoPromocional: 4290.00, estoque: 12, status: "Ativo" },
        { id: 2, imagem: "https://m.media-amazon.com/images/I/61rPEB17c1L._AC_SX679_.jpg", nome: "DualSense Wireless - Volcanic Red", sku: "ACC-DS-VR", categoria: "Acessórios", precoOriginal: 499.90, precoPromocional: "", estoque: 45, status: "Ativo" },
        { id: 3, imagem: "https://m.media-amazon.com/images/I/61aW2N2tOUL._AC_SX679_.jpg", nome: "Cadeira Gamer Ergonômica Pro", sku: "FUR-GM-02", categoria: "Móveis", precoOriginal: 1290.00, precoPromocional: "", estoque: 2, status: "Inativo" },
        { id: 4, imagem: "https://m.media-amazon.com/images/I/61pBvlYPCsL._AC_SX679_.jpg", nome: "Headset Gamer 7.1 RGB", sku: "ACC-HD-71", categoria: "Acessórios", precoOriginal: 399.00, precoPromocional: 350.00, estoque: 8, status: "Ativo" }
    ];

    function renderizarMenu() {
        const menuList = document.getElementById("menuList");
        menuList.innerHTML = "";
        menuItens.forEach(item => {
            const li = document.createElement("li");
            if (item.ativo) li.classList.add("active");
            li.innerHTML = `<a href="${item.link}"><i class="${item.icone}"></i> ${item.nome}</a>`;
            menuList.appendChild(li);
        });
    }

    function renderizarUsuario() {
        const container = document.getElementById("userActionsContainer");
        container.innerHTML = `
            <button class="icon-button hide-mobile"><i class="fa-regular fa-bell"></i></button>
            <button class="icon-button hide-mobile"><i class="fa-regular fa-comment-dots"></i></button>
            <div class="user-profile">
                <div class="user-info hide-mobile">
                    <span class="user-greeting">Olá, ${usuarioLogado.nome}</span>
                    <span class="user-role">${usuarioLogado.cargo}</span>
                </div>
                <img src="${usuarioLogado.avatar}" alt="Avatar" class="avatar">
            </div>
        `;
    }

    function atualizarSelectsCategorias() {
        const filterCategory = document.getElementById("filterCategory");
        const prodCategoria = document.getElementById("prodCategoria");

        filterCategory.innerHTML = '<option value="">Categoria</option>';
        prodCategoria.innerHTML = '<option value="">Selecione uma categoria</option>';

        categorias.forEach(cat => {
            filterCategory.innerHTML += `<option value="${cat}">${cat}</option>`;
            prodCategoria.innerHTML += `<option value="${cat}">${cat}</option>`;
        });
    }

    const tbody = document.getElementById("tableBody");
    const searchInput = document.getElementById("filterSearch");
    const categorySelect = document.getElementById("filterCategory");
    const statusSelect = document.getElementById("filterStatus");
    const paginationInfo = document.getElementById("paginationInfo");

    function renderizarTabela() {
        const termoBusca = searchInput.value.toLowerCase();
        const categoriaFiltro = categorySelect.value;
        const statusFiltro = statusSelect.value;

        const produtosFiltrados = produtos.filter(produto => {
            const matchBusca = produto.nome.toLowerCase().includes(termoBusca) || produto.sku.toLowerCase().includes(termoBusca);
            const matchCategoria = categoriaFiltro === "" || produto.categoria === categoriaFiltro;
            const matchStatus = statusFiltro === "" || produto.status === statusFiltro;
            return matchBusca && matchCategoria && matchStatus;
        });

        tbody.innerHTML = "";

        if (produtosFiltrados.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 20px; color: var(--text-gray);">Nenhum produto encontrado.</td></tr>`;
        }

        produtosFiltrados.forEach(produto => {
            const estoqueClasse = produto.estoque <= 5 ? "stock-text stock-low" : "stock-text";
            const statusClasse = produto.status === "Ativo" ? "status-active" : "status-inactive";

            const precoFormatadoOrig = Number(produto.precoOriginal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            let blocoPrecos = '';

            if (produto.precoPromocional && produto.precoPromocional !== "" && Number(produto.precoPromocional) > 0) {
                const precoFormatadoPromo = Number(produto.precoPromocional).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                blocoPrecos = `
                    <div class="price-container">
                        <span class="price-original has-promo">${precoFormatadoOrig}</span>
                        <span class="price-promo">${precoFormatadoPromo}</span>
                    </div>
                `;
            } else {
                blocoPrecos = `
                    <div class="price-container">
                        <span class="price-original">${precoFormatadoOrig}</span>
                    </div>
                `;
            }

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>
                    <div class="product-img-wrapper" id="img-wrap-${produto.id}">
                        <img src="${produto.imagem}" alt="${produto.nome}" class="product-img" onerror="document.getElementById('img-wrap-${produto.id}').innerHTML='<i class=\'fa-solid fa-image\'></i>';">
                    </div>
                </td>
                <td class="product-info"><strong>${produto.nome}</strong><span>SKU: ${produto.sku}</span></td>
                <td class="category-text">${produto.categoria}</td>
                <td>${blocoPrecos}</td>
                <td><span class="${estoqueClasse}">${produto.estoque} unid.</span></td>
                <td><span class="status-badge ${statusClasse}">${produto.status}</span></td>
                <td class="action-buttons">
                    <button class="btn-action edit-btn" data-id="${produto.id}" title="Editar"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button class="btn-action delete-btn" data-id="${produto.id}" title="Excluir"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        paginationInfo.innerHTML = `Mostrando <strong>${produtosFiltrados.length}</strong> de <strong>${produtos.length}</strong> produtos`;
    }

    searchInput.addEventListener("input", renderizarTabela);
    categorySelect.addEventListener("change", renderizarTabela);
    statusSelect.addEventListener("change", renderizarTabela);

    document.getElementById("btnClearFilters").addEventListener("click", () => {
        searchInput.value = "";
        categorySelect.value = "";
        statusSelect.value = "";
        renderizarTabela();
    });

    tbody.addEventListener("click", (e) => {
        const btnDelete = e.target.closest(".delete-btn");
        const btnEdit = e.target.closest(".edit-btn");

        if (btnDelete) {
            const id = parseInt(btnDelete.getAttribute("data-id"));
            if (confirm("Tem certeza que deseja excluir este produto?")) {
                produtos = produtos.filter(p => p.id !== id);
                renderizarTabela();
            }
        }

        if (btnEdit) {
            const id = parseInt(btnEdit.getAttribute("data-id"));
            const produtoParaEditar = produtos.find(p => p.id === id);

            if (produtoParaEditar) {
                document.getElementById("modalProdutoTitulo").innerText = "Editar Produto";
                document.getElementById("btnSalvarProduto").innerText = "Atualizar Produto";
                
                document.getElementById("prodIdEdit").value = produtoParaEditar.id;
                document.getElementById("prodNome").value = produtoParaEditar.nome;
                document.getElementById("prodSku").value = produtoParaEditar.sku;
                document.getElementById("prodCategoria").value = produtoParaEditar.categoria;
                document.getElementById("prodPrecoOriginal").value = produtoParaEditar.precoOriginal;
                document.getElementById("prodPrecoPromocional").value = produtoParaEditar.precoPromocional;
                document.getElementById("prodEstoque").value = produtoParaEditar.estoque;
                document.getElementById("prodStatus").value = produtoParaEditar.status;
                document.getElementById("prodImagem").value = produtoParaEditar.imagem;

                modalProduto.style.display = "flex";
            }
        }
    });

    const modalProduto = document.getElementById("modalProduto");
    const modalCategoria = document.getElementById("modalCategoria");

    document.getElementById("abrirModalProduto").addEventListener("click", () => {
        document.getElementById("modalProdutoTitulo").innerText = "Novo Produto";
        document.getElementById("btnSalvarProduto").innerText = "Salvar Produto";
        formProduto.reset();
        document.getElementById("prodIdEdit").value = "";
        modalProduto.style.display = "flex";
    });

    document.getElementById("abrirModalCategoria").addEventListener("click", () => modalCategoria.style.display = "flex");
    document.getElementById("fecharModalProduto").addEventListener("click", () => modalProduto.style.display = "none");
    document.getElementById("fecharModalCategoria").addEventListener("click", () => modalCategoria.style.display = "none");

    const formProduto = document.getElementById("formProduto");
    formProduto.addEventListener("submit", (e) => {
        e.preventDefault();

        const idEdit = document.getElementById("prodIdEdit").value;
        const nome = document.getElementById("prodNome").value;
        const sku = document.getElementById("prodSku").value;
        const categoria = document.getElementById("prodCategoria").value;
        const precoOriginal = parseFloat(document.getElementById("prodPrecoOriginal").value);
        const precoPromocional = document.getElementById("prodPrecoPromocional").value ? parseFloat(document.getElementById("prodPrecoPromocional").value) : "";
        const estoque = parseInt(document.getElementById("prodEstoque").value);
        const status = document.getElementById("prodStatus").value;
        const imagem = document.getElementById("prodImagem").value;

        if (idEdit) {
            produtos = produtos.map(p => {
                if (p.id === parseInt(idEdit)) {
                    return { ...p, nome, sku, categoria, precoOriginal, precoPromocional, estoque, status, imagem };
                }
                return p;
            });
        } else {
            const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
            const novoProduto = {
                id: novoId,
                nome,
                sku,
                categoria,
                precoOriginal,
                precoPromocional,
                estoque,
                status,
                imagem
            };
            produtos.unshift(novoProduto);
        }

        modalProduto.style.display = "none";
        formProduto.reset();
        renderizarTabela();
    });

    const formCategoria = document.getElementById("formCategoria");
    formCategoria.addEventListener("submit", (e) => {
        e.preventDefault();
        const nomeCat = document.getElementById("catNome").value.trim();

        if (nomeCat && !categorias.includes(nomeCat)) {
            categorias.push(nomeCat);
            atualizarSelectsCategorias();
            alert(`Categoria "${nomeCat}" criada com sucesso!`);
        } else {
            alert("Esta categoria já existe ou o campo está vazio.");
        }

        modalCategoria.style.display = "none";
        formCategoria.reset();
    });

    const sidebar = document.getElementById("sidebar");
    document.getElementById("openMenu").addEventListener("click", () => sidebar.classList.add("open"));
    document.getElementById("closeMenu").addEventListener("click", () => sidebar.classList.remove("open"));

    renderizarMenu();
    renderizarUsuario();
    atualizarSelectsCategorias();
    renderizarTabela();
});
//======================================================
// CADASTRO CATEGORIA
//======================================================
 
document.getElementById("btnCategoria").
    addEventListener("click", function () {
        //capturar os dados do input
        const categoriaNome
            = document.getElementById("categoriaNome").value;
 
        // criar um if para validar se o campo está vazio    
        if (categoriaNome === "") {
            alert("Por favor, preencha o nome da categoria.");
            return;
        }
 
        // criar um objeto com os dados da categoria
        const categoria = {
            nome: categoriaNome
 
        };
 
        // enviar os dados para o servidor
        fetch("http://localhost:3000/categorias", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoria)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Categoria cadastrada:", data);
                alert("Categoria cadastrada com sucesso!");
            })
            .catch(error => {
                console.error("Erro ao cadastrar categoria:", error);
                alert("Erro ao cadastrar categoria.");
            });
    });
  
        //======================================================
        // CADASTRO PRODUTO
        //======================================================
        document.getElementById("btnProduto").
        addEventListener("click", function () {

    //==================================================
    // CAPTURAR DADOS DOS INPUTS
    //==================================================
    const nome =
        document.getElementById("produtoNome").value;

    const descricao =
        document.getElementById("produtoDescricao").value;

    const codigo =
        document.getElementById("produtoSku").value;

    const precoAntigo =
        document.getElementById("produtoPrecoAntigo").value;

    const precoPromo =
        document.getElementById("produtoPrecoPromo").value;

    const estoque =
        document.getElementById("produtoEstoque").value;

    //==================================================
    // CAPTURAR SELECTS
    //==================================================
    
    const categoria =
        document.getElementById("produtoCategoria").value;

    const status =
        document.getElementById("produtoStatus").value;

    //==================================================
    // VALIDAÇÃO
    //==================================================
    if (
        nome === "" ||
        codigo === "" ||
        precoAntigo === "" ||
        precoPromo === "" ||
        estoque === "" ||
        categoria === ""
    ) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    //==================================================
    // CRIAR OBJETO PRODUTO
    //==================================================
    const produto = {

        nome: nome,
        descricao: descricao,
        codigo: codigo,
        precoAntigo: precoAntigo,
        precoPromo: precoPromo,
        estoque: estoque,
        status: status,

        Marca_idMarca: marca,
        Cores_idCores: cor,
        Tamanho_idTamanho: tamanho,
        Categoria_idCategoria: categoria

    };

    //==================================================
    // ENVIAR PARA O SERVIDOR
    //==================================================
    fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
    })

    .then(response => response.json())

    .then(data => {

        console.log("Produto cadastrado:", data);

        alert("Produto cadastrado com sucesso!");

        // limpar formulário
        document.getElementById("produtoNome").value = "";
        document.getElementById("produtoDescricao").value = "";
        document.getElementById("produtoCodigo").value = "";
        document.getElementById("produtoPrecoAntigo").value = "";
        document.getElementById("produtoPrecoPromo").value = "";
        document.getElementById("produtoEstoque").value = "";

    })

    .catch(error => {

        console.error("Erro ao cadastrar produto:", error);

        alert("Erro ao cadastrar produto.");

    });

});
 

//======================================================
// CADASTRAR IMAGEM DO PRODUTO
//======================================================
document.getElementById("btnImagem")
.addEventListener("click", function () {

    // capturar dados
    const produto =
        document.getElementById("imagemProduto").value;

    const arquivo =
        document.getElementById("imagemArquivo").files[0];


    // validar
    if (produto === "") {

        alert("Selecione o produto.");
        return;
    }

    if (!arquivo) {

        alert("Selecione uma imagem.");
        return;
    }


    // criar FormData
    const imagem = new FormData();

    imagem.append(
        "Produto_idProduto",
        produto
    );

    imagem.append(
        "imagem",
        arquivo
    );


    // enviar para servidor
    fetch(`${API}/imagens`, {

        method: "POST",

        body: imagem

    })

    .then(response => response.json())

    .then(data => {

        console.log(
            "Imagem cadastrada:",
            data
        );

        alert(
            "Imagem cadastrada com sucesso!"
        );

        document.getElementById(
            "imagemArquivo"
        ).value = "";

    })

    .catch(error => {

        console.error(
            "Erro ao cadastrar imagem:",
            error
        );

        alert(
            "Erro ao cadastrar imagem."
        );

    });

});


//======================================================
// CARREGAR PRODUTOS AO ABRIR A PÁGINA
//======================================================
document.addEventListener(
    "DOMContentLoaded",
    function () {

        listarProdutosImagem();

    }
);
 