const conexao = require("../conexao/conexao.js");

// =========================
// Vincular Promoção ao Produto
// =========================

function cadastrar(promocaoProduto, callback) {

    const sql = `
        INSERT INTO Promocao_has_Produto
        (
            Promocao_id_promocao,
            Produto_id_produto
        )
        VALUES (?, ?)
    `;

    conexao.query(
        sql,
        [
            promocaoProduto.Promocao_id_promocao,
            promocaoProduto.Produto_id_produto
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
        FROM Promocao_has_Produto
    `;

    conexao.query(sql, callback);

}

// =========================
// Listar Produtos da Promoção
// =========================

function listarPorPromocao(idPromocao, callback) {

    const sql = `
        SELECT *
        FROM Promocao_has_Produto
        WHERE Promocao_id_promocao = ?
    `;

    conexao.query(sql, [idPromocao], callback);

}

// =========================
// Listar Promoções do Produto
// =========================

function listarPorProduto(idProduto, callback) {

    const sql = `
        SELECT *
        FROM Promocao_has_Produto
        WHERE Produto_id_produto = ?
    `;

    conexao.query(sql, [idProduto], callback);

}

// =========================
// Buscar Produtos com Dados da Promoção
// =========================

function buscarProdutosPorPromocao(idPromocao, callback) {

    const sql = `
        SELECT 
            Produto.*
        FROM Produto
        INNER JOIN Promocao_has_Produto
        ON Produto.id_produto = Promocao_has_Produto.Produto_id_produto
        WHERE Promocao_has_Produto.Promocao_id_promocao = ?
    `;

    conexao.query(sql, [idPromocao], callback);

}

// =========================
// Buscar Promoções Ativas de um Produto
// =========================

function buscarPromocoesProduto(idProduto, callback) {

    const sql = `
        SELECT 
            Promocao.*
        FROM Promocao
        INNER JOIN Promocao_has_Produto
        ON Promocao.id_promocao = Promocao_has_Produto.Promocao_id_promocao
        WHERE Promocao_has_Produto.Produto_id_produto = ?
        AND CURDATE() BETWEEN Promocao.data_inicio
        AND IFNULL(Promocao.data_final, CURDATE())
    `;

    conexao.query(sql, [idProduto], callback);

}

// =========================
// Remover Produto da Promoção
// =========================

function excluir(idPromocao, idProduto, callback) {

    const sql = `
        DELETE FROM Promocao_has_Produto
        WHERE Promocao_id_promocao = ?
        AND Produto_id_produto = ?
    `;

    conexao.query(
        sql,
        [
            idPromocao,
            idProduto
        ],
        callback
    );

}

// =========================
// Remover Todos os Produtos da Promoção
// =========================

function excluirPorPromocao(idPromocao, callback) {

    const sql = `
        DELETE FROM Promocao_has_Produto
        WHERE Promocao_id_promocao = ?
    `;

    conexao.query(sql, [idPromocao], callback);

}

// =========================
// Remover Produto de Todas as Promoções
// =========================

function excluirPorProduto(idProduto, callback) {

    const sql = `
        DELETE FROM Promocao_has_Produto
        WHERE Produto_id_produto = ?
    `;

    conexao.query(sql, [idProduto], callback);

}

module.exports = {
    cadastrar,
    listar,
    listarPorPromocao,
    listarPorProduto,
    buscarProdutosPorPromocao,
    buscarPromocoesProduto,
    excluir,
    excluirPorPromocao,
    excluirPorProduto
};