const express = require ("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const conexao = require("./conexao");

//criar uma rota para testar a conexão com o 
// banco de dados
const clienteRotas = require("../routes/clientes_routes.js");
app.use("/clientes", clienteRotas);

const cartao_pagamentoRotas = require("../routes/cartao_pagamento_routes.js");
app.use("/cartao_pagamento", cartao_pagamentoRotas);

// criar uma rota para testar a conexão com o banco de dados
const avaliacaoRotas = require("../routes/avaliacao_routes.js");
app.use("/avaliacao", avaliacaoRotas);

// criar uma rota para acessar as associações entre banners e produtos
const bannerHasProdutosRotas = require("../routes/banner_has_produtos_routes.js");
app.use("/banner-has-produtos", bannerHasProdutosRotas);

// criar uma rota para acessar os banners
const bannerRotas = require("../routes/banner_routes.js");
app.use("/banner", bannerRotas);

// criar uma rota para acessar os carrinhos
const carrinhoRotas = require("../routes/carrinho_routes.js");
app.use("/carrinho", carrinhoRotas);

// criar uma rota para acessar as associações entre categorias e cupons
const categoriaHasCupomRotas = require("../routes/categoria_has_cupom_routes.js");
app.use("/categoria-has-cupom", categoriaHasCupomRotas);

// criar uma rota para acessar as categorias
const categoriaRotas = require("../routes/categorias_routes.js");

app.use("/categorias", categoriaRotas);

// criar uma rota para acessar as associações entre clientes e endereços
const clienteHasEnderecoRotas = require("../routes/clientes_has_endereco_routes.js");
app.use("/clientes_has_endereco", clienteHasEnderecoRotas);

// criar uma rota para acessar as associações entre cupons e categorias
const cupomHasCategoriasRotas = require("../routes/cupom_has_categorias_routes.js");
app.use("/cupom_has_categorias", cupomHasCategoriasRotas);

// criar uma rota para acessar as associações entre cupons e produtos
const cupomHasProdutoRotas = require("../routes/cupom_has_produto_routes.js");
app.use("/cupom-has-produto", cupomHasProdutoRotas);

// criar uma rota para acessar os cupons
const cupomRotas = require("../routes/cupom_routes.js");
app.use("/cupons", cupomRotas);

// criar uma rota para acessar os endereços
const enderecoRotas = require("../routes/endereco_routes.js");
app.use("/enderecos", enderecoRotas);

// criar uma rota para acessar as formas de pagamento
const formaPagamentoRotas = require("../routes/forma_pagamento_routes.js");
app.use("/formas-pagamento", formaPagamentoRotas);

// criar uma rota para acessar os fretes
const freteRotas = require("../routes/frete_routes.js");
app.use("/fretes", freteRotas);

// criar uma rota para acessar as imagens dos produtos
const imagemProdutoRotas = require("../routes/imagem_produto_routes.js");
app.use("/imagens-produtos", imagemProdutoRotas);

// criar uma rota para acessar as lojas
const lojaRotas = require("../routes/loja_routes.js");
app.use("/lojas", lojaRotas);

// criar uma rota para acessar os lojistas
const lojistaRotas = require("../routes/lojista_routes.js");
app.use("/lojistas", lojistaRotas);

// criar uma rota para acessar os pedidos
const pedidosRotas = require("../routes/pedidos_routes.js");
app.use("/pedidos", pedidosRotas);

// criar uma rota para acessar as associações entre produtos e carrinhos
const produtoHasCarrinhoRotas = require("../routes/produto_has_carrinho_routes.js");
app.use("/produto_has_carrinho", produtoHasCarrinhoRotas);

// criar uma rota para acessar as associações entre produtos e categorias
const produtoHasCategoriasRotas = require("../routes/produto_has_categorias_routes.js");
app.use("/produto-has-categorias", produtoHasCategoriasRotas);

// criar uma rota para acessar as associações entre produtos e pedidos
const produtoHasPedidosRotas = require("../routes/produto_has_pedidos_routes.js");
app.use("/produto-has-pedidos", produtoHasPedidosRotas);

// criar uma rota para acessar os produtos
const produtosRotas = require("../routes/produtos_routes.js");
app.use("/produtos", produtosRotas);

// criar uma rota para acessar as associações entre promoções e categorias
const promocaoHasCategoriasRotas = require("../routes/promocao_has_categorias_routes.js");
app.use("/promocao-has-categorias", promocaoHasCategoriasRotas);

// criar uma rota para acessar as associações entre promoções e produtos
const promocaoHasProdutoRotas = require("../routes/promocao_has_produto_routes.js");
app.use("/promocao-has-produto", promocaoHasProdutoRotas);

// criar uma rota para acessar as promoções
const promocaoRotas = require("../routes/promocao_routes.js");
app.use("/promocoes", promocaoRotas);


app.listen(3000, ()=> {
    console.log("Servidor iniciado!");
});