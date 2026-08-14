

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



// Permite receber dados de formulários
app.use(express.urlencoded({ extended: true }));


//=====================================================
// TESTE DO SERVIDOR
//=====================================================

app.get("/", (req, res) => {

    res.status(200).json({
        sucesso: true,
        mensagem: "API GAME_START funcionando!"
    });

});


//=====================================================
// IMPORTAÇÃO DAS ROTAS
//=====================================================


//=====================================================
// AVALIAÇÃO
//=====================================================

const avaliacaoRoutes =
    require("../routes/avaliacao_routes.js");


//=====================================================
// BANNER
//=====================================================

const bannerRoutes =
    require("../routes/banner_routes.js");


//=====================================================
// BANNER HAS PRODUTO
//=====================================================

const bannerHasProdutoRoutes =
    require("../routes/banner_has_produto_routes.js");


//=====================================================
// CARRINHO
//=====================================================

const carrinhoRoutes =
    require("../routes/carrinho_routes.js");


//=====================================================
// CARTÃO DE PAGAMENTO
//=====================================================

const cartaoPagamentoRoutes =
    require("../routes/cartao_pagamento_routes.js");


//=====================================================
// CATEGORIAS
//=====================================================

const categoriasRoutes =
    require("../routes/categorias_routes.js");


//=====================================================
// CLIENTES
//=====================================================

const clientesRoutes =
    require("../routes/clientes_routes.js");


//=====================================================
// CLIENTE HAS ENDEREÇO
//=====================================================

const clienteHasEnderecoRoutes =
    require("../routes/cliente_has_endereco_routes.js");


//=====================================================
// CUPOM
//=====================================================

const cupomRoutes =
    require("../routes/cupom_routes.js");


//=====================================================
// CUPOM HAS CATEGORIAS
//=====================================================

const cupomHasCategoriasRoutes =
    require("../routes/cupom_has_categorias_routes.js");


//=====================================================
// CUPOM HAS PRODUTO
//=====================================================

const cupomHasProdutoRoutes =
    require("../routes/cupom_has_produto_routes.js");


//=====================================================
// ENDEREÇO
//=====================================================

const enderecoRoutes =
    require("../routes/endereco_routes.js");


//=====================================================
// FORMA DE PAGAMENTO
//=====================================================

const formaPagamentoRoutes =
    require("../routes/forma_pagamento_routes.js");


//=====================================================
// FRETE
//=====================================================

const freteRoutes =
    require("../routes/frete_routes.js");


//=====================================================
// IMAGEM PRODUTO
//=====================================================

const imagemProdutoRoutes =
    require("../routes/imagem_produto_routes.js");


//=====================================================
// LOJA
//=====================================================

const lojaRoutes =
    require("../routes/loja_routes.js");


//=====================================================
// LOJISTA
//=====================================================

const lojistaRoutes =
    require("../routes/lojista_routes.js");


//=====================================================
// PEDIDOS
//=====================================================

const pedidosRoutes =
    require("../routes/pedidos_routes.js");


//=====================================================
// PRODUTO
//=====================================================

const produtoRoutes =
    require("../routes/produto_routes.js");


//=====================================================
// PRODUTO HAS CARRINHO
//=====================================================

const produtoHasCarrinhoRoutes =
    require("../routes/produto_has_carrinho_routes.js");


//=====================================================
// PRODUTO HAS CATEGORIAS
//=====================================================

const produtoHasCategoriasRoutes =
    require("../routes/produto_has_categorias_routes.js");


//=====================================================
// PRODUTO HAS PEDIDOS
//=====================================================

const produtoHasPedidosRoutes =
    require("../routes/produto_has_pedidos_routes.js");


//=====================================================
// PROMOÇÃO
//=====================================================

const promocaoRoutes =
    require("../routes/promocao_routes.js");


//=====================================================
// PROMOÇÃO HAS PRODUTO
//=====================================================

const promocaoHasProdutoRoutes =
    require("../routes/promocao_has_produto_routes.js");


//=====================================================
// PROMOÇÃO HAS CATEGORIAS
//=====================================================

const promocaoHasCategoriasRoutes =
    require("../routes/promocao_has_categorias_routes.js");

//=====================================================
// ENDPOINTS
//=====================================================


//=====================================================
// AVALIAÇÕES
//=====================================================

app.use(
    "/avaliacoes",
    avaliacaoRoutes
);


//=====================================================
// BANNERS
//=====================================================

app.use(
    "/banners",
    bannerRoutes
);


//=====================================================
// BANNER HAS PRODUTO
//=====================================================

app.use(
    "/banner-has-produto",
    bannerHasProdutoRoutes
);


//=====================================================
// CARRINHOS
//=====================================================

app.use(
    "/carrinhos",
    carrinhoRoutes
);


//=====================================================
// CARTÕES
//=====================================================

app.use(
    "/cartao_pagamento",
    cartaoPagamentoRoutes
);


//=====================================================
// CATEGORIAS
//=====================================================

app.use(
    "/categorias",
    categoriasRoutes
);


//=====================================================
// CLIENTES
//=====================================================

app.use(
    "/clientes",
    clientesRoutes
);


//=====================================================
// CLIENTE HAS ENDEREÇO
//=====================================================

app.use(
    "/cliente-has-endereco",
    clienteHasEnderecoRoutes
);


//=====================================================
// CUPONS
//=====================================================

app.use(
    "/cupons",
    cupomRoutes
);


//=====================================================
// CUPOM HAS CATEGORIAS
//=====================================================

app.use(
    "/cupom-has-categorias",
    cupomHasCategoriasRoutes
);


//=====================================================
// CUPOM HAS PRODUTO
//=====================================================

app.use(
    "/cupom-has-produto",
    cupomHasProdutoRoutes
);


//=====================================================
// ENDEREÇOS
//=====================================================

app.use(
    "/enderecos",
    enderecoRoutes
);


//=====================================================
// FORMAS DE PAGAMENTO
//=====================================================

app.use(
    "/formas-pagamento",
    formaPagamentoRoutes
);


//=====================================================
// FRETES
//=====================================================

app.use(
    "/fretes",
    freteRoutes
);


//=====================================================
// IMAGENS DE PRODUTOS
//=====================================================

app.use(
    "/imagens-produtos",
    imagemProdutoRoutes
);


//=====================================================
// LOJAS
//=====================================================

app.use(
    "/lojas",
    lojaRoutes
);


//=====================================================
// LOJISTAS
//=====================================================

app.use(
    "/lojistas",
    lojistaRoutes
);


//=====================================================
// PEDIDOS
//=====================================================

app.use(
    "/pedidos",
    pedidosRoutes
);


//=====================================================
// PRODUTOS
//=====================================================

app.use(
    "/produtos",
    produtoRoutes
);


//=====================================================
// PRODUTO HAS CARRINHO
//=====================================================

app.use(
    "/produto-has-carrinho",
    produtoHasCarrinhoRoutes
);


//=====================================================
// PRODUTO HAS CATEGORIAS
//=====================================================

app.use(
    "/produto-has-categorias",
    produtoHasCategoriasRoutes
);


//=====================================================
// PRODUTO HAS PEDIDOS
//=====================================================

app.use(
    "/produto-has-pedidos",
    produtoHasPedidosRoutes
);


//=====================================================
// PROMOÇÕES
//=====================================================

app.use(
    "/promocoes",
    promocaoRoutes
);


//=====================================================
// PROMOÇÃO HAS PRODUTO
//=====================================================

app.use(
    "/promocao-has-produto",
    promocaoHasProdutoRoutes
);


//=====================================================
// PROMOÇÃO HAS CATEGORIAS
//=====================================================

app.use(
    "/promocao-has-categorias",
    promocaoHasCategoriasRoutes
);


//=====================================================
// ROTA NÃO ENCONTRADA
//=====================================================

app.use((req, res) => {

    res.status(404).json({
        sucesso: false,
        mensagem: "Rota não encontrada."
    });

});


//=====================================================
// TRATAMENTO DE ERROS
//=====================================================

app.use((erro, req, res, next) => {

    console.error("ERRO NO SERVIDOR:");

    console.error(erro);

    res.status(500).json({
        sucesso: false,
        mensagem: "Erro interno do servidor."
    });

});


//=====================================================
// PORTA
//=====================================================

const PORTA = 3000;


//=====================================================
// INICIAR SERVIDOR
//=====================================================

app.listen(PORTA, () => {

    console.log("");
    console.log("====================================");
    console.log("       API GAME_START INICIADA");
    console.log("====================================");
    console.log("");
    console.log(`Servidor rodando na porta ${PORTA}`);
    console.log(`http://localhost:${PORTA}`);
    console.log("");

});