document.addEventListener("DOMContentLoaded", () => {

    //=====================================================
    // CONFIGURAÇÕES
    //=====================================================

    const API = "http://localhost:3000";


    //=====================================================
    // DADOS DO LOJISTA
    //=====================================================

    const lojistaSalvo =
        JSON.parse(
            localStorage.getItem("lojista") || "null"
        );

    const lojaSalva =
        JSON.parse(
            localStorage.getItem("loja") || "null"
        );


    // Enquanto não houver login específico do lojista,
    // será utilizado o ID 1.
    const ID_LOJISTA =
        lojistaSalvo?.id_lojista || 1;

    const ID_LOJA =
        lojaSalva?.id_loja || 1;


    //=====================================================
    // DADOS DA TELA
    //=====================================================

    let categorias = [];

    let produtos = [];

    let imagensProdutos = [];

    let produtosCategorias = [];


    //=====================================================
    // ELEMENTOS DO HTML
    //=====================================================

    const tbody =
        document.getElementById("tableBody");

    const searchInput =
        document.getElementById("filterSearch");

    const categorySelect =
        document.getElementById("filterCategory");

    const statusSelect =
        document.getElementById("filterStatus");

    const paginationInfo =
        document.getElementById("paginationInfo");

    const modalProduto =
        document.getElementById("modalProduto");

    const modalCategoria =
        document.getElementById("modalCategoria");

    const formProduto =
        document.getElementById("formProduto");

    const formCategoria =
        document.getElementById("formCategoria");

    const sidebar =
        document.getElementById("sidebar");


    //=====================================================
    // MENU
    //=====================================================

    const menuItens = [

        {
            icone: "fa-solid fa-chart-line",
            nome: "Dashboard",
            link: "#"
        },

        {
            icone: "fa-solid fa-cart-shopping",
            nome: "Pedidos",
            link: "#"
        },

        {
            icone: "fa-solid fa-box",
            nome: "Produtos",
            link: "#",
            ativo: true
        },

        {
            icone: "fa-solid fa-users",
            nome: "Clientes",
            link: "#"
        },

        {
            icone: "fa-solid fa-file-lines",
            nome: "Relatórios",
            link: "#"
        }

    ];


    //=====================================================
    // RENDERIZAR MENU
    //=====================================================

    function renderizarMenu() {

        const menuList =
            document.getElementById("menuList");

        menuList.innerHTML = "";


        menuItens.forEach(item => {

            const li =
                document.createElement("li");


            if (item.ativo) {

                li.classList.add("active");

            }


            li.innerHTML = `

                <a href="${item.link}">

                    <i class="${item.icone}"></i>

                    ${item.nome}

                </a>

            `;


            menuList.appendChild(li);

        });

    }


    //=====================================================
    // RENDERIZAR USUÁRIO
    //=====================================================

    function renderizarUsuario() {

        const usuarioLogado = {

            nome:
                lojistaSalvo?.nome ||
                "Lojista",

            cargo:
                "Admin Master",

            avatar:
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    lojistaSalvo?.nome || "Lojista"
                )}`

        };


        const container =
            document.getElementById(
                "userActionsContainer"
            );


        container.innerHTML = `

            <button class="icon-button hide-mobile">

                <i class="fa-regular fa-bell"></i>

            </button>


            <button class="icon-button hide-mobile">

                <i class="fa-regular fa-comment-dots"></i>

            </button>


            <div class="user-profile">


                <div class="user-info hide-mobile">


                    <span class="user-greeting">

                        Olá, ${usuarioLogado.nome}

                    </span>


                    <span class="user-role">

                        ${usuarioLogado.cargo}

                    </span>


                </div>


                <img
                    src="${usuarioLogado.avatar}"
                    alt="Avatar"
                    class="avatar"
                >


            </div>

        `;

    }


    //=====================================================
    // FUNÇÃO PARA CHAMAR API
    //=====================================================

    async function requisicao(
        url,
        opcoes = {}
    ) {

        const resposta =
            await fetch(
                url,
                opcoes
            );


        let dados = {};


        try {

            dados =
                await resposta.json();

        } catch (erro) {

            dados = {};

        }


        if (!resposta.ok) {

            throw new Error(

                dados.mensagem ||

                "Erro ao acessar o servidor."

            );

        }


        return dados;

    }


    //=====================================================
    // CARREGAR CATEGORIAS
    //=====================================================

    async function carregarCategorias() {

        try {

            categorias =
                await requisicao(
                    `${API}/categorias`
                );


            atualizarSelectsCategorias();


        } catch (erro) {


            console.error(
                "Erro ao carregar categorias:",
                erro
            );


            alert(
                "Não foi possível carregar as categorias."
            );

        }

    }


    //=====================================================
    // ATUALIZAR SELECTS DE CATEGORIAS
    //=====================================================

    function atualizarSelectsCategorias() {

        categorySelect.innerHTML =

            `<option value="">
                Categoria
            </option>`;


        const prodCategoria =
            document.getElementById(
                "prodCategoria"
            );


        prodCategoria.innerHTML =

            `<option value="">
                Selecione uma categoria
            </option>`;


        categorias.forEach(categoria => {


            categorySelect.innerHTML += `

                <option
                    value="${categoria.id_categorias}"
                >

                    ${categoria.nome}

                </option>

            `;


            prodCategoria.innerHTML += `

                <option
                    value="${categoria.id_categorias}"
                >

                    ${categoria.nome}

                </option>

            `;

        });

    }


    //=====================================================
    // CARREGAR PRODUTOS
    //=====================================================

    async function carregarProdutos() {

        try {


            const [

                listaProdutos,

                listaImagens,

                listaRelacionamentos

            ] = await Promise.all([


                requisicao(
                    `${API}/produtos`
                ),


                requisicao(
                    `${API}/imagens-produtos`
                ),


                requisicao(
                    `${API}/produto-has-categorias`
                )

            ]);


            imagensProdutos =
                Array.isArray(listaImagens)
                    ? listaImagens
                    : [];


            produtosCategorias =
                Array.isArray(listaRelacionamentos)
                    ? listaRelacionamentos
                    : [];


            produtos =

                (
                    Array.isArray(listaProdutos)
                        ? listaProdutos
                        : []
                )

                    .map(produto => {


                        //==========================================
                        // BUSCAR CATEGORIA DO PRODUTO
                        //==========================================

                        const relacao =

                            produtosCategorias.find(

                                item =>

                                    Number(
                                        item.Produto_id_produto
                                    )

                                    ===

                                    Number(
                                        produto.id_produto
                                    )

                            );


                        const categoria =

                            categorias.find(

                                item =>

                                    Number(
                                        item.id_categorias
                                    )

                                    ===

                                    Number(
                                        relacao?.Categorias_id_categorias
                                    )

                            );


                        //==========================================
                        // BUSCAR IMAGEM
                        //==========================================

                        const imagem =

                            imagensProdutos.find(

                                item =>

                                    Number(
                                        item.Produto_id_produto
                                    )

                                    ===

                                    Number(
                                        produto.id_produto
                                    )

                            );


                        //==========================================
                        // FORMATAR PRODUTO PARA A TELA
                        //==========================================

                        return {

                            id:
                                produto.id_produto,

                            nome:
                                produto.nome,

                            descricao:
                                produto.descricao || "",

                            sku:
                                produto.sku,

                            categoriaId:
                                relacao?.Categorias_id_categorias || "",

                            categoria:
                                categoria?.nome ||
                                "Sem categoria",

                            precoOriginal:
                                Number(
                                    produto.preco_antigo || 0
                                ),

                            precoPromocional:

                                produto.preco_promocional === null

                                    ? ""

                                    : produto.preco_promocional,

                            estoque:

                                Number(
                                    produto.quantidade_estoque || 0
                                ),

                            status:

                                Number(produto.ativo) === 1

                                    ? "Ativo"

                                    : "Inativo",

                            imagem:
                                imagem?.arquivo || ""

                        };

                    });


            renderizarTabela();


        } catch (erro) {


            console.error(
                "Erro ao carregar produtos:",
                erro
            );


            alert(
                "Não foi possível carregar os produtos."
            );

        }

    }


    //=====================================================
    // RENDERIZAR TABELA
    //=====================================================

    function renderizarTabela() {


        const termoBusca =

            searchInput
                .value
                .toLowerCase()
                .trim();


        const categoriaFiltro =
            categorySelect.value;


        const statusFiltro =
            statusSelect.value;


        //=================================================
        // FILTRAR PRODUTOS
        //=================================================

        const produtosFiltrados =

            produtos.filter(produto => {


                const matchBusca =

                    produto.nome
                        .toLowerCase()
                        .includes(termoBusca)

                    ||

                    produto.sku
                        .toLowerCase()
                        .includes(termoBusca);


                const matchCategoria =

                    categoriaFiltro === ""

                    ||

                    Number(
                        produto.categoriaId
                    )

                    ===

                    Number(
                        categoriaFiltro
                    );


                const matchStatus =

                    statusFiltro === ""

                    ||

                    produto.status ===
                    statusFiltro;


                return (

                    matchBusca &&

                    matchCategoria &&

                    matchStatus

                );

            });


        tbody.innerHTML = "";


        //=================================================
        // NENHUM PRODUTO
        //=================================================

        if (
            produtosFiltrados.length === 0
        ) {


            tbody.innerHTML = `

                <tr>

                    <td
                        colspan="7"
                        style="
                            text-align:center;
                            padding:20px;
                            color:#999;
                        "
                    >

                        Nenhum produto encontrado.

                    </td>

                </tr>

            `;


        }


        //=================================================
        // MOSTRAR PRODUTOS
        //=================================================

        else {


            produtosFiltrados.forEach(
                produto => {


                    //==========================================
                    // PREÇO ORIGINAL
                    //==========================================

                    const precoOriginal =

                        Number(
                            produto.precoOriginal
                        )

                            .toLocaleString(
                                "pt-BR",
                                {

                                    style: "currency",

                                    currency: "BRL"

                                }
                            );


                    let blocoPrecos = `

                        <div class="price-container">

                            <span class="price-original">

                                ${precoOriginal}

                            </span>

                        </div>

                    `;


                    //==========================================
                    // PREÇO PROMOCIONAL
                    //==========================================

                    if (

                        produto.precoPromocional !== ""

                        &&

                        produto.precoPromocional !== null

                        &&

                        Number(
                            produto.precoPromocional
                        ) > 0

                    ) {


                        const precoPromo =

                            Number(
                                produto.precoPromocional
                            )

                                .toLocaleString(
                                    "pt-BR",
                                    {

                                        style: "currency",

                                        currency: "BRL"

                                    }
                                );


                        blocoPrecos = `

                            <div class="price-container">

                                <span
                                    class="
                                        price-original
                                        has-promo
                                    "
                                >

                                    ${precoOriginal}

                                </span>


                                <span class="price-promo">

                                    ${precoPromo}

                                </span>

                            </div>

                        `;

                    }


                    //==========================================
                    // ESTOQUE
                    //==========================================

                    const estoqueClasse =

                        produto.estoque <= 5

                            ? "stock-text stock-low"

                            : "stock-text";


                    //==========================================
                    // STATUS
                    //==========================================

                    const statusClasse =

                        produto.status === "Ativo"

                            ? "status-active"

                            : "status-inactive";


                    const tr =
                        document.createElement(
                            "tr"
                        );


                    tr.innerHTML = `


                        <td>


                            <div class="product-img-wrapper">


                                ${produto.imagem

                            ? `

                                        <img
                                            src="${produto.imagem}"
                                            alt="${produto.nome}"
                                            class="product-img"

                                            onerror="
                                                this.style.display='none';

                                                this.parentElement.innerHTML =
                                                '<i class=\\'fa-solid fa-image\\'></i>';
                                            "
                                        >

                                    `

                            : `

                                        <i class="fa-solid fa-image"></i>

                                    `
                        }


                            </div>


                        </td>


                        <td class="product-info">


                            <strong>

                                ${produto.nome}

                            </strong>


                            <span>

                                SKU:
                                ${produto.sku}

                            </span>


                        </td>


                        <td class="category-text">

                            ${produto.categoria}

                        </td>


                        <td>

                            ${blocoPrecos}

                        </td>


                        <td>

                            <span class="${estoqueClasse}">

                                ${produto.estoque}
                                unid.

                            </span>

                        </td>


                        <td>

                            <span
                                class="
                                    status-badge
                                    ${statusClasse}
                                "
                            >

                                ${produto.status}

                            </span>

                        </td>


                        <td class="action-buttons">


                            <button
                                class="
                                    btn-action
                                    edit-btn
                                "
                                data-id="${produto.id}"
                                title="Editar"
                            >

                                <i
                                    class="
                                        fa-regular
                                        fa-pen-to-square
                                    "
                                ></i>

                            </button>


                            <button
                                class="
                                    btn-action
                                    delete-btn
                                "
                                data-id="${produto.id}"
                                title="Excluir"
                            >

                                <i
                                    class="
                                        fa-regular
                                        fa-trash-can
                                    "
                                ></i>

                            </button>


                        </td>


                    `;


                    tbody.appendChild(
                        tr
                    );

                }

            );

        }


        //=================================================
        // INFORMAÇÃO DA TABELA
        //=================================================

        paginationInfo.innerHTML = `

            Mostrando

            <strong>
                ${produtosFiltrados.length}
            </strong>

            de

            <strong>
                ${produtos.length}
            </strong>

            produtos

        `;

    }


    //=====================================================
    // FILTROS
    //=====================================================

    searchInput.addEventListener(
        "input",
        renderizarTabela
    );


    categorySelect.addEventListener(
        "change",
        renderizarTabela
    );


    statusSelect.addEventListener(
        "change",
        renderizarTabela
    );


    document
        .getElementById(
            "btnClearFilters"
        )
        .addEventListener(
            "click",
            () => {


                searchInput.value = "";

                categorySelect.value = "";

                statusSelect.value = "";


                renderizarTabela();

            }
        );


    //=====================================================
    // ABRIR MODAL PRODUTO
    //=====================================================

    document
        .getElementById(
            "abrirModalProduto"
        )
        .addEventListener(
            "click",
            () => {


                formProduto.reset();


                document.getElementById(
                    "prodIdEdit"
                ).value = "";


                document.getElementById(
                    "modalProdutoTitulo"
                ).innerText =
                    "Novo Produto";


                document.getElementById(
                    "btnSalvarProduto"
                ).innerText =
                    "Salvar Produto";


                document.getElementById(
                    "prodStatus"
                ).value =
                    "Ativo";


                modalProduto.style.display =
                    "flex";

            }
        );


    //=====================================================
    // ABRIR MODAL CATEGORIA
    //=====================================================

    document
        .getElementById(
            "abrirModalCategoria"
        )
        .addEventListener(
            "click",
            () => {


                formCategoria.reset();


                modalCategoria.style.display =
                    "flex";

            }
        );


    //=====================================================
    // FECHAR MODAIS
    //=====================================================

    document
        .getElementById(
            "fecharModalProduto"
        )
        .addEventListener(
            "click",
            () => {


                modalProduto.style.display =
                    "none";

            }
        );


    document
        .getElementById(
            "fecharModalCategoria"
        )
        .addEventListener(
            "click",
            () => {


                modalCategoria.style.display =
                    "none";

            }
        );


    //=====================================================
    // EDITAR / EXCLUIR PRODUTO
    //=====================================================

    tbody.addEventListener(
        "click",
        async event => {


            const btnDelete =
                event.target.closest(
                    ".delete-btn"
                );


            const btnEdit =
                event.target.closest(
                    ".edit-btn"
                );


            //=================================================
            // EXCLUIR PRODUTO
            //=================================================

            if (btnDelete) {


                const id =

                    btnDelete.getAttribute(
                        "data-id"
                    );


                const confirmar =

                    confirm(

                        "Tem certeza que deseja excluir este produto?"

                    );


                if (!confirmar) {

                    return;

                }


                try {


                    //==========================================
                    // EXCLUI RELAÇÃO COM CATEGORIA
                    //==========================================

                    await fetch(

                        `${API}/produto-has-categorias/produto/${id}`,

                        {
                            method: "DELETE"
                        }

                    );


                    //==========================================
                    // EXCLUI IMAGENS
                    //==========================================

                    await fetch(

                        `${API}/imagens-produtos/produto/${id}`,

                        {
                            method: "DELETE"
                        }

                    );


                    //==========================================
                    // EXCLUI PRODUTO
                    //==========================================

                    await requisicao(

                        `${API}/produtos/${id}`,

                        {
                            method: "DELETE"
                        }

                    );


                    alert(

                        "Produto excluído com sucesso!"

                    );


                    await carregarProdutos();


                } catch (erro) {


                    console.error(
                        erro
                    );


                    alert(

                        erro.message ||

                        "Erro ao excluir produto."

                    );

                }


                return;

            }


            //=================================================
            // EDITAR PRODUTO
            //=================================================

            if (btnEdit) {


                const id =

                    Number(

                        btnEdit.getAttribute(
                            "data-id"
                        )

                    );


                const produto =

                    produtos.find(

                        item =>
                            item.id === id

                    );


                if (!produto) {

                    return;

                }


                document.getElementById(
                    "modalProdutoTitulo"
                ).innerText =
                    "Editar Produto";


                document.getElementById(
                    "btnSalvarProduto"
                ).innerText =
                    "Atualizar Produto";


                document.getElementById(
                    "prodIdEdit"
                ).value =
                    produto.id;


                document.getElementById(
                    "prodNome"
                ).value =
                    produto.nome;


                document.getElementById(
                    "prodSku"
                ).value =
                    produto.sku;


                document.getElementById(
                    "prodDescricao"
                ).value =
                    produto.descricao;


                document.getElementById(
                    "prodCategoria"
                ).value =
                    produto.categoriaId;


                document.getElementById(
                    "prodPrecoOriginal"
                ).value =
                    produto.precoOriginal;


                document.getElementById(
                    "prodPrecoPromocional"
                ).value =

                    produto.precoPromocional ||
                    "";


                document.getElementById(
                    "prodEstoque"
                ).value =
                    produto.estoque;


                document.getElementById(
                    "prodStatus"
                ).value =
                    produto.status;


                document.getElementById(
                    "prodImagem"
                ).value =
                    produto.imagem;


                modalProduto.style.display =
                    "flex";

            }

        }
    );


    //=====================================================
    // SALVAR PRODUTO
    //=====================================================

    formProduto.addEventListener(
        "submit",
        async event => {


            event.preventDefault();


            //=================================================
            // CAPTURAR DADOS
            //=================================================

            const idEdit =

                document.getElementById(
                    "prodIdEdit"
                ).value;


            const nome =

                document.getElementById(
                    "prodNome"
                )
                    .value
                    .trim();


            const sku =

                document.getElementById(
                    "prodSku"
                )
                    .value
                    .trim();


            const descricao =

                document.getElementById(
                    "prodDescricao"
                )
                    .value
                    .trim();


            const categoriaId =

                document.getElementById(
                    "prodCategoria"
                ).value;


            const precoAntigo =

                Number(

                    document.getElementById(
                        "prodPrecoOriginal"
                    ).value

                );


            const campoPromo =

                document.getElementById(
                    "prodPrecoPromocional"
                ).value;


            const precoPromocional =

                campoPromo === ""

                    ? null

                    : Number(
                        campoPromo
                    );


            const estoque =

                Number(

                    document.getElementById(
                        "prodEstoque"
                    ).value

                );


            const status =

                document.getElementById(
                    "prodStatus"
                ).value;


            const imagem =

                document.getElementById(
                    "prodImagem"
                )
                    .value
                    .trim();


            //=================================================
            // VALIDAÇÃO
            //=================================================

            if (

                nome === ""

                ||

                sku === ""

                ||

                descricao === ""

                ||

                categoriaId === ""

                ||

                Number.isNaN(
                    precoAntigo
                )

                ||

                Number.isNaN(
                    estoque
                )

            ) {


                alert(

                    "Preencha todos os campos obrigatórios."

                );


                return;

            }


            //=================================================
            // OBJETO PRODUTO
            //=================================================

            const dadosProduto = {


                nome:


                    nome,


                descricao:


                    descricao,


                sku:


                    sku,


                preco_antigo:


                    precoAntigo,


                preco_promocional:


                    precoPromocional,


                quantidade_estoque:


                    estoque,


                ativo:


                    status === "Ativo"

                        ? 1

                        : 0,


                Loja_id_loja:


                    ID_LOJA,


                Lojista_id_lojista:


                    ID_LOJISTA

            };


            const btnSalvar =

                document.getElementById(
                    "btnSalvarProduto"
                );


            btnSalvar.disabled =
                true;


            try {


                let idProduto;


                //=================================================
                // ATUALIZAR PRODUTO
                //=================================================

                if (idEdit) {


                    idProduto =
                        Number(idEdit);


                    //==========================================
                    // ATUALIZA PRODUTO
                    //==========================================

                    await requisicao(

                        `${API}/produtos/${idProduto}`,

                        {

                            method: "PUT",


                            headers: {

                                "Content-Type":
                                    "application/json"

                            },


                            body:

                                JSON.stringify(
                                    dadosProduto
                                )

                        }

                    );


                    //==========================================
                    // REMOVE CATEGORIA ANTIGA
                    //==========================================

                    await fetch(

                        `${API}/produto-has-categorias/produto/${idProduto}`,

                        {
                            method: "DELETE"
                        }

                    );


                    //==========================================
                    // CADASTRA NOVA CATEGORIA
                    //==========================================

                    await requisicao(

                        `${API}/produto-has-categorias`,

                        {

                            method:
                                "POST",


                            headers: {

                                "Content-Type":
                                    "application/json"

                            },


                            body:

                                JSON.stringify({

                                    Produto_id_produto:

                                        idProduto,


                                    Categorias_id_categorias:

                                        Number(
                                            categoriaId
                                        )

                                })

                        }

                    );


                    //==========================================
                    // REMOVE IMAGEM ANTIGA
                    //==========================================

                    await fetch(

                        `${API}/imagens-produtos/produto/${idProduto}`,

                        {

                            method:
                                "DELETE"

                        }

                    );


                    //==========================================
                    // CADASTRA IMAGEM NOVA
                    //==========================================

                    if (
                        imagem !== ""
                    ) {


                        await requisicao(

                            `${API}/imagens-produtos`,

                            {

                                method:
                                    "POST",


                                headers: {

                                    "Content-Type":
                                        "application/json"

                                },


                                body:

                                    JSON.stringify({

                                        arquivo:

                                            imagem,


                                        Produto_id_produto:

                                            idProduto

                                    })

                            }

                        );

                    }


                    alert(

                        "Produto atualizado com sucesso!"

                    );

                }


                //=================================================
                // NOVO PRODUTO
                //=================================================

                else {


                    //==========================================
                    // CADASTRA PRODUTO
                    //==========================================

                    const respostaProduto =

                        await requisicao(

                            `${API}/produtos`,

                            {

                                method:
                                    "POST",


                                headers: {

                                    "Content-Type":
                                        "application/json"

                                },


                                body:

                                    JSON.stringify(
                                        dadosProduto
                                    )

                            }

                        );


                    idProduto =

                        respostaProduto.idProduto;


                    //==========================================
                    // VINCULA CATEGORIA
                    //==========================================

                    await requisicao(

                        `${API}/produto-has-categorias`,

                        {

                            method:
                                "POST",


                            headers: {

                                "Content-Type":
                                    "application/json"

                            },


                            body:

                                JSON.stringify({

                                    Produto_id_produto:

                                        idProduto,


                                    Categorias_id_categorias:

                                        Number(
                                            categoriaId
                                        )

                                })

                        }

                    );


                    //==========================================
                    // CADASTRA IMAGEM
                    //==========================================

                    if (
                        imagem !== ""
                    ) {


                        await requisicao(

                            `${API}/imagens-produtos`,

                            {

                                method:
                                    "POST",


                                headers: {

                                    "Content-Type":
                                        "application/json"

                                },


                                body:

                                    JSON.stringify({

                                        arquivo:

                                            imagem,


                                        Produto_id_produto:

                                            idProduto

                                    })

                            }

                        );

                    }


                    alert(

                        "Produto cadastrado com sucesso!"

                    );

                }


                //=================================================
                // FECHAR MODAL
                //=================================================

                modalProduto.style.display =
                    "none";


                formProduto.reset();


                document.getElementById(
                    "prodIdEdit"
                ).value =
                    "";


                //=================================================
                // RECARREGAR LISTA
                //=================================================

                await carregarProdutos();


            } catch (erro) {


                console.error(

                    "Erro ao salvar produto:",

                    erro

                );


                alert(

                    erro.message ||

                    "Erro ao salvar produto."

                );


            } finally {


                btnSalvar.disabled =
                    false;

            }

        }
    );


    //=====================================================
    // CADASTRAR CATEGORIA
    //=====================================================

    formCategoria.addEventListener(
        "submit",
        async event => {


            event.preventDefault();


            const nome =

                document.getElementById(
                    "catNome"
                )
                    .value
                    .trim();


            const imagem =

                document.getElementById(
                    "catImagem"
                )
                    .value
                    .trim();


            if (
                nome === ""
            ) {


                alert(

                    "Informe o nome da categoria."

                );


                return;

            }


            try {


                await requisicao(

                    `${API}/categorias`,

                    {

                        method:
                            "POST",


                        headers: {

                            "Content-Type":
                                "application/json"

                        },


                        body:

                            JSON.stringify({

                                nome:


                                    nome,


                                imagem:


                                    imagem || null

                            })

                    }

                );


                alert(

                    `Categoria "${nome}" cadastrada com sucesso!`

                );


                modalCategoria.style.display =
                    "none";


                formCategoria.reset();


                //=================================================
                // ATUALIZA LISTA DE CATEGORIAS
                //=================================================

                await carregarCategorias();


            } catch (erro) {


                console.error(

                    "Erro ao cadastrar categoria:",

                    erro

                );


                alert(

                    erro.message ||

                    "Erro ao cadastrar categoria."

                );

            }

        }
    );


    //=====================================================
    // MENU MOBILE
    //=====================================================

    document
        .getElementById(
            "openMenu"
        )
        .addEventListener(
            "click",
            () => {


                sidebar.classList.add(
                    "open"
                );

            }
        );


    document
        .getElementById(
            "closeMenu"
        )
        .addEventListener(
            "click",
            () => {


                sidebar.classList.remove(
                    "open"
                );

            }
        );


    //=====================================================
    // FECHAR MODAL CLICANDO FORA
    //=====================================================

    modalProduto.addEventListener(
        "click",
        event => {


            if (
                event.target ===
                modalProduto
            ) {


                modalProduto.style.display =
                    "none";

            }

        }
    );


    modalCategoria.addEventListener(
        "click",
        event => {


            if (
                event.target ===
                modalCategoria
            ) {


                modalCategoria.style.display =
                    "none";

            }

        }
    );


    //=====================================================
    // INICIALIZAÇÃO
    //=====================================================

    async function iniciar() {


        renderizarMenu();


        renderizarUsuario();


        await carregarCategorias();


        await carregarProdutos();


    }


    iniciar();

});