const conexao = require("../conexao/conexao.js");

// =========================
// Vincular Cupom ao Produto
// =========================

function cadastrar(cupomProduto, callback) {

    const sql = `
        INSERT INTO Cupom_has_Produto
        (
            Cupom_id_cupom,
            Produto_id_produto
        )
        VALUES (?, ?)
    `;

    conexao.query(
        sql,
        [
            cupomProduto.Cupom_id_cupom,
            cupomProduto.Produto_id_produto
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
        FROM Cupom_has_Produto
    `;

    conexao.query(sql, callback);

}

// =========================
// Listar Produtos do Cupom
// =========================

function listarPorCupom(idCupom, callback) {

    const sql = `
        SELECT *
        FROM Cupom_has_Produto
        WHERE Cupom_id_cupom = ?
    `;

    conexao.query(sql, [idCupom], callback);

}

// =========================
// Listar Cupons do Produto
// =========================

function listarPorProduto(idProduto, callback) {

    const sql = `
        SELECT *
        FROM Cupom_has_Produto
        WHERE Produto_id_produto = ?
    `;

    conexao.query(sql, [idProduto], callback);

}

// =========================
// Buscar Produtos de um Cupom com Dados Completos
// =========================

function buscarProdutosPorCupom(idCupom, callback) {

    const sql = `
        SELECT
            Produto.*
        FROM Produto
        INNER JOIN Cupom_has_Produto
        ON Produto.id_produto = Cupom_has_Produto.Produto_id_produto
        WHERE Cupom_has_Produto.Cupom_id_cupom = ?
    `;

    conexao.query(sql, [idCupom], callback);

}

// =========================
// Remover Produto do Cupom
// =========================

function excluir(idCupom, idProduto, callback) {

    const sql = `
        DELETE FROM Cupom_has_Produto
        WHERE Cupom_id_cupom = ?
        AND Produto_id_produto = ?
    `;

    conexao.query(
        sql,
        [
            idCupom,
            idProduto
        ],
        callback
    );

}

// =========================
// Remover Todos os Produtos do Cupom
// =========================

function excluirPorCupom(idCupom, callback) {

    const sql = `
        DELETE FROM Cupom_has_Produto
        WHERE Cupom_id_cupom = ?
    `;

    conexao.query(sql, [idCupom], callback);

}

// =========================
// Remover Produto de Todos os Cupons
// =========================

function excluirPorProduto(idProduto, callback) {

    const sql = `
        DELETE FROM Cupom_has_Produto
        WHERE Produto_id_produto = ?
    `;

    conexao.query(sql, [idProduto], callback);

}

module.exports = {
    cadastrar,
    listar,
    listarPorCupom,
    listarPorProduto,
    buscarProdutosPorCupom,
    excluir,
    excluirPorCupom,
    excluirPorProduto
};