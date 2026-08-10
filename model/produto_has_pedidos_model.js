const conexao = require("../conexao/conexao.js");


// ==========================================
// CADASTRAR
// ==========================================

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


// ==========================================
// LISTAR TODAS AS ASSOCIAÇÕES
// ==========================================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Produto_has_Pedidos
    `;

    conexao.query(sql, callback);
}


// ==========================================
// LISTAR PRODUTOS DE UM PEDIDO
// ==========================================

function listarPorPedido(idPedido, callback) {

    const sql = `
        SELECT *
        FROM Produto_has_Pedidos
        WHERE Pedidos_id_pedidos = ?
    `;

    conexao.query(
        sql,
        [idPedido],
        callback
    );
}


// ==========================================
// LISTAR PEDIDOS DE UM PRODUTO
// ==========================================

function listarPorProduto(idProduto, callback) {

    const sql = `
        SELECT *
        FROM Produto_has_Pedidos
        WHERE Produto_id_produto = ?
    `;

    conexao.query(
        sql,
        [idProduto],
        callback
    );
}


// ==========================================
// BUSCAR PRODUTOS COMPLETOS DO PEDIDO
// ==========================================

function buscarProdutosDoPedido(idPedido, callback) {

    const sql = `
        SELECT Produto.*
        FROM Produto
        INNER JOIN Produto_has_Pedidos
            ON Produto.id_produto =
               Produto_has_Pedidos.Produto_id_produto
        WHERE Produto_has_Pedidos.Pedidos_id_pedidos = ?
    `;

    conexao.query(
        sql,
        [idPedido],
        callback
    );
}


// ==========================================
// EXCLUIR UMA ASSOCIAÇÃO
// ==========================================

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


// ==========================================
// EXCLUIR TODOS OS PRODUTOS DE UM PEDIDO
// ==========================================

function excluirPorPedido(idPedido, callback) {

    const sql = `
        DELETE FROM Produto_has_Pedidos
        WHERE Pedidos_id_pedidos = ?
    `;

    conexao.query(
        sql,
        [idPedido],
        callback
    );
}


// ==========================================
// EXCLUIR PRODUTO DE TODOS OS PEDIDOS
// ==========================================

function excluirPorProduto(idProduto, callback) {

    const sql = `
        DELETE FROM Produto_has_Pedidos
        WHERE Produto_id_produto = ?
    `;

    conexao.query(
        sql,
        [idProduto],
        callback
    );
}


// ==========================================
// EXPORTAR
// ==========================================

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