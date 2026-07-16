const conexao = require("../conexao/conexao.js");

// =========================
// Adicionar Produto ao Carrinho
// =========================

function cadastrar(produtoCarrinho, callback) {

    const sql = `
        INSERT INTO Produto_has_Carrinho
        (
            Produto_id_produto,
            Carrinho_id_carrinho
        )
        VALUES (?, ?)
    `;

    conexao.query(
        sql,
        [
            produtoCarrinho.Produto_id_produto,
            produtoCarrinho.Carrinho_id_carrinho
        ],
        callback
    );

}

// =========================
// Listar Relações
// =========================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Produto_has_Carrinho
    `;

    conexao.query(sql, callback);

}

// =========================
// Listar Produtos do Carrinho
// =========================

function listarPorCarrinho(idCarrinho, callback) {

    const sql = `
        SELECT *
        FROM Produto_has_Carrinho
        WHERE Carrinho_id_carrinho = ?
    `;

    conexao.query(sql, [idCarrinho], callback);

}

// =========================
// Listar Carrinhos do Produto
// =========================

function listarPorProduto(idProduto, callback) {

    const sql = `
        SELECT *
        FROM Produto_has_Carrinho
        WHERE Produto_id_produto = ?
    `;

    conexao.query(sql, [idProduto], callback);

}

// =========================
// Remover Produto do Carrinho
// =========================

function excluir(idProduto, idCarrinho, callback) {

    const sql = `
        DELETE FROM Produto_has_Carrinho
        WHERE Produto_id_produto = ?
        AND Carrinho_id_carrinho = ?
    `;

    conexao.query(
        sql,
        [
            idProduto,
            idCarrinho
        ],
        callback
    );

}

// =========================
// Remover Todos os Produtos do Carrinho
// =========================

function excluirPorCarrinho(idCarrinho, callback) {

    const sql = `
        DELETE FROM Produto_has_Carrinho
        WHERE Carrinho_id_carrinho = ?
    `;

    conexao.query(sql, [idCarrinho], callback);

}

// =========================
// Remover Produto de Todos os Carrinhos
// =========================

function excluirPorProduto(idProduto, callback) {

    const sql = `
        DELETE FROM Produto_has_Carrinho
        WHERE Produto_id_produto = ?
    `;

    conexao.query(sql, [idProduto], callback);

}

module.exports = {
    cadastrar,
    listar,
    listarPorCarrinho,
    listarPorProduto,
    excluir,
    excluirPorCarrinho,
    excluirPorProduto
};