//==========================================
// IMPORTA A CONEXÃO
//==========================================

const conexao = require("../conexao/conexao.js");


//==========================================
// CADASTRAR PRODUTO NO PEDIDO
//==========================================

function cadastrar(produtoPedido, callback) {

    const sql = `
        INSERT INTO Produto_has_Pedidos
        (
            Produto_id_produto,
            Pedidos_id_pedidos,
            quantidade,
            preco_unitario
        )
        VALUES (?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [
            produtoPedido.Produto_id_produto,
            produtoPedido.Pedidos_id_pedidos,
            produtoPedido.quantidade || 1,
            produtoPedido.preco_unitario
        ],
        callback
    );
}


//==========================================
// LISTAR TODAS AS ASSOCIAÇÕES
//==========================================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Produto_has_Pedidos
    `;

    conexao.query(sql, callback);
}


//==========================================
// LISTAR PRODUTOS DE UM PEDIDO
//==========================================

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


//==========================================
// LISTAR PEDIDOS DE UM PRODUTO
//==========================================

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


//==========================================
// BUSCAR PRODUTOS COMPLETOS DO PEDIDO
//==========================================

function buscarProdutosDoPedido(idPedido, callback) {

    const sql = `
        SELECT
            Produto.*,
            Produto_has_Pedidos.quantidade,
            Produto_has_Pedidos.preco_unitario,

            (
                Produto_has_Pedidos.quantidade *
                Produto_has_Pedidos.preco_unitario
            ) AS subtotal

        FROM Produto_has_Pedidos

        INNER JOIN Produto
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


//==========================================
// ATUALIZAR PRODUTO DO PEDIDO
//==========================================

function atualizar(
    idProduto,
    idPedido,
    produtoPedido,
    callback
) {

    const sql = `
        UPDATE Produto_has_Pedidos
        SET
            quantidade = ?,
            preco_unitario = ?
        WHERE Produto_id_produto = ?
        AND Pedidos_id_pedidos = ?
    `;

    conexao.query(
        sql,
        [
            produtoPedido.quantidade,
            produtoPedido.preco_unitario,
            idProduto,
            idPedido
        ],
        callback
    );
}


//==========================================
// EXCLUIR PRODUTO DO PEDIDO
//==========================================

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


//==========================================
// EXCLUIR TODOS OS PRODUTOS DO PEDIDO
//==========================================

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


//==========================================
// EXCLUIR PRODUTO DE TODOS OS PEDIDOS
//==========================================

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


//==========================================
// EXPORTAÇÃO
//==========================================

module.exports = {

    cadastrar,
    listar,
    listarPorPedido,
    listarPorProduto,
    buscarProdutosDoPedido,
    atualizar,
    excluir,
    excluirPorPedido,
    excluirPorProduto

};