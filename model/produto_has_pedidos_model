const conexao = require("../conexao/conexao.js");

// =========================
// Adicionar Produto ao Pedido
// =========================

function cadastrar(produtoPedido, callback) {

    const sql = `
        INSERT INTO Produto_has_Pedidos
        (
            Produto_id_produto,
            Pedidos_id_pedidos
        )
        VALUES (?, ?)
    `;

    conexao.query(
        sql,
        [
            produtoPedido.Produto_id_produto,
            produtoPedido.Pedidos_id_pedidos
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
        FROM Produto_has_Pedidos
    `;

    conexao.query(sql, callback);

}

// =========================
// Listar Produtos do Pedido
// =========================

function listarPorPedido(idPedido, callback) {

    const sql = `
        SELECT *
        FROM Produto_has_Pedidos
        WHERE Pedidos_id_pedidos = ?
    `;

    conexao.query(sql, [idPedido], callback);

}

// =========================
// Listar Pedidos do Produto
// =========================

function listarPorProduto(idProduto, callback) {

    const sql = `
        SELECT *
        FROM Produto_has_Pedidos
        WHERE Produto_id_produto = ?
    `;

    conexao.query(sql, [idProduto], callback);

}

// =========================
// Buscar Produtos com Dados Completos do Pedido
// =========================

function buscarProdutosDoPedido(idPedido, callback) {

    const sql = `
        SELECT 
            Produto.*
        FROM Produto
        INNER JOIN Produto_has_Pedidos
        ON Produto.id_produto = Produto_has_Pedidos.Produto_id_produto
        WHERE Produto_has_Pedidos.Pedidos_id_pedidos = ?
    `;

    conexao.query(sql, [idPedido], callback);

}

// =========================
// Remover Produto do Pedido
// =========================

function excluir(idProduto, idPedido, callback) {

    const sql = `
        DELETE FROM Produto_has_Pedidos
        WHERE Produto_id_produto = ?
        AND Pedidos_id_pedidos = ?
    `;

    conexao.query(
        sql,
        [
            idProduto,
            idPedido
        ],
        callback
    );

}

// =========================
// Remover Todos os Produtos do Pedido
// =========================

function excluirPorPedido(idPedido, callback) {

    const sql = `
        DELETE FROM Produto_has_Pedidos
        WHERE Pedidos_id_pedidos = ?
    `;

    conexao.query(sql, [idPedido], callback);

}

// =========================
// Remover Produto de Todos os Pedidos
// =========================

function excluirPorProduto(idProduto, callback) {

    const sql = `
        DELETE FROM Produto_has_Pedidos
        WHERE Produto_id_produto = ?
    `;

    conexao.query(sql, [idProduto], callback);

}

module.exports = {
    cadastrar,
    listar,
    listarPorPedido,
    listarPorProduto,
    buscarProdutosDoPedido,
    excluir,
    excluirPorPedido,
    excluirPorProduto
};