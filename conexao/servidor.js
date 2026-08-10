const express = require("express");
const app = express();

// 1. Middleware fundamental para ler JSON nas requisições POST/PUT
app.use(express.json());

// 2. Importação de todas as suas rotas
const avaliacaoRoutes = require("../routes/avaliacao_routes");
const bannerRoutes = require("../routes/banner_routes");
const bannerHasProdutoRoutes = require("../routes/banner_has_produto_routes");
const carrinhoRoutes = require("../routes/carrinho_routes");
const cartaoPagamentoRoutes = require("../routes/cartao_pagamento_routes");
const categoriaHasCupomRoutes = require("../routes/categoria_has_cupom_routes");
const categoriasRoutes = require("../routes/categorias_routes");
const clientesHasEnderecoRoutes = require("../routes/clientes_has_endereco_routes");
const clientesRoutes = require("../routes/clientes_routes");
const cupomHasCategoriasRoutes = require("../routes/cupom_has_categorias_routes");

// 3. Associa as rotas aos seus respetivos endpoints no Express
app.use("/avaliacoes", avaliacaoRoutes);
app.use("/banners", bannerRoutes);
app.use("/banner-has-produto", bannerHasProdutoRoutes);
app.use("/carrinhos", carrinhoRoutes);
app.use("/cartao_pagamento", cartaoPagamentoRoutes);
app.use("/categoria-has-cupom", categoriaHasCupomRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/clientes_has_endereco", clientesHasEnderecoRoutes);
app.use("/clientes", clientesRoutes);
app.use("/cupom_has_categorias", cupomHasCategoriasRoutes);

// 4. Inicia o servidor na porta 3000 (ou outra à sua escolha)
const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`Servidor a correr com sucesso na porta ${PORTA}!`);
});